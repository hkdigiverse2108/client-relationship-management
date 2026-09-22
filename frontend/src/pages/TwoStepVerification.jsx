import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../api/services/authService';

const OTP_VALIDITY_SECONDS = 120; // 2 minutes

const TwoStepVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Email from ForgotPassword2 state, fallback to sessionStorage
  const emailFromState = location.state?.email || '';
  const [email] = useState(() => {
    if (emailFromState) {
      sessionStorage.setItem('reset_otp_email', emailFromState);
      return emailFromState;
    }
    return sessionStorage.getItem('reset_otp_email') || '';
  });

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(OTP_VALIDITY_SECONDS);
  const [otpExpired, setOtpExpired] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    setTimeLeft(OTP_VALIDITY_SECONDS);
    setOtpExpired(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setOtpExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleDigitChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 1);
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    setDigits(newDigits);
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otpExpired) {
      toast.error('OTP has expired. Please request a new OTP.');
      return;
    }

    const otp = digits.join('');
    if (otp.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      // Verify OTP against backend before proceeding
      await authService.verifyOtp({ email, otp });
      // OTP valid — go to reset password page
      navigate('/reset-password', { state: { email, otp } });
    } catch (err) {
      toast.error(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error('Email not found. Please go back and try again.');
      return;
    }
    setResendLoading(true);
    try {
      await authService.forgotPassword(email);
      toast.success('A new OTP has been sent to your email.');
      setDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      startTimer();
    } catch (err) {
      toast.error(err.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
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
                    <img src="/assets/img/bg/authentication-bg-08.svg" alt="Img" />
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12">
                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
                  <div className="col-md-7 mx-auto vh-100">
                    <form onSubmit={handleSubmit} className="vh-100">
                      <div className="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
                        {/* Logo at the top — same as Login2, ForgotPassword2 */}
                        <div className="mx-auto mb-5 text-center">
                          <img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
                        </div>

                        <div className="">
                          <div className="text-center mb-3">
                            <h2 className="mb-2">2 Step Verification</h2>
                            <p className="mb-0">
                              Please enter the OTP sent to <strong>{email || 'your email'}</strong>
                            </p>
                          </div>

                          <div className="text-center otp-input">
                            {/* 6-digit OTP boxes */}
                            <div className="d-flex align-items-center justify-content-center mb-3" style={{ gap: '8px' }}>
                              {digits.map((digit, index) => (
                                <input
                                  key={index}
                                  ref={el => inputRefs.current[index] = el}
                                  type="text"
                                  inputMode="numeric"
                                  className="rounded py-sm-3 py-2 text-center fs-26 fw-bold"
                                  style={{ width: '48px', maxWidth: '48px' }}
                                  value={digit}
                                  onChange={(e) => handleDigitChange(index, e.target.value)}
                                  onKeyDown={(e) => handleKeyDown(index, e)}
                                  maxLength={1}
                                  disabled={otpExpired}
                                />
                              ))}
                            </div>

                            <div>
                              {/* Timer */}
                              <div className="badge bg-danger-transparent mb-3">
                                <p className="d-flex align-items-center mb-0">
                                  <i className="ti ti-clock me-1"></i>
                                  {otpExpired
                                    ? <span className="text-danger fw-semibold">OTP Expired</span>
                                    : <span className={timeLeft <= 30 ? 'text-danger' : ''}>{formatTime(timeLeft)}</span>
                                  }
                                </p>
                              </div>

                              {/* Resend OTP */}
                              <div className="mb-3 d-flex justify-content-center">
                                {otpExpired ? (
                                  <button
                                    type="button"
                                    className="btn btn-link p-0 text-primary"
                                    onClick={handleResendOtp}
                                    disabled={resendLoading}
                                  >
                                    {resendLoading ? 'Sending...' : '🔄 Resend OTP'}
                                  </button>
                                ) : (
                                  <p className="text-gray-9 mb-0">
                                    Didn't get the OTP?{' '}
                                    <span className="text-muted">Resend available in {formatTime(timeLeft)}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                              disabled={loading || otpExpired}
                            >
                              {loading ? 'Verifying...' : 'Verify & Proceed'}
                            </button>
                          </div>
                        </div>

                        <div className="mt-5 pb-4 text-center">
                          <p className="mb-0 text-gray-9">Copyright &copy; 2026 - HK DigiVerse CRM</p>
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

export default TwoStepVerification;
