import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsGridView = ({ data }) => {
  return (
    <div className="row p-3">
      {data.map((row) => (
        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4" key={row.id}>
          <div className="card h-100 shadow-sm border">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-0"><Link to="/project-details">{row.name}</Link></h6>
                <div className="dropdown">
                  <Link to="#" className="d-inline-flex align-items-center text-muted" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="ti ti-dots-vertical"></i>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1"><i className="ti ti-edit me-2"></i>Edit</Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1"><i className="ti ti-trash me-1"></i>Delete</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-3 pb-3 border-bottom">
                <p className="text-truncate text-muted fs-13 line-clamb-3 mb-0">
                  {row.description || `A highly efficient ${row.category} project designed to optimize internal processes and improve overall system productivity. Focus on robust delivery and quality.`}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center file-name-icon">
                  <Link to="#" className="avatar avatar-sm avatar-rounded flex-shrink-0">
                    <img src={row.leader.avatar} className="img-fluid" alt="img" />
                  </Link>
                  <div className="ms-2">
                    <h6 className="fw-normal fs-12 mb-0"><Link to="#">{row.leader.name}</Link></h6>
                    <span className="fs-12 fw-normal text-muted">Project Leader</span>
                  </div>
                </div>
                <div className="d-flex flex-column text-end">
                  <span className="fs-12 fw-normal text-muted">Deadline</span>
                  <p className="mb-0 fs-12 fw-medium">{row.deadline}</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className={`avatar avatar-sm avatar-rounded bg-${row.statusColor}-transparent flex-shrink-0 me-2`}>
                    <i className={`ti ti-point-filled text-${row.statusColor} fs-16`}></i>
                  </span>
                  <p className="mb-0 fs-13">
                    <small className="text-muted">Status: </small>
                    <span className="text-dark fw-medium">{row.status}</span>
                  </p>
                </div>
                <div className="avatar-list-stacked avatar-group-sm">
                  {row.team.map((avatar, idx) => (
                    <span key={idx} className="avatar avatar-rounded">
                      <img className="border border-white" src={avatar} alt="img" />
                    </span>
                  ))}
                  {row.teamExtra && (
                    <Link to="#" className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium">
                      {row.teamExtra}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <div className="col-12 text-center text-muted py-5">
          <p>No projects found matching the criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsGridView;
