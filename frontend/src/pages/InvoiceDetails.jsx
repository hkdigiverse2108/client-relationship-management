import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const InvoiceDetails = () => {
  // Pagination state for invoicedetails
  const [currentPage_invoicedetails, setCurrentPage_invoicedetails] = useState(1);
  const [rowsPerPage_invoicedetails, setRowsPerPage_invoicedetails] = useState(10);
  const [searchQuery_invoicedetails, setSearchQuery_invoicedetails] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Invoices"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Applications' },
						{ label: 'Invoices', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" className="btn btn-dark d-flex align-items-center"><i
									className="ti ti-download me-2"></i>Download</a>
						</div>

						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Invoices */}
				<div>
					<div className="row">
						<div className="col-sm-10 mx-auto">
							<a href="/invoices"
								className="back-icon d-flex align-items-center fs-12 fw-medium mb-3 d-inline-flex">
								<span className=" d-flex justify-content-center align-items-center rounded-circle me-2">
									<i className="ti ti-arrow-left"></i>
								</span>
								Back to List
							</a>
							<div className="card">
								<div className="card-body">
									<div className="row justify-content-between align-items-center border-bottom mb-3">
										<div className="col-md-6">
											<div className="mb-2 invoice-logo">
												<img src="/assets/img/logo.svg" width="130" className="img-fluid logo"
													alt="logo" />
												<img src="/assets/img/logo-white.svg" width="130"
													className="img-fluid logo-white" alt="logo" />
											</div>
											<p>3099 Kennedy Court Framingham, MA 01702</p>
										</div>
										<div className="col-md-6">
											<div className=" text-end mb-3">
												<h5 className="text-gray mb-1">Invoice No <span
														className="text-primary">#INV0001</span></h5>
												<p className="mb-1 fw-medium">Created Date : <span className="text-dark">Sep 24,
														2023</span> </p>
												<p className="fw-medium">Due Date : <span className="text-dark">Sep 30,
														2023</span> </p>
											</div>
										</div>
									</div>
									<div className="row border-bottom mb-3">
										<div className="col-md-5">
											<p className="text-dark mb-2 fw-semibold">From</p>
											<div>
												<h4 className="mb-1">Thomas Lawler</h4>
												<p className="mb-1">2077 Chicago Avenue Orosi, CA 93647</p>
												<p className="mb-1">Email : <span
														className="text-dark">Tarala2445@example.com</span></p>
												<p>Phone : <span className="text-dark">+1 987 654 3210</span></p>
											</div>
										</div>
										<div className="col-md-5">
											<p className="text-dark mb-2 fw-semibold">To</p>
											<div>
												<h4 className="mb-1">Sara Inc,.</h4>
												<p className="mb-1">3103 Trainer Avenue Peoria, IL 61602</p>
												<p className="mb-1">Email : <span
														className="text-dark">Sara_inc34@example.com</span></p>
												<p>Phone : <span className="text-dark">+1 987 471 6589</span></p>
											</div>
										</div>
										<div className="col-md-2">
											<div className="mb-3">
												<p className="text-title mb-2 fw-medium">Payment Status </p>
												<span className="badge badge-danger align-items-center mb-3"><i
														className="ti ti-point-filled "></i>Due in 10 Days</span>
												<div>
													<img src="/assets/img/qr.svg" className="img-fluid" alt="QR" />
												</div>
											</div>
										</div>
									</div>
									<div>
										<p className="fw-medium">Invoice For : <span className="text-dark fw-medium">Design &
												development of Website</span></p>
										
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_invoicedetails}
											onChange={(e) => { setRowsPerPage_invoicedetails(Number(e.target.value)); setCurrentPage_invoicedetails(1); }}
										>
											<option value={10}>10</option>
											<option value={20}>20</option>
											<option value={50}>50</option>
										</select>
									</div>
									<div className="input-icon-start position-relative">
										<span className="input-icon-addon">
											<i className="ti ti-search"></i>
										</span>
										<input
											type="text"
											className="form-control form-control-sm"
											placeholder="Search"
											value={searchQuery_invoicedetails}
											onChange={(e) => { setSearchQuery_invoicedetails(e.target.value); setCurrentPage_invoicedetails(1); }}
										/>
									</div>
								</div>
