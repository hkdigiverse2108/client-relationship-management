import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../api/services/authService';

const ResetPassword2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Email + OTP passed from TwoStepVerification2 via navigation state
  const emailFromState = location.state?.email || '';
  const otpFromState = location.state?.otp || '';

  const [email] = useState(() => {
    if (emailFromState) {
      sessionStorage.setItem('reset_otp_email', emailFromState);
      return emailFromState;
    }
    return sessionStorage.getItem('reset_otp_email') || '';
  });

  const [otp] = useState(() => {
    if (otpFromState) {
      sessionStorage.setItem('reset_otp_code', otpFromState);
      return otpFromState;
    }
    return sessionStorage.getItem('reset_otp_code') || '';
  });

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error('Please enter a new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword({ email, otp, new_password: newPassword });
      // Cleanup sessionStorage
      sessionStorage.removeItem('reset_otp_email');
      sessionStorage.removeItem('reset_otp_code');
      toast.success('Password reset successfully! Please sign in.');
      navigate('/login-2');
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="container-fuild">
          <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
            <div className="row">
              <div className="col-lg-5">
                <div className="d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100 bg-primary-transparent">
                  <div>
                    <img src="/assets/img/bg/authentication-bg-03.svg" alt="Img" />
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12">
                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
                  <div className="col-md-7 mx-auto vh-100">
                    <form onSubmit={handleSubmit} className="vh-100">
                      <div className="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
                        <div className="mx-auto mb-5 text-center">
                          <img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
                        </div>
                        <div className="">
                          <div className="text-center mb-3">
                            <h2 className="mb-2">Set New Password</h2>
                            <p className="mb-0">
                              Enter your new password for <strong>{email || 'your account'}</strong>.
                            </p>
                          </div>

                          {/* New Password */}
                          <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <div className="pass-group" id="passwordInput">
                              <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control pass-input"
                                placeholder="Enter new password"
                                required
                              />
                              <span
                                className={`ti toggle-password ${showNewPassword ? 'ti-eye' : 'ti-eye-off'}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setShowNewPassword(p => !p)}
                              ></span>
                            </div>
                          </div>

                          {/* Confirm Password */}
                          <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <div className="pass-group">
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pass-inputs form-control"
                                placeholder="Re-enter new password"
                                required
                              />
                              <span
                                className={`ti toggle-passwords ${showConfirmPassword ? 'ti-eye' : 'ti-eye-off'}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setShowConfirmPassword(p => !p)}
                              ></span>
                            </div>
                            {/* Live match indicator */}
                            {confirmPassword && (
                              <small className={`mt-1 d-block ${newPassword === confirmPassword ? 'text-success' : 'text-danger'}`}>
                                {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                              </small>
                            )}
                          </div>

                          <div className="mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                              disabled={loading}
                            >
                              {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                          </div>
                        </div>
                        <div className="mt-5 pb-4 text-center">
                          <p className="mb-0 text-gray-9">Copyright &copy; 2026 - HK Digiverse CRM</p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword2;
