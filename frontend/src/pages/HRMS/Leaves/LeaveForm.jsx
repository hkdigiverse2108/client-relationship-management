import React, { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { FiUploadCloud } from 'react-icons/fi';
import api from '@/api/axiosClient';
import { toast } from 'react-hot-toast';

export default function LeaveForm({ show, handleClose, onSuccess, globalBalance }) {
  const [formData, setFormData] = useState({
    leave_type: 'Monthly Leave',
    start_date: '',
    end_date: '',
    day_type: 'Full Day',
    reason: '',
  });

  const [loading, setLoading] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [balance, setBalance] = useState({ allowed: 1, remaining: 1 });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      setErrors({});
      if (globalBalance) {
        setBalance(globalBalance["Monthly Leave"] || { allowed: 1, remaining: 1 });
      } else {
        api.get('/hrms/leaves/balance')
          .then(res => setBalance(res["Monthly Leave"] || res))
          .catch(console.error);
      }
    }
  }, [show, globalBalance]);

  useEffect(() => {
    if (formData.leave_type === 'Monthly Leave') {
      setFormData(prev => ({ ...prev, day_type: 'Full Day' }));
    }
  }, [formData.leave_type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Manual Validation
    const newErrors = {};
    if (!formData.start_date) newErrors.start_date = "Start Date is required";
    if (!formData.end_date) newErrors.end_date = "End Date is required";
    if (!formData.reason?.trim()) newErrors.reason = "Reason is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    if (formData.leave_type === 'Monthly Leave' && balance.remaining === 0) {
      toast.error('You have exhausted your monthly free leave allowance.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        proof_url: proofFile ? URL.createObjectURL(proofFile) : null 
      };
      
      await api.post('/hrms/leaves', payload);
      toast.success('Leave requested successfully!');
      
      setFormData({
        leave_type: 'Monthly Leave',
        start_date: '',
        end_date: '',
        day_type: 'Full Day',
        reason: '',
      });
      setProofFile(null);
      
      if (onSuccess) onSuccess();
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit leave request');
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || (formData.leave_type === 'Monthly Leave' && balance.remaining === 0);

  return (
    <Modal 
      open={show} 
      onClose={handleClose} 
      title="Request Leave" 
      size="lg"
      footer={
        <div className="d-flex justify-content-end gap-2 w-100">
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" disabled={isSubmitDisabled} onClick={handleSubmit}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      }
    >
      <div className="px-4 py-3">
        <div className="mb-3">
          <label className="fw-semibold small form-label">Leave Type <span className="text-danger">*</span></label>
          <select 
            name="leave_type" 
            value={formData.leave_type} 
            onChange={handleChange}
            className={`form-select py-2 bg-light-subtle ${errors.leave_type ? 'is-invalid' : ''}`}
          >
            <option value="Monthly Leave">Monthly Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
            <option value="Other">Other</option>
          </select>
          {formData.leave_type === 'Monthly Leave' && (
            <div className={`form-text mt-2 small ${balance.remaining === 0 ? 'text-danger fw-medium' : 'text-muted'}`}>
              Free Leave Allowance: {balance.allowed} Free Day(s) per Month (Remaining: {balance.remaining} Day(s))
              {balance.remaining === 0 && <span className="d-block mt-1">You have exhausted your monthly free leave allowance. Please select Unpaid Leave or another option.</span>}
            </div>
          )}
        </div>

        <Input 
          label={<span>Start Date <span className="text-danger">*</span></span>}
          type="date" 
          name="start_date" 
          value={formData.start_date} 
          onChange={handleChange}
          className="bg-light-subtle"
          error={errors.start_date}
        />

        <Input 
          label={<span>End Date <span className="text-danger">*</span></span>}
          type="date" 
          name="end_date" 
          value={formData.end_date} 
          onChange={handleChange}
          className="bg-light-subtle"
          error={errors.end_date}
        />

        <div className="mb-3">
          <label className="fw-semibold small form-label">Day Type <span className="text-danger">*</span></label>
          <select 
            name="day_type" 
            value={formData.day_type} 
            onChange={handleChange}
            disabled={formData.leave_type === 'Monthly Leave'}
            className="form-select py-2 bg-light-subtle"
          >
            <option value="Full Day">Full Day</option>
            <option value="First Half">First Half</option>
            <option value="Second Half">Second Half</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="fw-semibold small form-label">Reason <span className="text-danger">*</span></label>
          <textarea 
            rows={3} 
            name="reason" 
            value={formData.reason} 
            onChange={handleChange}
            placeholder="Reason for leave..."
            className={`form-control py-2 bg-light-subtle ${errors.reason ? 'is-invalid' : ''}`}
          />
          {errors.reason && <div className="invalid-feedback d-block">{errors.reason}</div>}
        </div>

        <div className="mb-3">
          <label className="fw-semibold small form-label" style={{ color: "#475569" }}>Proof of Leave (Optional)</label>
          <div className="border rounded p-4 text-center" style={{ borderColor: '#cbd5e1', borderStyle: 'dashed !important', borderWidth: '2px' }}>
            <input 
              type="file" 
              id="leaveProof" 
              className="d-none" 
              accept="image/png, image/jpeg, image/webp" 
              onChange={handleFileChange}
            />
            <label htmlFor="leaveProof" className="d-block mb-0" style={{ cursor: 'pointer' }}>
              <FiUploadCloud size={28} style={{ color: "#64748b" }} className="mb-2" />
              {proofFile ? (
                <p className="fw-medium mb-0" style={{ color: "#475569" }}>{proofFile.name}</p>
              ) : (
                <>
                  <p className="fw-medium mb-0" style={{ color: "#64748b" }}>Click to upload leave proof image</p>
                  <small style={{ color: "#94a3b8" }}>PNG, JPG, JPEG, WEBP up to 5MB</small>
                </>
              )}
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
}
