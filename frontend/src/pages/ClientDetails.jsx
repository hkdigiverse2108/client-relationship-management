import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';

import ClientProjects from '../components/clients/ClientProjects';
import ClientTasks from '../components/clients/ClientTasks';
import ClientInvoices from '../components/clients/ClientInvoices';
import ClientPayments from '../components/clients/ClientPayments';
import ClientDeals from '../components/clients/ClientDeals';
import ClientHistory from '../components/clients/ClientHistory';



const ClientDetails = () => {
  // Pagination state for clientdetails
  const [currentPage_clientdetails, setCurrentPage_clientdetails] = useState(1);
  const [rowsPerPage_clientdetails, setRowsPerPage_clientdetails] = useState(10);
  const [searchQuery_clientdetails, setSearchQuery_clientdetails] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Client Details"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM & Sales' },
						{ label: 'Client Details', active: true }
					]}
				>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row justify-content-between align-items-center mb-4">
					<div className="col-md-12">
						<div className="d-flex justify-content-between align-items-center">
							<h6 className="fw-medium d-inline-flex align-items-center mb-3 mb-sm-0"><Link to="/clients">
									<i className="ti ti-arrow-left me-2"></i>Clients</Link>
							</h6>
							
						</div>
					</div>

				</div>
				<div className="row">
					<div className="col-xl-4 theiaStickySidebar">
						<div className="card card-bg-1">
							<div className="card-body p-0">
								<span
									className="avatar avatar-xl avatar-rounded border border-2 border-white m-auto d-flex mb-2">
									<img src="/assets/img/users/user-13.jpg" className="w-auto h-auto" alt="Img" />
								</span>
								<div className="text-center px-3 pb-3 border-bottom">
									<div className="mb-3">
										<h5 className="d-flex align-items-center justify-content-center mb-1">Stephan
											Peralt<i className="ti ti-discount-check-filled text-success ms-1"></i></h5>
										<p className="text-dark mb-1">EcoVision Enterprises</p>
										<span className="badge badge-soft-secondary fw-medium">Operational Manager</span>
									</div>
									<div>
										<div className="d-flex align-items-center justify-content-between mb-2">
											<span className="d-inline-flex align-items-center">
												<i className="ti ti-id me-2"></i>
												Client ID
											</span>
											<p className="text-dark">CLT-0024</p>
										</div>
										<div className="d-flex align-items-center justify-content-between">
											<span className="d-inline-flex align-items-center">
												<i className="ti ti-calendar-check me-2"></i>
												Added on
											</span>
											<p className="text-dark">1st Jan 2023</p>
										</div>
										<div className="row gx-2 mt-3">
											
											<div className="col-12">
												<div>
													<a href="/chat" className="btn btn-primary w-100"><i
															className="ti ti-message-heart me-1"></i>Message</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="p-3 border-bottom">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6>Basic information</h6>
										<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm" data-bs-toggle="modal"
											data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-phone me-2"></i>
											Phone
										</span>
										<p className="text-dark">(163) 2459 315</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-mail-check me-2"></i>
											Email
										</span>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="text-info d-inline-flex align-items-center">perralt12@example.com<i
												className="ti ti-copy text-dark ms-2"></i></a>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-map-pin-check me-2"></i>
											Address
										</span>
										<p className="text-dark text-end">1861 Bayonne Ave, <br /> Manchester, NJ, 08759</p>
									</div>
								</div>
								<div className="p-3">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6>Social Links</h6>
										<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm"><i
												className="ti ti-edit"></i></a>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-01.svg" alt="Img" /></a>
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-06.svg" alt="Img" /></a>
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-02.svg" alt="Img" /></a>
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-03.svg" alt="Img" /></a>
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-04.svg" alt="Img" /></a>
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-05.svg" alt="Img" /></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-8">
						<div>
							<div className="bg-white rounded">
								<ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap mb-4" role="tablist">
									<li className="nav-item" role="presentation">
										<a className="nav-link active fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab1" data-bs-toggle="tab" aria-selected="false"
											role="tab">
											<i className="ti ti-star me-1"></i>
											Overview
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab2" data-bs-toggle="tab" aria-selected="false"
											role="tab">
											<i className="ti ti-box me-1"></i>
											Projects
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab3" data-bs-toggle="tab" aria-selected="true"
											role="tab">
											<i className="ti ti-basket-code me-1"></i>
											Tasks
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab4" data-bs-toggle="tab" aria-selected="true"
											role="tab">
											<i className="ti ti-file-invoice me-1"></i>
											Invoices
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab5" data-bs-toggle="tab" aria-selected="false"
											role="tab">
											<i className="ti ti-cash me-1"></i>
											Payments
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab6" data-bs-toggle="tab" aria-selected="false"
											role="tab">
											<i className="ti ti-heart-handshake me-1"></i>
											Deal
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab7" data-bs-toggle="tab" aria-selected="false"
											role="tab">
											<i className="ti ti-history me-1"></i>
											History
										</a>
									</li>
								</ul>
							</div>
							

