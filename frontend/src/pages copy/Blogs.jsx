import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Blogs = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Blogs"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Blogs' },
						{ label: 'Blog', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_blog"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Blog</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
							<h5>Blogs </h5>
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
								<div className="dropdown">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Sort By : Last 7 Days
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Recently
												Added</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Ascending</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Descending</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row justify-content-center">
					<div className="col-xxl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="img-sec w-100 position-relative mb-3">
									<a href="/blog-categories"><img src="/assets/img/blogs/blog-01.jpg"
											className="img-fluid rounded w-100" alt="img" /></a>
									<div className="">
										<a href="/blog-categories"
											className="trend-tag badge bg-info-transparent fs-10 fw-medium">Evlovution</a>
										<span className="badge badge-success dot-icon"><i className="ti ti-point-filled"></i>
											Active</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3">
									<div className="d-flex align-items-center">
										<span className="me-2 d-flex align-items-center"><i className="ti ti-calendar me-1"></i>
											05 Oct 2024</span>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border-start link-default fs-14 fw-normal ps-2 me-2 text-truncate"><img
												src="/assets/img/users/user-02.jpg"
												className="avatar avatar-xs rounded-circle me-2 flex-shrink-0"
												alt="Img" />Gertrude Bowie</a>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" className="link-default me-2" data-bs-toggle="modal"
											data-bs-target="#edit_blog"><i className="ti ti-edit"></i></a>
										<a href="#" className="link-default" data-bs-toggle="modal"
											data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
									</div>
								</div>
								<div className="border-bottom mb-3">
									<h5 className="mb-3">
										<a href="/blog-categories" className="fs-16 fw-medium text-truncate">The
											Evolution of HRMS: Manual to Digital</a>
									</h5>
								</div>
								<div className="d-flex align-items-center justify-content-between text-center">
									<div className="me-3">
										<h6 className="fs-14 fw-medium">3000</h6>
										<span className="fs-12 fw-normal">Likes</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">454</h6>
										<span className="fs-12 fw-normal">Comments</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">102</h6>
										<span className="fs-12 fw-normal">Share</span>
									</div>
									<div className="border-start text-gray ps-3">
										<h6 className="fs-14 fw-medium">350</h6>
										<span className="fs-12 fw-normal">Reviews</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="img-sec w-100 position-relative mb-3">
									<a href="/blog-categories"><img src="/assets/img/blogs/blog-02.jpg"
											className="img-fluid rounded w-100" alt="img" /></a>
									<div className="">
										<a href="/blog-categories"
											className="trend-tag badge bg-info-transparent fs-10 fw-medium">Guide</a>
										<span className="badge badge-success dot-icon"><i className="ti ti-point-filled"></i>
											Active</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3">
									<div className="d-flex align-items-center">
										<span className="me-2 d-flex align-items-center"><i className="ti ti-calendar me-1"></i>
											05 Oct 2024</span>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border-start link-default fs-14 fw-normal ps-2 me-2 text-truncate"><img
												src="/assets/img/users/user-03.jpg"
												className="avatar avatar-xs rounded-circle me-2 flex-shrink-0"
												alt="Img" />Edward Marcus</a>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" className="link-default me-2" data-bs-toggle="modal"
											data-bs-target="#edit_blog"><i className="ti ti-edit"></i></a>
										<a href="#" className="link-default" data-bs-toggle="modal"
											data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
									</div>
								</div>
								<div className="border-bottom mb-3">
									<h5 className="mb-3">
										<a href="/blog-categories" className="fs-16 fw-medium text-truncate">HRMS
											Implementation: Step-by-Step Guide</a>
									</h5>
								</div>
								<div className="d-flex align-items-center justify-content-between text-center">
									<div className="me-3">
										<h6 className="fs-14 fw-medium">2458</h6>
										<span className="fs-12 fw-normal">Likes</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">524</h6>
										<span className="fs-12 fw-normal">Comments</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">248</h6>
										<span className="fs-12 fw-normal">Share</span>
									</div>
									<div className="border-start text-gray ps-3">
										<h6 className="fs-14 fw-medium">450</h6>
										<span className="fs-12 fw-normal">Reviews</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="img-sec w-100 position-relative mb-3">
									<a href="/blog-categories"><img src="/assets/img/blogs/blog-03.jpg"
											className="img-fluid rounded w-100" alt="img" /></a>
									<div className="">
										<a href="/blog-categories"
											className="trend-tag badge bg-info-transparent fs-10 fw-medium">Security</a>
										<span className="badge badge-success dot-icon"><i className="ti ti-point-filled"></i>
											Active</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3">
									<div className="d-flex align-items-center">
										<span className="me-2 d-flex align-items-center"><i className="ti ti-calendar me-1"></i>
											05 Oct 2024</span>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border-start link-default fs-14 fw-normal ps-2 me-2 text-truncate"><img
												src="/assets/img/users/user-05.jpg"
												className="avatar avatar-xs rounded-circle me-2 flex-shrink-0"
												alt="Img" />Mark Phillips</a>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" className="link-default me-2" data-bs-toggle="modal"
											data-bs-target="#edit_blog"><i className="ti ti-edit"></i></a>
										<a href="#" className="link-default" data-bs-toggle="modal"
											data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
									</div>
								</div>
								<div className="border-bottom mb-3">
									<h5 className="mb-3">
										<a href="/blog-categories" className="fs-16 fw-medium text-truncate"> Data
											Security in HRMS: What Matters</a>
									</h5>
								</div>
								<div className="d-flex align-items-center justify-content-between text-center">
									<div className="me-3">
										<h6 className="fs-14 fw-medium">3000</h6>
										<span className="fs-12 fw-normal">Likes</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">454</h6>
										<span className="fs-12 fw-normal">Comments</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">102</h6>
										<span className="fs-12 fw-normal">Share</span>
									</div>
									<div className="border-start text-gray ps-3">
										<h6 className="fs-14 fw-medium">350</h6>
										<span className="fs-12 fw-normal">Reviews</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="img-sec w-100 position-relative mb-3">
									<a href="/blog-categories"><img src="/assets/img/blogs/blog-04.jpg"
											className="img-fluid rounded w-100" alt="img" /></a>
									<div className="">
										<a href="/blog-categories"
											className="trend-tag badge bg-info-transparent fs-10 fw-medium">Recruitment</a>
										<span className="badge badge-success dot-icon"><i className="ti ti-point-filled"></i>
											Active</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3">
									<div className="d-flex align-items-center">
										<span className="me-2 d-flex align-items-center"><i className="ti ti-calendar me-1"></i>
											05 Oct 2024</span>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border-start link-default fs-14 fw-normal ps-2 me-2 text-truncate"><img
												src="/assets/img/users/user-04.jpg"
												className="avatar avatar-xs rounded-circle me-2 flex-shrink-0"
												alt="Img" />Nidia Hale</a>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" className="link-default me-2" data-bs-toggle="modal"
											data-bs-target="#edit_blog"><i className="ti ti-edit"></i></a>
										<a href="#" className="link-default" data-bs-toggle="modal"
											data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
									</div>
								</div>
								<div className="border-bottom mb-3">
									<h5 className="mb-3">
										<a href="/blog-categories" className="fs-16 fw-medium text-truncate"> Improving
											Recruitment with HRMS</a>
									</h5>
								</div>
								<div className="d-flex align-items-center justify-content-between text-center">
									<div className="me-3">
										<h6 className="fs-14 fw-medium">3200</h6>
										<span className="fs-12 fw-normal">Likes</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">424</h6>
										<span className="fs-12 fw-normal">Comments</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">402</h6>
										<span className="fs-12 fw-normal">Share</span>
									</div>
									<div className="border-start text-gray ps-3">
										<h6 className="fs-14 fw-medium">250</h6>
										<span className="fs-12 fw-normal">Reviews</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="img-sec w-100 position-relative mb-3">
									<a href="/blog-categories"><img src="/assets/img/blogs/blog-05.jpg"
											className="img-fluid rounded w-100" alt="img" /></a>
									<div className="">
										<a href="/blog-categories"
											className="trend-tag badge bg-info-transparent fs-10 fw-medium">Implementation</a>
										<span className="badge badge-success dot-icon"><i className="ti ti-point-filled"></i>
											Active</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3">
									<div className="d-flex align-items-center">
										<span className="me-2 d-flex align-items-center"><i className="ti ti-calendar me-1"></i>
											05 Oct 2024</span>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border-start link-default fs-14 fw-normal ps-2 me-2 text-truncate"><img
												src="/assets/img/users/user-06.jpg"
												className="avatar avatar-xs rounded-circle me-2 flex-shrink-0"
												alt="Img" />Rebecca Dale</a>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" className="link-default me-2" data-bs-toggle="modal"
											data-bs-target="#edit_blog"><i className="ti ti-edit"></i></a>
										<a href="#" className="link-default" data-bs-toggle="modal"
											data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
									</div>
								</div>
								<div className="border-bottom mb-3">
									<h5 className="mb-3">
										<a href="/blog-categories" className="fs-16 fw-medium text-truncate"> Impact of
											HRMS on Company Culture</a>
									</h5>
								</div>
								<div className="d-flex align-items-center justify-content-between text-center">
									<div className="me-3">
										<h6 className="fs-14 fw-medium">2200</h6>
										<span className="fs-12 fw-normal">Likes</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">224</h6>
										<span className="fs-12 fw-normal">Comments</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">122</h6>
										<span className="fs-12 fw-normal">Share</span>
									</div>
									<div className="border-start text-gray ps-3">
										<h6 className="fs-14 fw-medium">450</h6>
										<span className="fs-12 fw-normal">Reviews</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="img-sec w-100 position-relative mb-3">
									<a href="/blog-categories"><img src="/assets/img/blogs/blog-06.jpg"
											className="img-fluid rounded w-100" alt="img" /></a>
									<div className="">
										<a href="/blog-categories"
											className="trend-tag badge bg-info-transparent fs-10 fw-medium">Benefits</a>
										<span className="badge badge-success dot-icon"><i className="ti ti-point-filled"></i>
											Active</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3">
									<div className="d-flex align-items-center">
										<span className="me-2 d-flex align-items-center"><i className="ti ti-calendar me-1"></i>
											05 Oct 2024</span>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border-start link-default fs-14 fw-normal ps-2 me-2 text-truncate"><img
												src="/assets/img/users/user-08.jpg"
												className="avatar avatar-xs rounded-circle me-2 flex-shrink-0"
												alt="Img" />Jimmy Johnson</a>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" className="link-default me-2" data-bs-toggle="modal"
											data-bs-target="#edit_blog"><i className="ti ti-edit"></i></a>
										<a href="#" className="link-default" data-bs-toggle="modal"
											data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
									</div>
								</div>
								<div className="border-bottom mb-3">
									<h5 className="mb-3">
										<a href="/blog-categories" className="fs-16 fw-medium text-truncate">Key
											Benefits of Implementing HRMS</a>
									</h5>
								</div>
								<div className="d-flex align-items-center justify-content-between text-center">
									<div className="me-3">
										<h6 className="fs-14 fw-medium">2800</h6>
										<span className="fs-12 fw-normal">Likes</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">284</h6>
										<span className="fs-12 fw-normal">Comments</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">182</h6>
										<span className="fs-12 fw-normal">Share</span>
									</div>
									<div className="border-start text-gray ps-3">
										<h6 className="fs-14 fw-medium">680</h6>
										<span className="fs-12 fw-normal">Reviews</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="img-sec w-100 position-relative mb-3">
									<a href="/blog-categories"><img src="/assets/img/blogs/blog-07.jpg"
											className="img-fluid rounded w-100" alt="img" /></a>
									<div className="">
										<a href="/blog-categories"
											className="trend-tag badge bg-info-transparent fs-10 fw-medium">Management</a>
										<span className="badge badge-success dot-icon"><i className="ti ti-point-filled"></i>
											Active</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3">
									<div className="d-flex align-items-center">
										<span className="me-2 d-flex align-items-center"><i className="ti ti-calendar me-1"></i>
											05 Oct 2024</span>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border-start link-default fs-14 fw-normal ps-2 me-2 text-truncate"><img
												src="/assets/img/users/user-07.jpg"
												className="avatar avatar-xs rounded-circle me-2 flex-shrink-0"
												alt="Img" />Stanley Pierre</a>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" className="link-default me-2" data-bs-toggle="modal"
											data-bs-target="#edit_blog"><i className="ti ti-edit"></i></a>
										<a href="#" className="link-default" data-bs-toggle="modal"
											data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
									</div>
								</div>
								<div className="border-bottom mb-3">
									<h5 className="mb-3">
										<a href="/blog-categories" className="fs-16 fw-medium text-truncate">Why Your
											Company Needs a HRMS</a>
									</h5>
								</div>
								<div className="d-flex align-items-center justify-content-between text-center">
									<div className="me-3">
										<h6 className="fs-14 fw-medium">4800</h6>
										<span className="fs-12 fw-normal">Likes</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">484</h6>
										<span className="fs-12 fw-normal">Comments</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">490</h6>
										<span className="fs-12 fw-normal">Share</span>
									</div>
									<div className="border-start text-gray ps-3">
										<h6 className="fs-14 fw-medium">850</h6>
										<span className="fs-12 fw-normal">Reviews</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="img-sec w-100 position-relative mb-3">
									<a href="/blog-categories"><img src="/assets/img/blogs/blog-08.jpg"
											className="img-fluid rounded w-100" alt="img" /></a>
									<div className="">
										<a href="/blog-categories"
											className="trend-tag badge bg-info-transparent fs-10 fw-medium">Management</a>
										<span className="badge badge-success dot-icon"><i className="ti ti-point-filled"></i>
											Active</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3">
									<div className="d-flex align-items-center">
										<span className="me-2 d-flex align-items-center"><i className="ti ti-calendar me-1"></i>
											05 Oct 2024</span>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border-start link-default fs-14 fw-normal ps-2 me-2 text-truncate"><img
												src="/assets/img/users/user-10.jpg"
												className="avatar avatar-xs rounded-circle me-2 flex-shrink-0"
												alt="Img" />Alice Garcia</a>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" className="link-default me-2" data-bs-toggle="modal"
											data-bs-target="#edit_blog"><i className="ti ti-edit"></i></a>
										<a href="#" className="link-default" data-bs-toggle="modal"
											data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
									</div>
								</div>
								<div className="border-bottom mb-3">
									<h5 className="mb-3">
										<a href="/blog-categories" className="fs-16 fw-medium text-truncate">Scaling
											Your HR Operations with HRMS</a>
									</h5>
								</div>
								<div className="d-flex align-items-center justify-content-between text-center">
									<div className="me-3">
										<h6 className="fs-14 fw-medium">3000</h6>
										<span className="fs-12 fw-normal">Likes</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">454</h6>
										<span className="fs-12 fw-normal">Comments</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">102</h6>
										<span className="fs-12 fw-normal">Share</span>
									</div>
									<div className="border-start text-gray ps-3">
										<h6 className="fs-14 fw-medium">350</h6>
										<span className="fs-12 fw-normal">Reviews</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="img-sec w-100 position-relative mb-3">
									<a href="/blog-categories"><img src="/assets/img/blogs/blog-09.jpg"
											className="img-fluid rounded w-100" alt="img" /></a>
									<div className="">
										<a href="/blog-categories"
											className="trend-tag badge bg-info-transparent fs-10 fw-medium">Management</a>
										<span className="badge badge-success dot-icon"><i className="ti ti-point-filled"></i>
											Active</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3">
									<div className="d-flex align-items-center">
										<span className="me-2 d-flex align-items-center"><i className="ti ti-calendar me-1"></i>
											05 Oct 2024</span>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border-start link-default fs-14 fw-normal ps-2 me-2 text-truncate"><img
												src="/assets/img/users/user-09.jpg"
												className="avatar avatar-xs rounded-circle me-2 flex-shrink-0"
												alt="Img" />James Currier</a>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" className="link-default me-2" data-bs-toggle="modal"
											data-bs-target="#edit_blog"><i className="ti ti-edit"></i></a>
										<a href="#" className="link-default" data-bs-toggle="modal"
											data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
									</div>
								</div>
								<div className="border-bottom mb-3">
									<h5 className="mb-3">
										<a href="/blog-categories" className="fs-16 fw-medium text-truncate">How HRMS
											Drives Organizational Success</a>
									</h5>
								</div>
								<div className="d-flex align-items-center justify-content-between text-center">
									<div className="me-3">
										<h6 className="fs-14 fw-medium">4000</h6>
										<span className="fs-12 fw-normal">Likes</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">554</h6>
										<span className="fs-12 fw-normal">Comments</span>
									</div>
									<div className="border-start text-gray ps-3 me-3">
										<h6 className="fs-14 fw-medium">202</h6>
										<span className="fs-12 fw-normal">Share</span>
									</div>
									<div className="border-start text-gray ps-3">
										<h6 className="fs-14 fw-medium">450</h6>
										<span className="fs-12 fw-normal">Reviews</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="text-center mb-4">
					<a href="#" className="btn btn-white border"><i className="ti ti-loader-3 text-primary me-2"></i>Load
						More</a>
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

export default Blogs;
