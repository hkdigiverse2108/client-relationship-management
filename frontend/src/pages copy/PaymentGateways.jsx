import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const PaymentGateways = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Financial Settings' },
						{ label: 'Payment Gateways', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
					<li className="nav-item">
						<a className="nav-link" href="/profile-settings"><i className="ti ti-settings me-2"></i>General
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/business-settings"><i className="ti ti-world-cog me-2"></i>Website
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/salary-settings"><i
								className="ti ti-device-ipad-horizontal-cog me-2"></i>App Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/email-settings"><i className="ti ti-server-cog me-2"></i>System
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link active" href="/payment-gateways"><i
								className="ti ti-settings-dollar me-2"></i>Financial Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/custom-css"><i className="ti ti-settings-2 me-2"></i>Other
							Settings</a>
					</li>
				</ul>
				<div className="row">
					<div className="col-xl-3 theiaStickySidebar">
						<div className="card">
							<div className="card-body">
								<div className="d-flex flex-column list-group settings-list">
									<a href="/payment-gateways"
										className="d-inline-flex align-items-center active rounded py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Payment Gateways</a>
									<a href="/tax-rates"
										className="d-inline-flex align-items-center rounded py-2 px-3">Tax Rates</a>
									<a href="/currencies"
										className="d-inline-flex align-items-center rounded py-2 px-3">Currencies</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							<div className="card-body pb-1">
								<div className="border-bottom mb-3 pb-3">
									<h4>Payment Gateways</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="row">
										<div className="col-xxl-6 col-xl-6 d-flex">
											<div className="card mb-3 flex-fill">
												
												<div className="card-body pt-0">
													<p>PayPal is the faster, safer way to send and receive money or make
														an
														online payment.</p>
												</div>
												<div
													className="card-footer d-flex align-items-center justify-content-between">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="btn btn-sm btn-outline-dark rounded">
														<i className="ti ti-checks me-2"></i>Connected</a>
													<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
														data-bs-target="#connect_payment"><i
															className="ti ti-settings fs-24 fw-normal"></i></a>
												</div>
											</div>
										</div>
										<div className="col-xxl-6 col-xl-6 d-flex">
											<div className="card mb-3 flex-fill">
												
												<div className="card-body pt-0">
													<p>APIs to accept credit cards, manage subscriptions, send money.
													</p>
												</div>
												<div
													className="card-footer d-flex align-items-center justify-content-between">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="btn btn-sm btn-outline-dark rounded">
														<i className="ti ti-checks me-2"></i>Connected</a>
													<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
														data-bs-target="#connect_payment"><i
															className="ti ti-settings fs-24 fw-normal"></i></a>
												</div>
											</div>
										</div>
										<div className="col-xxl-6 col-xl-6 d-flex">
											<div className="card mb-3 flex-fill">
												
												<div className="card-body pt-0">
													<p>Allows send international money transfers and payments quickly
														with
														low fees.</p>
												</div>
												<div
													className="card-footer d-flex align-items-center justify-content-between">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="btn btn-sm btn-outline-dark rounded">
														<i className="ti ti-checks me-2"></i>Connected</a>
													<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
														data-bs-target="#connect_payment"><i
															className="ti ti-settings fs-24 fw-normal"></i></a>
												</div>
											</div>
										</div>
										<div className="col-xxl-6 col-xl-6 d-flex">
											<div className="card mb-3 flex-fill">
												
												<div className="card-body pt-0">
													<p>Paytm stands for Pay through mobile and it is India's largest
														mobile
														payments.</p>
												</div>
												<div
													className="card-footer d-flex align-items-center justify-content-between">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="btn btn-sm btn-outline-dark rounded">
														<i className="ti ti-checks me-2"></i>Connected</a>
													<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
														data-bs-target="#connect_payment"><i
															className="ti ti-settings fs-24 fw-normal"></i></a>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default PaymentGateways;
