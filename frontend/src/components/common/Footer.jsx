import React from 'react';

const Footer = () => {
  return (
    <>
      <style>{`
        /* Purane hardcoded footers ko hide karne ke liye */
        .footer:not(#global-layout-footer) {
          display: none !important;
        }
      `}</style>
      <div id="global-layout-footer" className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
        <p className="mb-0">{new Date().getFullYear()} &copy; CRM.</p>
        <p className="mb-0">Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">HK Digiverse</a></p>
      </div>
    </>
  );
};

export default Footer;
