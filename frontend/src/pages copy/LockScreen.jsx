import React from 'react';
import { Link } from 'react-router-dom';

const LockScreen = () => {
  return (
    <>
      <div className="main-wrapper">

		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-5">
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="d-flex flex-column justify-content-between vh-100">
							<div className=" mx-auto p-4 text-center">
								<img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
							</div>
							<div className="card">
								<div className="card-body p-4">
									<div className=" mb-4 text-center">
										<h2 className="mb-2">Welcome back! </h2>
										<img src="/assets/img/profiles/avatar-12.jpg" alt="img" className="img-fluid avatar avatar-xxl rounded-pill my-3" />
										<h6 className="text-dark">Adrian Davies</h6>
									</div>
									<div className="mb-3 ">
										<label className="form-label" >Password</label>
										<div className="pass-group">
											<input type="password" className="pass-input form-control" placeholder="Enter Your Password" />
											<span className="ti toggle-password ti-eye-off"></span>
										</div>
									</div>
									<button type="submit" className="btn btn-primary w-100">Sign In</button>
								</div>								
							</div>
							<div className="p-4 text-center">
								<div className="d-flex justify-content-center">
									<a href="#" className="me-3 text-gray-9">Terms & Condition</a>
									<a href="#" className="me-3 text-gray-9">Privacy</a>
									<a href="#" className="me-3 text-gray-9">Help</a>
								</div>
								<div className="p-2 text-center">
									<p className="mb-0 text-gray-9">Copyright &copy; 2026 - SmartHR</p>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	
    </>
  );
};

export default LockScreen;
