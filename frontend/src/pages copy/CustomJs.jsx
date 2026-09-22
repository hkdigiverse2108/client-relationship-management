import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const CustomJs = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Other Settings' },
						{ label: 'Custom JS', active: true }
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
						<a className="nav-link" href="/payment-gateways"><i
								className="ti ti-settings-dollar me-2"></i>Financial Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link active" href="/custom-css"><i className="ti ti-settings-2 me-2"></i>Other
							Settings</a>
					</li>
				</ul>
				<div className="row">
					<div className="col-xl-3 theiaStickySidebar">
						<div className="card">
							<div className="card-body">
								<div className="d-flex flex-column list-group settings-list">
									<a href="/custom-css"
										className="d-inline-flex align-items-center rounded py-2 px-3">Custom CSS</a>
									<a href="/custom-js"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Custom JS</a>
									<a href="/cronjob"
										className="d-inline-flex align-items-center rounded py-2 px-3">Cronjob</a>
									<a href="/storage-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Storage</a>
									<a href="/ban-ip-address"
										className="d-inline-flex align-items-center rounded py-2 px-3">Ban IP Address</a>
									<a href="/backup"
										className="d-inline-flex align-items-center rounded py-2 px-3">Backup</a>
									<a href="/clear-cache"
										className="d-inline-flex align-items-center rounded py-2 px-3">Clear Cache</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							
							<div className="card-body">
								<h5 className="mb-3">Write Custom JS</h5>
								<div className="bg-dark text-gray-5">
									<pre className="language-markup mb-0">
<code className="language-markup mb-0">
   {` document.addEventListener("DOMContentLoaded", function () {
      const scrollers = document.querySelectorAll(".horizontal-slide");
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);
        const scrollerInner = scroller.querySelector(".slide-list");
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
    }); 
});`}
</code>
</pre>
								</div>
								<div className="d-flex align-items-center justify-content-end border-top mt-3 pt-3">
									<button type="button" className="btn btn-outline-light border me-3">Cancel</button>
									<button type="submit" className="btn btn-primary">Save</button>
								</div>
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

export default CustomJs;
