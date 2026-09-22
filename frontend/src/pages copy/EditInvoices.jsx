import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';


const EditInvoices = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Edit Invoices"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Finance' },
						{ label: 'Edit Invoices', active: true }
					]}
				>
					<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row align-items-center">
					<div className="col-md-10 mx-auto">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-4">
									<a href="/invoices"
										className="back-icon align-items-center fs-14 d-inline-flex fw-medium">
										<span
											className=" d-flex justify-content-center align-items-center rounded-circle me-2">
											<i className="ti ti-arrow-left fs-12"></i>
										</span>
										Back to List
									</a>
									<a href="#" className="text-primary text-decoration-underline" data-bs-toggle="modal"
										data-bs-target="#invoice_preview">
										Preview
									</a>
								</div>

								{/* My details */}
								<div className="bg-light p-3 rounded mb-3">
									<div className="d-flex justify-content-between align-items-center mb-3">
										<h5>From</h5>
										<a href="#" className="text-dark fw-medium"><span className="text-gray me-2"><i
													className="ti ti-edit"></i></span>Edit Details</a>
									</div>
									<div>
										<h4 className="mb-1">Thomas Lawler</h4>
										<p className="mb-1">2077 Chicago Avenue Orosi, CA 93647</p>
										<p className="mb-1">Email : <span className="text-dark">Tarala2445@example.com</span>
										</p>
										<p>Phone : <span className="text-dark">+1 987 654 3210</span></p>
									</div>
								</div>
								{/* /My details */}

								{/* Invoice Details*/}
								<div className="border-bottom mb-3">
									<h4 className="mb-2">Invoice Details</h4>
									<div className="mb-2">
										<label className="form-label">Invoice Title</label>
										<input type="text" className="form-control" value="Design & development of Website" />
									</div>
									<div className="row">
										<div className="col-md-4 col-sm-12">
											<div className="mb-3">
												<label className="form-label">Invoice No</label>
												<input type="text" className="form-control" value="INV-1454" />
											</div>
										</div>
										<div className="col-md-4 col-sm-12">
											<div className="mb-3">
												<label className="form-label">Invoice Date</label>
												<div className="input-icon position-relative w-100 me-2">
													<span className="input-icon-addon">
														<i className="ti ti-calendar"></i>
													</span>
													<CustomDatePicker type="text" className="form-control "
														placeholder="dd/mm/yyyy"  isRange={false} />
												</div>
											</div>
										</div>
										<div className="col-md-4 col-sm-12">
											<div className="mb-3">
												<label className="form-label">Due Date</label>
												<div className="input-icon position-relative w-100 me-2">
													<span className="input-icon-addon">
														<i className="ti ti-calendar"></i>
													</span>
													<CustomDatePicker type="text" className="form-control "
														placeholder="dd/mm/yyyy"  isRange={false} />
												</div>
											</div>
										</div>
									</div>
								</div>
								{/* /Invoice Details*/}

								{/* Payment Details*/}
								<div className="border-bottom mb-3">
									<h4 className="mb-2">Payment Details</h4>

									<div className="row">
										<div className="col-lg-3 col-md-6 col-sm-12">
											<div className="mb-3">
												<div className="d-flex justify-content-between align-items-center">
													<label className="form-label">Customer</label>
													<a href="#" className="text-primary fw-medium d-flex align-items-center"
														data-bs-toggle="modal" data-bs-target="#add_customer">
														<i className="ti ti-plus me-2"></i>Add New
													</a>
												</div>
												<input type="text" className="form-control" value="Anthony Lewis" />
											</div>
										</div>
										<div className="col-lg-3 col-md-6 col-sm-12">
											<div className="mb-3">
												<label className="form-label">Reference Number</label>
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="col-lg-3 col-md-6 col-sm-12">
											<div className="mb-3">
												<label className="form-label">Select Payment Type</label>
												<div className="custom-select-wrapper"><CustomSelect className="select">
													<option>Select</option>
													<option selected>Credit</option>
													<option>Debit</option>
												</CustomSelect></div>
											</div>
										</div>
										<div className="col-lg-3 col-md-6 col-sm-12">
											<div className="mb-3">
												<label className="form-label">Bank Details</label>
												<div className="custom-select-wrapper"><CustomSelect className="select">
													<option>Select</option>
													<option selected>Bank of America</option>
													<option>U.S. Bank</option>
												</CustomSelect></div>
											</div>
										</div>
									</div>
								</div>
								{/* /Payment Details*/}

								{/* Add Items*/}
								<div className="border-bottom mb-3">
									<h4 className="mb-2">Add Items</h4>
									<div className="border rounded p-3 mb-3">
										<div className="add-description-info">
											<div className="row">
												<div className="col-md-6">
													<div className="mb-3">
														<label className="form-label">Description</label>
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="col-md-6">
													<div className="row">
														<div className="col-md-4">
															<div className="mb-3">
																<label className="form-label">Qty</label>
																<input type="text" className="form-control" />
															</div>
														</div>
														<div className="col-md-4">
															<div className="mb-3">
																<label className="form-label">Discount</label>
																<input type="text" className="form-control" />
															</div>
														</div>
														<div className="col-md-4">
															<div className="mb-3">
																<label className="form-label">Rate</label>
																<input type="text" className="form-control" />
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="text-primary add-more-description fw-medium d-flex align-items-center"><i
												className="ti ti-plus me-2"></i>Add New</a>
									</div>
								</div>
								{/* /Add Items*/}

								{/* Additional Details*/}
								<div>
									<h4 className="mb-2">Additional Details</h4>
									<div className="mb-3">
										<label className="form-label"> Description</label>
										<textarea className="form-control" rows="3"></textarea>
									</div>
									<div className="mb-3">
										<label className="form-label">Notes</label>
										<textarea className="form-control" rows="3"></textarea>
									</div>
								</div>
								{/* Additional Details*/}

								<div className="d-flex justify-content-end align-items-center flex-wrap row-gap-3">
									<a href="#" className="btn btn-dark d-flex justify-content-center align-items-center"><i
											className="ti ti-printer me-2"></i>Save as Draft</a>
									<a href="#"
										className="btn btn-primary d-flex justify-content-center align-items-center  ms-2"><i
											className="ti ti-copy me-2"></i>Save & Send</a>
								</div>
							</div>
						</div>
					</div>
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

export default EditInvoices;
