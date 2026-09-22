import axiosClient from "../axiosClient";

const ATS_BASE = "/ats";

export const atsService = {
  // Jobs
  getJobs: () => axiosClient.get(`${ATS_BASE}/jobs`),
  createJob: (data) => axiosClient.post(`${ATS_BASE}/jobs`, data),
  updateJob: (id, data) => axiosClient.put(`${ATS_BASE}/jobs/${id}`, data),
  deleteJob: (id) => axiosClient.delete(`${ATS_BASE}/jobs/${id}`),

  // Candidates
  getCandidates: (jobId) => {
    const params = jobId && jobId !== 'all' ? { job_id: jobId } : {};
    return axiosClient.get(`${ATS_BASE}/candidates`, { params });
  },
  createCandidate: (data) => axiosClient.post(`${ATS_BASE}/candidates`, data),
  updateCandidate: (id, data) => axiosClient.put(`${ATS_BASE}/candidates/${id}`, data),
  deleteCandidate: (id) => axiosClient.delete(`${ATS_BASE}/candidates/${id}`),
  
  // Drag and Drop State Update
  updateCandidateStage: (id, stage) => axiosClient.put(`${ATS_BASE}/candidates/${id}/stage`, null, { params: { stage } }),
  
  // Upload Resume
  uploadResume: (formData) => axiosClient.post(`${ATS_BASE}/candidates/upload-resume`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};
