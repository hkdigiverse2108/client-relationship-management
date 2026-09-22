import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <div className="main-wrapper">

		<div className="container-fuild">
			<div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
				<div className="row">
					<div className="col-lg-5">
						<div className="d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100 bg-primary-transparent">
							<div>
								<img src="/assets/img/bg/authentication-bg-02.svg" alt="Img" />
							</div>
						</div>
					</div>
					<div className="col-lg-7 col-md-12 col-sm-12">
						<div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
							<div className="col-md-7 mx-auto vh-100">
								<form onSubmit={(e) => e.preventDefault()} className="vh-100">
									<div className="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
										<div className=" mx-auto mb-5 text-center">
											<img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
										</div>
										<div className="">
											<div className="text-center mb-3">
												<h2 className="mb-2">Sign Up</h2>
												<p className="mb-0">Please enter your details to sign up</p>
											</div>
											<div className="mb-3">
												<label className="form-label">Name</label>
												<div className="input-group">
													<input type="text" value="" className="form-control border-end-0" />
													<span className="input-group-text border-start-0">
														<i className="ti ti-user"></i>
													</span>
												</div>
											</div>
											<div className="mb-3">
												<label className="form-label">Email Address</label>
												<div className="input-group">
													<input type="text" value="" className="form-control border-end-0" />
													<span className="input-group-text border-start-0">
														<i className="ti ti-mail"></i>
													</span>
												</div>
											</div>
											<div className="mb-3">
												<label className="form-label">Password</label>
												<div className="pass-group">
													<input type="password" className="pass-input form-control" />
													<span className="ti toggle-password ti-eye-off"></span>
												</div>
											</div>
											<div className="mb-3">
												<label className="form-label">Confirm Password</label>
												<div className="pass-group">
													<input type="password" className="pass-inputs form-control" />
													<span className="ti toggle-passwords ti-eye-off"></span>
												</div>
											</div>
											<div className="d-flex align-items-center justify-content-between mb-3">
												<div className="d-flex align-items-center">
													<div className="form-check form-check-md mb-0">
														<input className="form-check-input" id="remember_me" type="checkbox" />
														<label htmlFor="remember_me" className="form-check-label text-dark mt-0">Agree to <span className="text-primary">Terms & Privacy</span></label>
													</div>
												</div>
											</div>
											<div className="mb-3">
												<button type="submit" className="btn btn-primary w-100">Sign Up</button>
											</div>
											<div className="text-center">
												<h6 className="fw-normal text-dark mb-0">Already have an account?
													<a href="/login" className="hover-a">Sign In</a>
												</h6>
											</div>
											<div className="login-or">
												<span className="span-or">Or</span>
											</div>
											<div className="mt-2">
												<div className="d-flex align-items-center justify-content-center flex-wrap">
													<div className="text-center me-2 flex-fill">
														<a href="#" onClick={(e) => e.preventDefault()}
															className="br-10 p-2 btn btn-info d-flex align-items-center justify-content-center">
															<img className="img-fluid m-1" src="/assets/img/icons/facebook-logo.svg" alt="Facebook" />
														</a>
													</div>
													<div className="text-center me-2 flex-fill">
														<a href="#" onClick={(e) => e.preventDefault()}
															className="br-10 p-2 btn btn-outline-light border d-flex align-items-center justify-content-center">
															<img className="img-fluid m-1" src="/assets/img/icons/google-logo.svg" alt="Facebook" />
														</a>
													</div>
													<div className="text-center flex-fill">
														<a href="#" onClick={(e) => e.preventDefault()}
															className="bg-dark br-10 p-2 btn btn-dark d-flex align-items-center justify-content-center">
															<img className="img-fluid m-1" src="/assets/img/icons/apple-logo.svg" alt="Apple" />
														</a>
													</div>
												</div>
											</div>
										</div>
										<div className="mt-5 pb-4 text-center">
											<p className="mb-0 text-gray-9">Copyright &copy; 2026 - Smarthr</p>
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

export default Register;