<div className="tab-content custom-accordion-items client-accordion">
    <div className="tab-pane active show" id="bottom-justified-tab1" role="tabpanel">
        <div className="accordion accordions-items-seperate" id="overviewAccordion">
            <ClientProjects isAccordion={true} />
            <ClientTasks isAccordion={true} />
            <ClientInvoices isAccordion={true} />
            <ClientPayments isAccordion={true} />
            <ClientDeals isAccordion={true} />
            <ClientHistory isAccordion={true} />
        </div>
    </div>
    
    <div className="tab-pane" id="bottom-justified-tab2" role="tabpanel">
        <ClientProjects isAccordion={false} />
    </div>
    <div className="tab-pane" id="bottom-justified-tab3" role="tabpanel">
        <ClientTasks isAccordion={false} />
    </div>
    <div className="tab-pane" id="bottom-justified-tab4" role="tabpanel">
        <ClientInvoices isAccordion={false} />
    </div>
    <div className="tab-pane" id="bottom-justified-tab5" role="tabpanel">
        <ClientPayments isAccordion={false} />
    </div>
    <div className="tab-pane" id="bottom-justified-tab6" role="tabpanel">
        <ClientDeals isAccordion={false} />
    </div>
    <div className="tab-pane" id="bottom-justified-tab7" role="tabpanel">
        <ClientHistory isAccordion={false} />
    </div>
</div>
<div className="text-end mb-4">
    <div className="dropdown">
        <a href="#" onClick={(e) => e.preventDefault()}
            className="d-inline-flex align-items-center avatar avatar-lg avatar-rounded bg-primary"
            data-bs-toggle="dropdown">
            <i className="ti ti-plus fs-24 text-white"></i>
        </a>
        <ul className="dropdown-menu dropdown-menu-end bg-gray-900 dropdown-menu-md dropdown-menu-dark p-3">
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}
                    className="dropdown-item rounded-1 d-flex align-items-center">
                    <span className="avatar avatar-md bg-gray-800 flex-shrink-0 me-2"><i
                            className="ti ti-briefcase"></i></span>
                    <div>
                        <h6 className="fw-medium text-white mb-1">Add Project</h6>
                        <p className="text-white">Create a new project</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}
                    className="dropdown-item rounded-1 d-flex align-items-center">
                    <span className="avatar avatar-md bg-gray-800 flex-shrink-0 me-2"><i
                            className="ti ti-checkbox"></i></span>
                    <div>
                        <h6 className="fw-medium text-white mb-1">Add Task</h6>
                        <p className="text-white">Create a new priority task</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}
                    className="dropdown-item rounded-1 d-flex align-items-center">
                    <span className="avatar avatar-md bg-gray-800 flex-shrink-0 me-2"><i
                            className="ti ti-file-invoice"></i></span>
                    <div>
                        <h6 className="fw-medium text-white mb-1">Add Invoice</h6>
                        <p className="text-white">Create a new billing</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}
                    className="dropdown-item rounded-1 d-flex align-items-center">
                    <span className="avatar avatar-md bg-gray-800 flex-shrink-0 me-2"><i
                            className="ti ti-cash"></i></span>
                    <div>
                        <h6 className="fw-medium text-white mb-1">Add Payment</h6>
                        <p className="text-white">Record a new payment</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}
                    className="dropdown-item rounded-1 d-flex align-items-center">
                    <span className="avatar avatar-md bg-gray-800 flex-shrink-0 me-2"><i
                            className="ti ti-target"></i></span>
                    <div>
                        <h6 className="fw-medium text-white mb-1">Add Deal</h6>
                        <p className="text-white">Create a new deal</p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default ClientDetails;