<div className="table-responsive mb-3">
											<table className="table">
												<thead className="thead-light">
													<tr>
														<th>Job Description</th>
														<th className="text-end">Qty</th>
														<th className="text-end">Cost</th>
														<th className="text-end">Discount</th>
														<th className="text-end">Total</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<h6>UX Strategy</h6>
														</td>
														<td className="text-gray-9 fw-medium text-end">1</td>
														<td className="text-gray-9 fw-medium text-end">$500</td>
														<td className="text-gray-9 fw-medium text-end">$100</td>
														<td className="text-gray-9 fw-medium text-end">$500</td>
													</tr>
													<tr>
														<td>
															<h6>Design System</h6>
														</td>
														<td className="text-gray-9 fw-medium text-end">1</td>
														<td className="text-gray-9 fw-medium text-end">$5000</td>
														<td className="text-gray-9 fw-medium text-end">$100</td>
														<td className="text-gray-9 fw-medium text-end">$5000</td>
													</tr>
													<tr>
														<td>
															<h6>Brand Guidellines</h6>
														</td>
														<td className="text-gray-9 fw-medium text-end">1</td>
														<td className="text-gray-9 fw-medium text-end">$5000</td>
														<td className="text-gray-9 fw-medium text-end">$100</td>
														<td className="text-gray-9 fw-medium text-end">$5000</td>
													</tr>
													<tr>
														<td>
															<h6>Social Media Template</h6>
														</td>
														<td className="text-gray-9 fw-medium text-end">1</td>
														<td className="text-gray-9 fw-medium text-end">$5000</td>
														<td className="text-gray-9 fw-medium text-end">$100</td>
														<td className="text-gray-9 fw-medium text-end">$5000</td>
													</tr>
												</tbody>
											</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_invoicedetails - 1) * rowsPerPage_invoicedetails + 1, 11)}-{Math.min(currentPage_invoicedetails * rowsPerPage_invoicedetails, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_invoicedetails === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_invoicedetails(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_invoicedetails === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_invoicedetails(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_invoicedetails === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_invoicedetails(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
										</div>
									</div>
									<div className="row border-bottom mb-3">
										<div className="col-md-7">
											<div className="py-4">
												<div className="mb-3">
													<h6 className="mb-1">Terms and Conditions</h6>
													<p>Please pay within 15 days from the date of invoice, overdue
														interest @ 14% will be charged on delayed payments.</p>
												</div>
												<div className="mb-3">
													<h6 className="mb-1">Notes</h6>
													<p>Please quote invoice number when remitting funds.</p>
												</div>
											</div>
										</div>
										<div className="col-md-5">
											<div
												className="d-flex justify-content-between align-items-center border-bottom mb-2 pe-3">
												<p className="mb-0">Sub Total</p>
												<p className="text-dark fw-medium mb-2">$5500</p>
											</div>
											<div
												className="d-flex justify-content-between align-items-center border-bottom mb-2 pe-3">
												<p className="mb-0">Discount(0%)</p>
												<p className="text-dark fw-medium mb-2">$400</p>
											</div>
											<div className="d-flex justify-content-between align-items-center mb-2 pe-3">
												<p className="mb-0">VAT(5%)</p>
												<p className="text-dark fw-medium mb-2">$54</p>
											</div>
											<div className="d-flex justify-content-between align-items-center mb-2 pe-3">
												<h5>Total Amount</h5>
												<h5>$5775</h5>
											</div>
											<p className="fs-12">
												Amount in Words : Dollar Five thousand Seven Seventy Five
											</p>
										</div>
									</div>
									<div className="row justify-content-end align-items-end text-end border-bottom mb-3">
										<div className="col-md-3">
											<div className="text-end signature-img">
												<img src="/assets/img/sign.svg" className="img-fluid" alt="sign" />
											</div>
											<div className="text-end mb-3">
												<h6 className="fs-14 fw-medium pe-3">Ted M. Davis</h6>
												<p>Assistant Manager</p>
											</div>
										</div>
									</div>
									<div className="text-center">
										<div className="mb-3 invoice-logo d-flex align-items-center justify-content-center">
											<img src="/assets/img/logo.svg" className="img-fluid logo" alt="logo" />
											<img src="/assets/img/logo-white.svg" className="img-fluid logo-white d-none"
												alt="logo" />
										</div>
										<p className="text-dark mb-1">Payment Made Via bank transfer / Cheque in the name of
											Thomas Lawler</p>
										<div className="d-flex justify-content-center align-items-center">
											<p className="fs-12 mb-0 me-3">Bank Name : <span className="text-dark">HDFC
													Bank</span></p>
											<p className="fs-12 mb-0 me-3">Account Number : <span
													className="text-dark">45366287987</span></p>
											<p className="fs-12">IFSC : <span className="text-dark">HDFC0018159</span></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Invoices */}

				<div className="d-flex justify-content-center align-items-center mb-4">
					<a href="#" className="btn btn-primary d-flex justify-content-center align-items-center me-2"><i
							className="ti ti-printer me-2"></i>Print Invoice</a>
					<a href="#" className="btn btn-white d-flex justify-content-center align-items-center border"><i
							className="ti ti-copy me-2"></i>Clone Invoice</a>
				</div>
			</div>

			{/* Footer */}
			<div className="footer d-sm-flex align-items-center justify-content-between bg-white border-top p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed & Developed By <a href="#" className="text-primary">Dreams</a></p>
			</div>
			{/* /Footer */}
		</div>
		
    </>
  );
};

export default InvoiceDetails;
