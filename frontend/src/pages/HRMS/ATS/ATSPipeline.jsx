import React, { useState, useEffect } from 'react';
import { FiPlus, FiMoreVertical, FiEdit2, FiTrash2, FiSearch, FiCheck } from 'react-icons/fi';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { atsService } from '@/api/services/atsService';
import { hrmsService } from '@/api/services/hrmsService';
import { APP_CONFIG } from '@/config/appConfig';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/components/common/ConfirmDialog/confirmDialog';
import './ATSPipeline.css';

const backendUrl = APP_CONFIG.apiBaseUrl.replace('/api/v1', '');
const getFullUrl = (path) => path?.startsWith('http') ? path : backendUrl + path;

const STAGES = [
  'APPLIED',
  'SCREENING',
  'INTERVIEW SCHEDULED',
  'SELECTED',
  'REJECTED',
  'JOINED'
];

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
    experience: '', salary_range: '', description: '', stage: STAGES[0]
  });
  const [isEditJob, setIsEditJob] = useState(false);
  
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isEditCandidate, setIsEditCandidate] = useState(false);
  const [candidateFormData, setCandidateFormData] = useState({
    name: '', email: '', phone: '', stage: STAGES[0], department: '', resume_url: ''
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
      if (res?.length > 0 && !selectedJob) {
        setSelectedJob('all');
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
        // Fallback defaults
        setDepartments(['Engineering', 'Sales', 'Marketing', 'HR', 'Operations']);
      } else {
        setDepartments(depts.map(d => d.name));
      }
    } catch (error) {
      setDepartments(['Engineering', 'Sales', 'Marketing', 'HR', 'Operations']);
    }
  };

  // --- Drag and Drop Logic ---
  // --- Drag and Drop Logic ---
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);

  const handleDragStart = (e, candidateId) => {
    setDraggedItem(candidateId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, stage) => {
    e.preventDefault();
    if (stage !== dragOverStage) setDragOverStage(stage);
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

      if (isEditJob && jobFormData.id) {
        await atsService.updateJob(jobFormData.id, payload);
        toast.success('Job updated successfully');
      } else {
        const newJob = await atsService.createJob(payload);
        toast.success('Job created successfully');
        if (!selectedJob) setSelectedJob(newJob._id || newJob.id);
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
        status: 'Open', applications_count: 0, posted_date: new Date().toISOString().split('T')[0],
        experience: '', salary_range: '', description: '', stage: STAGES[0]
      });
      setIsCustomDept(false);
    }
    setIsJobModalOpen(true);
  };

  // --- Candidate Form Handlers ---
  const handleCandidateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return toast.error('Please select a job first');
    
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
      setCandidateFormData({ name: '', email: '', phone: '', stage: STAGES[0], department: '', resume_url: '' });
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
    const isConfirmed = await confirmDialog({ 
      title: "Confirm Delete", 
      text: `Are you sure you want to delete this ${type}?` 
    });
    
    if (!isConfirmed) return;

    try {
      if (type === 'job') {
        await atsService.deleteJob(id);
        toast.success('Job deleted successfully');
        if (selectedJob === id) setSelectedJob('');
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

  const getCandidatesByStage = (stage) => candidates.filter(c => c.stage === stage);

  const renderJobsTable = () => (
    <div className="table-responsive bg-white rounded-3 shadow-sm border mt-3">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Department</th>
            <th>Location</th>
            <th>Type</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(j => (
            <tr key={j._id || j.id}>
              <td className="fw-bold">{j.title}</td>
              <td><span className="badge bg-light text-dark border">{j.department}</span></td>
              <td>{j.location}</td>
              <td>{j.employment_type}</td>
              <td>
                <span className={`badge ${j.status === 'Open' ? 'bg-success' : 'bg-secondary'}`}>
                  {j.status}
                </span>
              </td>
              <td className="text-end">
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-sm btn-primary" onClick={() => { setSelectedJob(j._id || j.id); setActiveTab('Pipeline'); }}>
                    View Pipeline
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => openJobModal(j)}>
                    <FiEdit2 />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => executeDelete('job', j._id || j.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {jobs.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-muted">No jobs posted yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="ats-pipeline-container">
      {/* Top Bar Tabs & Actions */}
      <div className="ats-top-bar d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-3">
          <Button 
            variant={activeTab === 'Jobs List' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('Jobs List')}
          >
            Jobs List
          </Button>
          <Button 
            variant={activeTab === 'Pipeline' ? 'primary' : 'outline'}
            onClick={() => {
              if (jobs.length > 0 && !selectedJob) setSelectedJob(jobs[0]._id || jobs[0].id);
              setActiveTab('Pipeline');
            }}
          >
            Candidate Pipeline
          </Button>
        </div>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => openJobModal()}><FiPlus /> List Job</Button>
          {activeTab === 'Pipeline' && selectedJob && selectedJob !== 'all' && (
            <Button variant="outline" onClick={() => openCandidateModal()}><FiPlus /> Add Candidate</Button>
          )}
        </div>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'Jobs List' ? (
        renderJobsTable()
      ) : (
        <>
          <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-white border rounded-3 shadow-sm">
            <label className="fw-bold" style={{ color: 'var(--color-text-primary)' }}>Active Job Pipeline:</label>
            <select 
              className="form-select" 
              style={{ width: '300px', background: 'var(--color-surface)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              <option value="all">All Jobs</option>
              {jobs.map(j => (
                <option key={j._id || j.id} value={j._id || j.id}>{j.title} ({j.department})</option>
              ))}
            </select>
          </div>

          {/* Kanban Board */}
          <div className="ats-kanban-board">
        {STAGES.map(stage => {
          const columnCandidates = getCandidatesByStage(stage);
          return (
            <div key={stage} className="ats-kanban-column">
              <div className="ats-kanban-column-header">
                <h6 className="m-0 fw-bold">{stage}</h6>
                <span className="badge bg-secondary rounded-pill">{columnCandidates.length}</span>
              </div>
              
              <div 
                className={`ats-kanban-droppable ${dragOverStage === stage ? 'dragging-over' : ''}`}
                onDragOver={(e) => handleDragOver(e, stage)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, stage)}
              >
                {columnCandidates.map((candidate) => (
                  <div
                    key={candidate._id || candidate.id}
                    className={`ats-candidate-card ${draggedItem === (candidate._id || candidate.id) ? 'is-dragging' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, candidate._id || candidate.id)}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="fw-bold mb-1" style={{color: 'var(--color-text-primary)'}}>{candidate.name}</div>
                        {candidate.department && <div className="badge bg-light text-dark mb-1 border">{candidate.department}</div>}
                        {candidate.email && <div style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)'}}>{candidate.email}</div>}
                        {candidate.phone && <div style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)'}}>{candidate.phone}</div>}
                        {candidate.resume_url && (
                          <a href={getFullUrl(candidate.resume_url)} target="_blank" rel="noopener noreferrer" style={{fontSize: '0.8rem', display: 'inline-block', marginTop: '2px'}}>View Resume</a>
                        )}
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-link text-primary p-0 m-0" onClick={() => openCandidateModal(candidate)} title="Edit Candidate">
                          <FiEdit2 size={14} />
                        </button>
                        <button className="btn btn-link text-danger p-0 m-0" onClick={() => executeDelete('candidate', candidate._id || candidate.id)} title="Delete Candidate">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
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
        <form onSubmit={handleJobSubmit} className="p-3">
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label">Job Title</label>
              <Input 
                value={jobFormData.title} 
                onChange={(e) => setJobFormData({...jobFormData, title: e.target.value})} 
                placeholder="e.g., Senior React Developer" 
                required 
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label d-flex justify-content-between">
                Department
                {!isCustomDept && (
                  <span style={{fontSize: '0.8rem', color: 'var(--color-primary)', cursor: 'pointer'}} onClick={() => setIsCustomDept(true)}>+ Custom</span>
                )}
              </label>
              {isCustomDept ? (
                <div className="d-flex gap-2 align-items-start">
                  <div className="flex-grow-1">
                    <Input value={customDept} onChange={(e) => setCustomDept(e.target.value)} placeholder="New Department" required />
                  </div>
                  <div className="d-flex gap-1" style={{ paddingTop: '5px' }}>
                    <button type="button" className="btn btn-link text-success d-flex align-items-center justify-content-center p-0" style={{ height: '35px', width: '35px' }} onClick={handleAddCustomDept} title="Add Department">
                      <FiCheck size={18} />
                    </button>
                    <button type="button" className="btn btn-link text-danger d-flex align-items-center justify-content-center p-0" style={{ height: '35px', width: '35px' }} onClick={() => setIsCustomDept(false)} title="Cancel">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <select className="form-select" value={jobFormData.department} onChange={(e) => setJobFormData({...jobFormData, department: e.target.value})} style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }} required>
                  <option value="">Select Department</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Location</label>
              <Input value={jobFormData.location} onChange={(e) => setJobFormData({...jobFormData, location: e.target.value})} placeholder="e.g., Surat, Remote" />
            </div>

            <div className="col-md-6">
              <label className="form-label">Employment Type</label>
              <select className="form-select" value={jobFormData.employment_type} onChange={(e) => setJobFormData({...jobFormData, employment_type: e.target.value})} style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select className="form-select" value={jobFormData.status} onChange={(e) => setJobFormData({...jobFormData, status: e.target.value})} style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Applications Count</label>
              <Input type="number" value={jobFormData.applications_count} onChange={(e) => setJobFormData({...jobFormData, applications_count: parseInt(e.target.value) || 0})} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Posted Date</label>
              <Input type="date" value={jobFormData.posted_date} onChange={(e) => setJobFormData({...jobFormData, posted_date: e.target.value})} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Experience</label>
              <Input value={jobFormData.experience} onChange={(e) => setJobFormData({...jobFormData, experience: e.target.value})} placeholder="e.g., 2-4 years" />
            </div>

            <div className="col-md-6">
              <label className="form-label">Salary Range</label>
              <Input value={jobFormData.salary_range} onChange={(e) => setJobFormData({...jobFormData, salary_range: e.target.value})} placeholder="e.g., ₹15L - ₹20L" />
            </div>

            <div className="col-md-12">
              <label className="form-label">Stage (Default for new applicants)</label>
              <select className="form-select" value={jobFormData.stage} onChange={(e) => setJobFormData({...jobFormData, stage: e.target.value})} style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}>
                {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">Job Description</label>
              <textarea 
                className="form-control" 
                rows="4" 
                value={jobFormData.description} 
                onChange={(e) => setJobFormData({...jobFormData, description: e.target.value})} 
                placeholder="Enter job description..."
                style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
              ></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={() => setIsJobModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">{isEditJob ? 'Update Job' : 'Post Job'}</Button>
          </div>
        </form>
      </Modal>

      {/* Add/Edit Candidate Modal */}
      <Modal open={isCandidateModalOpen} onClose={() => setIsCandidateModalOpen(false)} title={isEditCandidate ? "Edit Candidate" : "Add Candidate"} size="md">
        <form onSubmit={handleCandidateSubmit} className="p-3">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <Input value={candidateFormData.name} onChange={e => setCandidateFormData({...candidateFormData, name: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <Input type="email" value={candidateFormData.email} onChange={e => setCandidateFormData({...candidateFormData, email: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <Input value={candidateFormData.phone} onChange={e => setCandidateFormData({...candidateFormData, phone: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select className="form-select" value={candidateFormData.department} onChange={e => setCandidateFormData({...candidateFormData, department: e.target.value})} style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}>
                <option value="">Select Department</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Stage</label>
            <select className="form-select" value={candidateFormData.stage} onChange={e => setCandidateFormData({...candidateFormData, stage: e.target.value})} style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}>
                {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Resume Upload (Optional)</label>
            <div className="d-flex align-items-center gap-2">
              <input type="file" className="form-control" onChange={handleResumeUpload} style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }} accept=".pdf,.doc,.docx" />
              {isUploadingResume && <span className="text-muted" style={{fontSize: '0.8rem'}}>Uploading...</span>}
            </div>
            {candidateFormData.resume_url && (
              <div className="mt-1" style={{fontSize: '0.8rem'}}>
                <span className="text-success">✓</span> <a href={getFullUrl(candidateFormData.resume_url)} target="_blank" rel="noopener noreferrer">View Current Resume</a>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={() => setIsCandidateModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">{isEditCandidate ? "Update Candidate" : "Save Candidate"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
