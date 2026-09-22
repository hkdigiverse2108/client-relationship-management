import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  
  useEffect(() => {
    // Add the specific background class to body for this page
    document.body.classList.add('bg-linear-gradiant');
    
    // Cleanup when leaving the page
    return () => {
      document.body.classList.remove('bg-linear-gradiant');
    };
  }, []);

  return (
    <div className="main-wrapper">
      <div className="container">
        <div>
          <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-md-8 d-flex justify-content-center align-items-center mx-auto">
              <div>

                <div className="error-images mb-5 text-center">
                  <img src="/assets/img/bg/error-404.svg" alt="image" className="img-fluid" />
                </div>
                <div className="text-center">
                  <h1 className="mb-3">Oops, something went wrong</h1>
                  <p className="fs-16 text-center">Error 404 Page not found. Sorry the page you looking <br /> for doesn't exist or has been moved</p>
                  <div className="d-flex justify-content-center pb-4">
                    <Link to="/dashboard" className="btn btn-primary d-flex align-items-center ">
                      <i className="ti ti-arrow-left me-2"></i>Back to Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
