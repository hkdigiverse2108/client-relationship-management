import React from 'react';
import { Link } from 'react-router-dom';

const Error500 = () => {
  return (
    <>
      <div className="main-wrapper">

		<div className="container">
			<div>
				<div className="row justify-content-center align-items-center">
					
					<div className="col-md-8 d-flex justify-content-center align-items-center mx-auto">
						<div>
							<div className="p-4 text-center">
								<img src="/assets/img/logo.svg" alt="logo" className="img-fluid" />
							</div>
							<div className="error-images mb-4">
								<img src="/assets/img/bg/error-500.svg" alt="image" className="img-fluid" />
							</div>
							<div className="text-center">
								<h1 className="mb-3">Oops, something went wrong</h1>
								<p className="fs-16 text-center">Server Error 500. We apologise and are fixing the <br /> problem. Please try again at a  later stage</p>
								<div className="d-flex justify-content-center pb-4">
									<a href="/" className="btn btn-primary d-flex align-items-center "><i className="ti ti-arrow-left me-2"></i>Back to Dashboard</a>
								</div>
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

export default Error500;
