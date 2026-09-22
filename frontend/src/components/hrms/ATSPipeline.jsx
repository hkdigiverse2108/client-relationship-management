import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { atsService } from '../../api/services/atsService';
import { hrmsService } from '../../api/services/hrmsService';
import { APP_CONFIG } from '../../config/appConfig';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';
import CustomDataTable from '../common/CustomDataTable';

const backendUrl = APP_CONFIG.apiBaseUrl.replace('/api/v1', '');
const getFullUrl = (path) => path?.startsWith('http') ? path : backendUrl + path;

const STAGES = [
  { name: 'APPLIED', color: 'purple' },
  { name: 'SCREENING', color: 'info' },
  { name: 'INTERVIEW SCHEDULED', color: 'warning' },
  { name: 'SELECTED', color: 'success' },
  { name: 'REJECTED', color: 'danger' },
  { name: 'JOINED', color: 'primary' }
];
const STAGE_NAMES = STAGES.map(s => s.name);

export default function ATSPipeline() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('all');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Jobs List');

  // Modals state
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    title: '', department: '', location: '', employment_type: 'Full Time',
    status: 'Open', applications_count: 0, posted_date: new Date().toISOString().split('T')[0],
    experience: '', salary_range: '', description: '', stage: STAGE_NAMES[0]
  });
  const [isEditJob, setIsEditJob] = useState(false);
  
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isEditCandidate, setIsEditCandidate] = useState(false);
  const [candidateFormData, setCandidateFormData] = useState({
    name: '', email: '', phone: '', stage: STAGE_NAMES[0], department: '', resume_url: ''
  });
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  // Departments for Job Modal
  const [departments, setDepartments] = useState([]);
  const [isCustomDept, setIsCustomDept] = useState(false);
  const [customDept, setCustomDept] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedJob) {
      fetchCandidates(selectedJob);
    } else {
      setCandidates([]);
    }
  }, [selectedJob]);

  const fetchJobs = async () => {
    try {
      const res = await atsService.getJobs();
      setJobs(res || []);
      if (res?.length > 0 && selectedJob === 'all') {
        setSelectedJob('all'); // keep all or auto select? keep all as default.
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load jobs');
    }
  };

  const fetchCandidates = async (jobId) => {
    setLoading(true);
    try {
      const res = await atsService.getCandidates(jobId);
      setCandidates(res || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await hrmsService.getCustomTypes();
      const depts = res?.filter(t => t.type === 'department') || [];
      if (depts.length === 0) {
        setDepartments(['Engineering', 'Sales', 'Marketing', 'HR', 'Operations']);
      } else {
        setDepartments(depts.map(d => d.name));
      }
    } catch (error) {
      setDepartments(['Engineering', 'Sales', 'Marketing', 'HR', 'Operations']);
    }
  };

  // --- Drag and Drop Logic ---
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);

  const handleDragStart = (e, candidateId) => {
    setDraggedItem(candidateId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, stageName) => {
    e.preventDefault();
    if (stageName !== dragOverStage) setDragOverStage(stageName);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverStage(null);
  };

  const handleDrop = async (e, destStage) => {
    e.preventDefault();
    setDragOverStage(null);
    if (!draggedItem) return;

    const candidate = candidates.find(c => (c._id || c.id) === draggedItem);
    if (!candidate || candidate.stage === destStage) return;

    // Optimistic UI update
    const updatedCandidates = candidates.map(c => 
      (c._id || c.id) === draggedItem ? { ...c, stage: destStage } : c
    );
    setCandidates(updatedCandidates);

    try {
      await atsService.updateCandidateStage(draggedItem, destStage);
      toast.success(`Candidate moved to ${destStage}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update stage');
      fetchCandidates(selectedJob);
    }
    setDraggedItem(null);
  };

  const handleAddCustomDept = async () => {
    if (!customDept.trim()) {
      toast.error('Please enter a department name');
      return;
    }
    try {
      if (!departments.includes(customDept)) {
        await hrmsService.createCustomType({ type: 'department', name: customDept, value: customDept.toLowerCase().replace(/\s+/g, '_') });
        await fetchDepartments();
      }
      setJobFormData({ ...jobFormData, department: customDept });
      setIsCustomDept(false);
      setCustomDept('');
      toast.success('Department added');
    } catch(e) {
      console.error(e);
      toast.error('Failed to save department');
    }
  };

  // --- Job Form Handlers ---
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...jobFormData };
      // Format date if needed
      if (jobFormData.posted_date instanceof Date) {
        payload.posted_date = jobFormData.posted_date.toISOString().split('T')[0];
      }

      if (isEditJob && jobFormData.id) {
        await atsService.updateJob(jobFormData.id, payload);
        toast.success('Job updated successfully');
      } else {
        const newJob = await atsService.createJob(payload);
        toast.success('Job created successfully');
        if (!selectedJob || selectedJob === 'all') setSelectedJob(newJob._id || newJob.id);
      }
      setIsJobModalOpen(false);
      fetchJobs();
    } catch (error) {
      toast.error('Failed to save job');
    }
  };

  const openJobModal = (job = null) => {
    if (job) {
      setIsEditJob(true);
      setJobFormData({ ...job, id: job._id || job.id });
      setIsCustomDept(false);
    } else {
      setIsEditJob(false);
      setJobFormData({
        title: '', department: departments[0] || '', location: '', employment_type: 'Full Time',
        status: 'Open', applications_count: 0, posted_date: new Date(),
        experience: '', salary_range: '', description: '', stage: STAGE_NAMES[0]
      });
      setIsCustomDept(false);
    }
    setIsJobModalOpen(true);
  };

  // --- Candidate Form Handlers ---
  const handleCandidateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob || selectedJob === 'all') return toast.error('Please select a specific job first');
    
    try {
      const payload = { ...candidateFormData, job_id: selectedJob };
      
      if (isEditCandidate && candidateFormData.id) {
        await atsService.updateCandidate(candidateFormData.id, payload);
        toast.success('Candidate updated successfully');
      } else {
        await atsService.createCandidate(payload);
        toast.success('Candidate added successfully');
      }
      setIsCandidateModalOpen(false);
      fetchCandidates(selectedJob);
    } catch (error) {
      toast.error('Failed to save candidate');
    }
  };

  const openCandidateModal = (candidate = null) => {
    if (!selectedJob || selectedJob === 'all') return toast.error('Please select a specific job to add candidate');
    
    if (candidate) {
      setIsEditCandidate(true);
      setCandidateFormData({ ...candidate, id: candidate._id || candidate.id });
    } else {
      setIsEditCandidate(false);
      setCandidateFormData({ name: '', email: '', phone: '', stage: STAGE_NAMES[0], department: '', resume_url: '' });
    }
    setIsCandidateModalOpen(true);
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    
    setIsUploadingResume(true);
    try {
      const res = await atsService.uploadResume(formData);
      setCandidateFormData({ ...candidateFormData, resume_url: res.resume_url });
      toast.success('Resume uploaded');
    } catch (error) {
      toast.error('Failed to upload resume');
    } finally {
      setIsUploadingResume(false);
    }
  };

  const executeDelete = async (type, id) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (!isConfirmed) return;

    try {
      if (type === 'job') {
        await atsService.deleteJob(id);
        toast.success('Job deleted successfully');
        if (selectedJob === id) setSelectedJob('all');
        fetchJobs();
      } else if (type === 'candidate') {
        await atsService.deleteCandidate(id);
        toast.success('Candidate deleted successfully');
        fetchCandidates(selectedJob);
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const getCandidatesByStage = (stageName) => candidates.filter(c => c.stage === stageName);

  const jobColumns = [
    {
      name: 'Title',
      selectorKey: 'title',
      sortable: true,
      cell: row => <span className="fw-bold">{row.title}</span>
    },
    {
      name: 'Department',
      selectorKey: 'department',
      sortable: true,
      cell: row => <span className="badge bg-light text-dark border">{row.department}</span>
    },
    {
      name: 'Location',
      selectorKey: 'location',
      sortable: true,
      cell: row => row.location
    },
    {
      name: 'Type',
      selectorKey: 'employment_type',
      sortable: true,
      cell: row => row.employment_type
    },
    {
      name: 'Status',
      selectorKey: 'status',
      sortable: true,
      cell: row => (
        <span className={`badge ${row.status === 'Open' ? 'bg-success-transparent' : 'bg-secondary-transparent'}`}>
          {row.status}
        </span>
      )
    },
    {
      name: 'Actions',
      sortable: false,
      cell: row => (
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-sm btn-soft-primary px-3" onClick={() => { setSelectedJob(row._id || row.id); setActiveTab('Pipeline'); }}>
            View Pipeline
          </button>
          <a href="#" className="text-muted fs-16" onClick={(e) => { e.preventDefault(); openJobModal(row); }}>
            <i className="ti ti-edit"></i>
          </a>
          <a href="#" className="text-danger fs-16" onClick={(e) => { e.preventDefault(); executeDelete('job', row._id || row.id); }}>
            <i className="ti ti-trash"></i>
          </a>
        </div>
      )
    }
  ];

  const renderJobsTable = () => (
    <div className="card shadow-sm border mt-3 mb-0">
      <CustomDataTable columns={jobColumns} data={jobs} />
    </div>
  );

  return (
    <div className="ats-pipeline-container p-4">
      {/* Top Bar Tabs & Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <button 
            className={`btn ${activeTab === 'Jobs List' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('Jobs List')}
          >
            Jobs List
          </button>
          <button 
            className={`btn ${activeTab === 'Pipeline' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => {
              if (jobs.length > 0 && (!selectedJob || selectedJob === 'all')) {
                setSelectedJob(jobs[0]._id || jobs[0].id);
              }
              setActiveTab('Pipeline');
            }}
          >
            Candidate Pipeline
          </button>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary d-flex align-items-center" onClick={() => openJobModal()}>
            <i className="ti ti-plus me-1"></i> List Job
          </button>
          {activeTab === 'Pipeline' && selectedJob && selectedJob !== 'all' && (
            <button className="btn btn-outline-primary d-flex align-items-center" onClick={() => openCandidateModal()}>
              <i className="ti ti-plus me-1"></i> Add Candidate
            </button>
          )}
        </div>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'Jobs List' ? (
        renderJobsTable()
      ) : (
        <>
          <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-white border rounded shadow-sm">
            <label className="fw-bold mb-0">Active Job Pipeline:</label>
            <div style={{ width: '300px' }}>
              <CustomSelect 
                options={[
                  { value: 'all', label: 'All Jobs' },
                  ...jobs.map(j => ({ value: j._id || j.id, label: `${j.title} (${j.department})` }))
                ]}
                value={
                  selectedJob === 'all' 
                    ? { value: 'all', label: 'All Jobs' } 
                    : jobs.find(j => (j._id || j.id) === selectedJob)
                      ? { value: selectedJob, label: `${jobs.find(j => (j._id || j.id) === selectedJob).title} (${jobs.find(j => (j._id || j.id) === selectedJob).department})` }
                      : null
                }
                onChange={(option) => setSelectedJob(option ? option.value : 'all')}
              />
            </div>
          </div>

          {/* Kanban Board */}
          <div className="d-flex align-items-start overflow-auto project-status pb-4" style={{ minHeight: '60vh' }}>
            {STAGES.map((stage) => {
              const columnCandidates = getCandidatesByStage(stage.name);
              return (
                <div 
                  key={stage.name} 
                  className={`p-3 rounded bg-transparent-secondary w-100 me-3 ${dragOverStage === stage.name ? 'border border-primary' : ''}`}
                  style={{ minWidth: '320px', flex: '0 0 320px', transition: 'all 0.2s' }}
                  onDragOver={(e) => handleDragOver(e, stage.name)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, stage.name)}
                >
                  {/* Column Header */}
                  <div className="bg-white p-2 rounded mb-2 shadow-sm">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className={`bg-transparent-${stage.color} p-1 d-flex rounded-circle me-2`}>
                          <span className={`bg-${stage.color} rounded-circle d-block p-1`}></span>
                        </span>
                        <h5 className="me-2 mb-0 fs-15 fw-bold">{stage.name}</h5>
                        <span className="badge bg-light border text-dark rounded-pill">{columnCandidates.length}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Drop Zone */}
                  <div className="kanban-drag-wrap" style={{ minHeight: '150px' }}>
                    {columnCandidates.map((candidate) => (
                      <div 
                        key={candidate._id || candidate.id}
                        className={`card kanban-card mb-2 shadow-sm ${draggedItem === (candidate._id || candidate.id) ? 'opacity-50' : ''}`}
                        draggable 
                        onDragStart={(e) => handleDragStart(e, candidate._id || candidate.id)}
                        style={{ cursor: 'grab' }}
                      >
                        <div className="card-body p-3">
                          <div className="d-flex align-items-start justify-content-between mb-2">
                            <div>
                              <h6 className="mb-1 fw-bold fs-15 text-dark">{candidate.name}</h6>
                              {candidate.department && (
                                <span className="badge bg-light text-dark border mb-2">{candidate.department}</span>
                              )}
                            </div>
                            <div className="dropdown">
                              <a href="#" onClick={(e) => e.preventDefault()} className="text-muted" data-bs-toggle="dropdown">
                                <i className="ti ti-dots-vertical"></i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-end p-2 shadow-sm border-0">
                                <li>
                                  <a href="#" onClick={(e) => { e.preventDefault(); openCandidateModal(candidate); }} className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </a>
                                </li>
                                <li>
                                  <a href="#" onClick={(e) => { e.preventDefault(); executeDelete('candidate', candidate._id || candidate.id); }} className="dropdown-item text-danger rounded-1">
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="d-flex flex-column gap-1 text-muted fs-13">
                            {candidate.email && (
                              <div className="d-flex align-items-center">
                                <i className="ti ti-mail me-2"></i> {candidate.email}
                              </div>
                            )}
                            {candidate.phone && (
                              <div className="d-flex align-items-center">
                                <i className="ti ti-phone me-2"></i> {candidate.phone}
                              </div>
                            )}
                          </div>
                          
                          {candidate.resume_url && (
                            <div className="mt-3 pt-2 border-top">
                              <a href={getFullUrl(candidate.resume_url)} target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center text-primary fs-13 text-decoration-none">
                                <i className="ti ti-file-text me-1"></i> View Resume
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* List Job Modal */}
      <Modal open={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} title={isEditJob ? "Edit Job" : "Post New Job"} size="lg">
        <form onSubmit={handleJobSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-medium">Job Title <span className="text-danger">*</span></label>
              <input type="text" className="form-control" value={jobFormData.title} onChange={(e) => setJobFormData({...jobFormData, title: e.target.value})} placeholder="e.g., Senior React Developer" required />
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-medium d-flex justify-content-between">
                Department
                {!isCustomDept && (
                  <span style={{fontSize: '0.8rem', cursor: 'pointer'}} className="text-primary" onClick={() => setIsCustomDept(true)}>+ Add Custom</span>
                )}
              </label>
              {isCustomDept ? (
                <div className="d-flex gap-2">
                  <input type="text" className="form-control" value={customDept} onChange={(e) => setCustomDept(e.target.value)} placeholder="New Department" />
                  <button type="button" className="btn btn-icon btn-success flex-shrink-0" onClick={handleAddCustomDept}><i className="ti ti-check"></i></button>
                  <button type="button" className="btn btn-icon btn-danger flex-shrink-0" onClick={() => setIsCustomDept(false)}><i className="ti ti-x"></i></button>
                </div>
              ) : (
                <CustomSelect 
                  options={departments.map(d => ({ value: d, label: d }))}
                  value={jobFormData.department ? { value: jobFormData.department, label: jobFormData.department } : null}
                  onChange={(opt) => setJobFormData({...jobFormData, department: opt ? opt.value : ''})}
                  placeholder="Select Department"
                />
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">Location</label>
              <input type="text" className="form-control" value={jobFormData.location} onChange={(e) => setJobFormData({...jobFormData, location: e.target.value})} placeholder="e.g., Surat, Remote" />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">Employment Type</label>
              <CustomSelect 
                options={['Full Time', 'Part Time', 'Contract', 'Internship'].map(t => ({ value: t, label: t }))}
                value={{ value: jobFormData.employment_type, label: jobFormData.employment_type }}
                onChange={(opt) => setJobFormData({...jobFormData, employment_type: opt.value})}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">Status</label>
              <CustomSelect 
                options={['Open', 'Closed'].map(t => ({ value: t, label: t }))}
                value={{ value: jobFormData.status, label: jobFormData.status }}
                onChange={(opt) => setJobFormData({...jobFormData, status: opt.value})}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">Applications Count</label>
              <input type="number" className="form-control" value={jobFormData.applications_count} onChange={(e) => setJobFormData({...jobFormData, applications_count: parseInt(e.target.value) || 0})} />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">Posted Date</label>
              <CustomDatePicker 
                selected={jobFormData.posted_date ? new Date(jobFormData.posted_date) : null}
                onChange={(date) => setJobFormData({...jobFormData, posted_date: date})}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">Experience</label>
              <input type="text" className="form-control" value={jobFormData.experience} onChange={(e) => setJobFormData({...jobFormData, experience: e.target.value})} placeholder="e.g., 2-4 years" />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">Salary Range</label>
              <input type="text" className="form-control" value={jobFormData.salary_range} onChange={(e) => setJobFormData({...jobFormData, salary_range: e.target.value})} placeholder="e.g., ₹15L - ₹20L" />
            </div>

            <div className="col-md-12">
              <label className="form-label fw-medium">Stage (Default for new applicants)</label>
              <CustomSelect 
                options={STAGE_NAMES.map(s => ({ value: s, label: s }))}
                value={{ value: jobFormData.stage, label: jobFormData.stage }}
                onChange={(opt) => setJobFormData({...jobFormData, stage: opt.value})}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-medium">Job Description</label>
              <textarea 
                className="form-control" 
                rows="4" 
                value={jobFormData.description} 
                onChange={(e) => setJobFormData({...jobFormData, description: e.target.value})} 
                placeholder="Enter job description..."
              ></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-light" onClick={() => setIsJobModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEditJob ? 'Update Job' : 'Post Job'}</button>
          </div>
        </form>
      </Modal>

      {/* Add/Edit Candidate Modal */}
      <Modal open={isCandidateModalOpen} onClose={() => setIsCandidateModalOpen(false)} title={isEditCandidate ? "Edit Candidate" : "Add Candidate"} size="md">
        <form onSubmit={handleCandidateSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value={candidateFormData.name} onChange={e => setCandidateFormData({...candidateFormData, name: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Email</label>
            <input type="email" className="form-control" value={candidateFormData.email} onChange={e => setCandidateFormData({...candidateFormData, email: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Phone</label>
            <input type="text" className="form-control" value={candidateFormData.phone} onChange={e => setCandidateFormData({...candidateFormData, phone: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Department</label>
            <CustomSelect 
              options={departments.map(d => ({ value: d, label: d }))}
              value={candidateFormData.department ? { value: candidateFormData.department, label: candidateFormData.department } : null}
              onChange={(opt) => setCandidateFormData({...candidateFormData, department: opt ? opt.value : ''})}
              placeholder="Select Department"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Stage</label>
            <CustomSelect 
              options={STAGE_NAMES.map(s => ({ value: s, label: s }))}
              value={{ value: candidateFormData.stage, label: candidateFormData.stage }}
              onChange={(opt) => setCandidateFormData({...candidateFormData, stage: opt.value})}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Resume Upload (Optional)</label>
            <div className="d-flex align-items-center gap-2">
              <input type="file" className="form-control" onChange={handleResumeUpload} accept=".pdf,.doc,.docx" />
              {isUploadingResume && <span className="text-muted fs-13">Uploading...</span>}
            </div>
            {candidateFormData.resume_url && (
              <div className="mt-2 fs-13">
                <span className="text-success"><i className="ti ti-check"></i></span> <a href={getFullUrl(candidateFormData.resume_url)} target="_blank" rel="noopener noreferrer" className="text-decoration-none">View Current Resume</a>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-light" onClick={() => setIsCandidateModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEditCandidate ? "Update Candidate" : "Save Candidate"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
