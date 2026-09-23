import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      toast.success('Welcome back! Logged in successfully.');
      navigate('/');
    } catch (err) {
      const backendMessage = err.response?.data?.detail;
      toast.error(backendMessage || err.message || 'Login failed. Please try again.');
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
						<div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
							<div className="col-md-7 mx-auto vh-100">
								<form onSubmit={handleSubmit} className="vh-100">
									<div className="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
										<div className=" mx-auto mb-5 text-center">
											<img src="/assets/img/logo.svg"
												className="img-fluid" alt="Logo" />
										</div>
										<div className="">
											<div className="text-center mb-3">
												<h2 className="mb-2">Welcome Back</h2>
												<p className="mb-0">Please enter your details to sign in</p>
											</div>
											<div className="mb-3">
												<label className="form-label">Email Address</label>
												<div className="input-group">
													<input
														type="email"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
														className="form-control border-end-0"
														placeholder="Enter your email"
														required
													/>
													<span className="input-group-text border-start-0">
														<i className="ti ti-mail"></i>
													</span>
												</div>
											</div>
											<div className="mb-3">
												<label className="form-label">Password</label>
												<div className="pass-group">
													<input
														type={showPassword ? 'text' : 'password'}
														value={password}
														onChange={(e) => setPassword(e.target.value)}
														className="pass-input form-control"
														placeholder="Enter your password"
														required
													/>
													<span
														className={`ti toggle-password ${showPassword ? 'ti-eye' : 'ti-eye-off'}`}
														style={{ cursor: 'pointer' }}
														onClick={() => setShowPassword(p => !p)}
													></span>
												</div>
											</div>
											<div className="d-flex align-items-center justify-content-between mb-3">
												<div className="d-flex align-items-center">
													<div className="form-check form-check-md mb-0">
														<input className="form-check-input" id="remember_me" type="checkbox" />
														<label htmlFor="remember_me" className="form-check-label mt-0">Remember Me</label>
													</div>
												</div>
												<div className="text-end">
													<a href="/forgot-password" className="link-danger">Forgot Password?</a>
												</div>
											</div>
											<div className="mb-3">
												<button
													type="submit"
													className="btn btn-primary w-100"
													disabled={loading}
												>
													{loading ? 'Signing in...' : 'Sign In'}
												</button>
											</div>
											<div className="text-center">
												<h6 className="fw-normal text-dark mb-0">By continuing, you agree to our
													<a href="/terms-condition" target="_blank" className="hover-a"> Terms</a> and 
													<a href="/privacy-policy" target="_blank" className="hover-a"> Privacy Policy</a>
												</h6>
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

export default Login;
