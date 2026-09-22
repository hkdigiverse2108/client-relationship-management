import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CompanySparkline } from '../components/charts/CompaniesListCharts';
import PageHeader from '../components/common/PageHeader';
import StatsCard from '../components/common/StatsCard';
import CustomTable from '../components/CustomTable';

const columns = [
  { label: <div className="form-check form-check-md"><input className="form-check-input" type="checkbox" id="select-all" /></div>, key: 'checkbox', sortable: false },
  { label: 'Company Name', key: 'name', sortable: true },
  { label: 'Email', key: 'email', sortable: true },
  { label: 'Account URL', key: 'url', sortable: true },
  { label: 'Plan', key: 'plan', sortable: true },
  { label: 'Created Date', key: 'date', sortable: true },
  { label: 'Status', key: 'status', sortable: true },
  { label: '', key: 'action', sortable: false }
];

const initialCompaniesData = [
  { id: 1, name: "BrightWave Innovations", logo: "/assets/img/company/company-01.svg", email: "michael@example.com", url: "bwi.example.com", plan: "Advanced (Monthly)", date: "12 Sep 2024", status: "Active" },
  { id: 2, name: "Stellar Dynamics", logo: "/assets/img/company/company-02.svg", email: "sophie@example.com", url: "sd.example.com", plan: "Basic (Yearly)", date: "24 Oct 2024", status: "Active" },
  { id: 3, name: "Quantum Nexus", logo: "/assets/img/company/company-03.svg", email: "cameron@example.com", url: "qn.example.com", plan: "Advanced (Monthly)", date: "18 Feb 2024", status: "Active" },
  { id: 4, name: "EcoVision Enterprises", logo: "/assets/img/company/company-04.svg", email: "doris@example.com", url: "eve.example.com", plan: "Advanced (Monthly)", date: "17 Oct 2024", status: "Active" },
  { id: 5, name: "Aurora Technologies", logo: "/assets/img/company/company-05.svg", email: "thomas@example.com", url: "at.example.com", plan: "Enterprise (Monthly)", date: "20 Jul 2024", status: "Active" },
  { id: 6, name: "BlueSky Ventures", logo: "/assets/img/company/company-06.svg", email: "kathleen@example.com", url: "bsv.example.com", plan: "Advanced (Monthly)", date: "10 Apr 2024", status: "Active" },
  { id: 7, name: "TerraFusion Energy", logo: "/assets/img/company/company-07.svg", email: "bruce@example.com", url: "tfe.example.com", plan: "Enterprise (Yearly)", date: "29 Aug 2024", status: "Active" },
  { id: 8, name: "UrbanPulse Design", logo: "/assets/img/company/company-08.svg", email: "estelle@example.com", url: "upd.example.com", plan: "Basic (Monthly)", date: "22 Feb 2024", status: "Inactive" },
  { id: 9, name: "Nimbus Networks", logo: "/assets/img/company/company-09.svg", email: "stephen@example.com", url: "nn.example.com", plan: "Basic (Yearly)", date: "03 Nov 2024", status: "Active" },
  { id: 10, name: "Epicurean Delights", logo: "/assets/img/company/company-10.svg", email: "angela@example.com", url: "ed.example.com", plan: "Advanced (Monthly)", date: "17 Dec 2024", status: "Active" }
];

const Companies = () => {
  const [companiesData, setCompaniesData] = useState(initialCompaniesData);

  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Companies"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Super Admin' },
						{ label: 'Companies List', active: true }
					]}
				>
					<div className="me-2 mb-2">
						<div className="dropdown">
							<a href="#" onClick={(e) => e.preventDefault()}
								className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
								data-bs-toggle="dropdown">
								<i className="ti ti-file-export me-1"></i>Export
							</a>
							<ul className="dropdown-menu  dropdown-menu-end p-3">
								<li>
									<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
											className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
								</li>
								<li>
									<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
											className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
								</li>
							</ul>
						</div>
					</div>
					<div className="mb-2">
						<a href="#" data-bs-toggle="modal" data-bs-target="#add_company"
							className="btn btn-primary d-flex align-items-center"><i
								className="ti ti-circle-plus me-2"></i>Add Company</a>
					</div>
					<div className="ms-2 head-icons">
						<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
							data-bs-original-title="Collapse" id="collapse-header">
							<i className="ti ti-chevrons-up"></i>
						</a>
					</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">
					<StatsCard title="Total Companies" value="950" icon="ti-building" colorClass="bg-primary">
						<CompanySparkline data={[25, 66, 41, 12, 36, 9, 21]} />
					</StatsCard>
					<StatsCard title="Active Companies" value="920" icon="ti-building" colorClass="bg-success">
						<CompanySparkline data={[25, 66, 41, 12, 36, 9, 21]} />
					</StatsCard>
					<StatsCard title="Inactive Companies" value="30" icon="ti-building" colorClass="bg-danger">
						<CompanySparkline data={[25, 66, 41, 12, 36, 9, 21]} />
					</StatsCard>
					<StatsCard title="Company Location" value="180" icon="ti-map-pin-check" colorClass="bg-skyblue">
						<CompanySparkline data={[25, 66, 41, 12, 36, 9, 21]} />
					</StatsCard>
				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Companies List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="me-3">
								<div className="input-icon position-relative">
									<span className="input-icon-addon">
										<i className="ti ti-calendar text-gray-9"></i>
									</span>
									<input type="text" className="form-control date-range bookingrange"
										placeholder="dd/mm/yyyy - dd/mm/yyyy" />
								</div>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Plan
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Advanced</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Basic</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Enterprise</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Status
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Active</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Inactive</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Sort By : Last 7 Days
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Recently Added</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Ascending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Descending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Last Month</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Last 7 Days</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
							<div className="card-body p-0">
								<CustomTable 
									columns={columns}
									data={companiesData}
									renderRow={(company, index) => (
										<tr key={company.id || index}>
											<td>
												<div className="form-check form-check-md">
													<input className="form-check-input" type="checkbox" />
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center file-name-icon">
													<Link to="#" onClick={(e) => e.preventDefault()} className="avatar avatar-md border rounded-circle">
														<img src={company.logo} className="img-fluid" alt="img" />
													</Link>
													<div className="ms-2">
														<h6 className="fw-medium"><Link to="#" onClick={(e) => e.preventDefault()}>{company.name}</Link></h6>
													</div>
												</div>
											</td>
											<td>{company.email}</td>
											<td>{company.url}</td>
											<td>
												<div className="d-flex align-items-center justify-content-between">
													<p className="mb-0 me-2">{company.plan}</p>
													<Link to="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal" className="badge badge-purple badge-xs"
														data-bs-target="#upgrade_info">Upgrade</Link>
												</div>
											</td>
											<td>{company.date}</td>
											<td>
												<span className={`badge ${company.status === 'Active' ? 'badge-success' : 'badge-danger'} d-inline-flex align-items-center badge-xs`}>
													<i className="ti ti-point-filled me-1"></i>{company.status}
												</span>
											</td>
											<td>
												<div className="action-icon d-inline-flex">
													<Link to="#" onClick={(e) => e.preventDefault()} className="me-2" data-bs-toggle="modal"
														data-bs-target="#company_detail"><i className="ti ti-eye"></i></Link>
													<Link to="#" onClick={(e) => e.preventDefault()} className="me-2" data-bs-toggle="modal"
														data-bs-target="#edit_company"><i className="ti ti-edit"></i></Link>
													<Link to="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
														data-bs-target="#delete_modal"><i className="ti ti-trash"></i></Link>
												</div>
											</td>
										</tr>
									)}
								/>
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

export default Companies;
