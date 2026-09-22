import React from 'react';
import { Link } from 'react-router-dom';

const OutgoingCall = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content pb-4">
				{/* Breadcrumb */}
				<div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
					<div className="my-auto mb-2">
						<h2 className="mb-1">Outgoing Call</h2>
						<nav>
							<ol className="breadcrumb mb-0">
								<li className="breadcrumb-item">
									<a href="/"><i className="ti ti-smart-home"></i></a>
								</li>
								<li className="breadcrumb-item">
									Applications
								</li>
								<li className="breadcrumb-item active" aria-current="page">Outgoing Call</li>
							</ol>
						</nav>
					</div>
					<div className="head-icons">
						<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
							data-bs-original-title="Collapse" id="collapse-header">
							<i className="ti ti-chevrons-up"></i>
						</a>
					</div>
				</div>

				<div className="row">

					{/* Call */}
					<div className="col-xxl-12">
						<div className="card incoming-call mb-0">
							<div className="card-body text-center d-flex flex-column justify-content-center">
								<div className="voice-call-img mb-3">
									<img src="/assets/img/users/user-32.jpg" className="img-fluid rounded-circle" alt="img" />
								</div>
								<h4 className="fs-20 fw-bold">Anthony Lewis</h4>
								<p>Calling...</p>
								<div className="d-flex align-items-center justify-content-center">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center me-3"><i
											className="ti ti-video fs-20"></i></a>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center me-3"><i
											className="ti ti-microphone fs-20"></i></a>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="btn btn-danger call-item p-0 d-flex align-items-center justify-content-center me-3"><i
											className="ti ti-phone-off fs-20"></i></a>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center me-3"><i
											className="ti ti-user-plus fs-20"></i></a>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center"><i
											className="ti ti-volume fs-20"></i></a>
								</div>
							</div>
						</div>
					</div>
					{/* /Call */}

				</div>

			</div>
		</div>
		
    </>
  );
};

export default OutgoingCall;
