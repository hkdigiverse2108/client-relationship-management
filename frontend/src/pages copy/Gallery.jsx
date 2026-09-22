import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Gallery = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Gallery"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Pages' },
						{ label: 'Gallery', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Gallery */}
				<div className="card">
					<div className="card-header">
											<h4>CRM</h4>
										</div>
							<div className="card-body">
						<div className="row row-gap-4 justify-content-center">
							<div className="col-lg-4 col-md-6 col-sm-12">
								<a href="assets/img/social/gallery.jpg" data-fancybox="gallery" className="gallery-item">
									<img src="/assets/img/social/gallery.jpg" className="img-fluid rounded w-100" alt="img" />
								</a>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<a href="assets/img/social/gallery-06.jpg" data-fancybox="gallery" className="gallery-item">
									<img src="/assets/img/social/gallery-06.jpg" className="img-fluid rounded w-100"
										alt="img" />
								</a>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<a href="assets/img/social/gallery-07.jpg" data-fancybox="gallery" className="gallery-item">
									<img src="/assets/img/social/gallery-07.jpg" className="img-fluid rounded w-100"
										alt="img" />
								</a>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<a href="assets/img/social/gallery-08.jpg" data-fancybox="gallery" className="gallery-item">
									<img src="/assets/img/social/gallery-08.jpg" className="img-fluid rounded w-100"
										alt="img" />
								</a>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<a href="assets/img/social/gallery-09.jpg" data-fancybox="gallery" className="gallery-item">
									<img src="/assets/img/social/gallery-09.jpg" className="img-fluid rounded w-100"
										alt="img" />
								</a>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<a href="assets/img/social/gallery-05.jpg" data-fancybox="gallery" className="gallery-item">
									<img src="/assets/img/social/gallery-05.jpg" className="img-fluid rounded w-100"
										alt="img" />
								</a>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<a href="assets/img/social/gallery-10.jpg" data-fancybox="gallery" className="gallery-item">
									<img src="/assets/img/social/gallery-10.jpg" className="img-fluid rounded w-100"
										alt="img" />
								</a>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<a href="assets/img/social/gallery-11.jpg" data-fancybox="gallery" className="gallery-item">
									<img src="/assets/img/social/gallery-11.jpg" className="img-fluid rounded w-100"
										alt="img" />
								</a>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<a href="assets/img/social/gallery-12.jpg" data-fancybox="gallery" className="gallery-item">
									<img src="/assets/img/social/gallery-12.jpg" className="img-fluid rounded w-100"
										alt="img" />
								</a>
							</div>
						</div>
					</div>
				</div>
				{/* /Gallery */}

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default Gallery;
