import React from 'react';
import { Link } from 'react-router-dom';

const EmailReply = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content p-0">
				<div className="d-md-flex">
					
					<div className="mail-detail bg-white border-bottom p-3">
						<div className="active slimscroll h-100">
							
						</div>
					</div>
				</div>
				<div className="footer d-sm-flex align-items-center justify-content-between bg-white p-3">
					<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
					<p>Designed & Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
				</div>
			</div>
		</div>
		
    </>
  );
};

export default EmailReply;
