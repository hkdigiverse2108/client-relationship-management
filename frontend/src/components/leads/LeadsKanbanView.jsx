import React from 'react';

const LeadsKanbanView = () => {
  return (
    <div className="d-flex overflow-x-auto align-items-start mb-4">
      {/* Contacted Column */}
      <div className="kanban-list-items bg-white">
        <div className="card mb-0">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-semibold d-flex align-items-center mb-1">
                  <i className="ti ti-circle-filled fs-8 text-warning me-2"></i>Contacted
                </h4>
                <span className="fw-medium text-default">02 Leads - $7,50,000</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="action-icon d-inline-flex">
                  <a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
                  <a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="kanban-drag-wrap pt-4">
          <div>
            <div className="card kanban-card">
              <div className="card-body">
                <div className="d-block">
                  <div className="border-warning border border-2 mb-3"></div>
                  <div className="d-flex align-items-center mb-3">
                    <a href="/leads-details" className="avatar avatar-lg bg-gray flex-shrink-0 me-2">
                      <span className="avatar-title text-dark">SM</span>
                    </a>
                    <h6 className="fw-medium"><a href="/leads-details">Linda White</a></h6>
                  </div>
                </div>
                <div className="mb-3 d-flex flex-column">
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-report-money text-dark me-1"></i>$03,50,000
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-mail text-dark me-1"></i>linda@gmail.com
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-phone text-dark me-1"></i>(193) 7839 748
                  </p>
                  <p className="text-default d-inline-flex align-items-center">
                    <i className="ti ti-map-pin-pin text-dark me-1"></i>Austin, United States
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                  <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-sm avatar-rounded flex-shrink-0 me-2">
                    <img src="/assets/img/company/company-04.svg" alt="image" />
                  </a>
                  <div className="icons-social d-flex align-items-center">
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-phone-call"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-brand-hipchat"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center"><i className="ti ti-color-swatch"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card kanban-card">
              <div className="card-body">
                <div className="d-block">
                  <div className="border-warning border border-2 mb-3"></div>
                  <div className="d-flex align-items-center mb-3">
                    <a href="/leads-details" className="avatar avatar-lg bg-gray flex-shrink-0 me-2">
                      <span className="avatar-title text-dark">CJ</span>
                    </a>
                    <h6 className="fw-medium"><a href="/leads-details">Chris Johnson</a></h6>
                  </div>
                </div>
                <div className="mb-3 d-flex flex-column">
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-report-money text-dark me-1"></i>$3,50,000
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-mail text-dark me-1"></i>chris@gmail.com
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-phone text-dark me-1"></i>(162) 8920 713
                  </p>
                  <p className="text-default d-inline-flex align-items-center">
                    <i className="ti ti-map-pin-pin text-dark me-1"></i>Atlanta, United States
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                  <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-sm avatar-rounded flex-shrink-0 me-2">
                    <img src="/assets/img/company/company-07.svg" alt="image" />
                  </a>
                  <div className="icons-social d-flex align-items-center">
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-phone-call"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-brand-hipchat"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center"><i className="ti ti-color-swatch"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Not Contacted Column */}
      <div className="kanban-list-items bg-white">
        <div className="card mb-0">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-semibold d-flex align-items-center mb-1">
                  <i className="ti ti-circle-filled fs-8 text-purple me-2"></i>Not Contacted
                </h4>
                <span className="fw-medium text-default">02 Leads - $7,60,000</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="action-icon d-inline-flex">
                  <a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
                  <a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="kanban-drag-wrap pt-4">
          <div>
            <div className="card kanban-card">
              <div className="card-body">
                <div className="d-block">
                  <div className="border-purple border border-2 mb-3"></div>
                  <div className="d-flex align-items-center mb-3">
                    <a href="/leads-details" className="avatar avatar-lg bg-gray flex-shrink-0 me-2">
                      <span className="avatar-title text-dark">EJ</span>
                    </a>
                    <h6 className="fw-medium"><a href="/leads-details">Emily Johnson</a></h6>
                  </div>
                </div>
                <div className="mb-3 d-flex flex-column">
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-report-money text-dark me-1"></i>$3,50,000
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-mail text-dark me-1"></i>emily@gmail.com
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-phone text-dark me-1"></i>(179) 7382 829
                  </p>
                  <p className="text-default d-inline-flex align-items-center">
                    <i className="ti ti-map-pin-pin text-dark me-1"></i>Newyork, United States
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                  <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-sm avatar-rounded flex-shrink-0 me-2">
                    <img src="/assets/img/company/company-06.svg" alt="image" />
                  </a>
                  <div className="icons-social d-flex align-items-center">
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-phone-call"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-brand-hipchat"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center"><i className="ti ti-color-swatch"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card kanban-card">
              <div className="card-body">
                <div className="d-block">
                  <div className="border-purple border border-2 mb-3"></div>
                  <div className="d-flex align-items-center mb-3">
                    <a href="/leads-details" className="avatar avatar-lg bg-gray flex-shrink-0 me-2">
                      <span className="avatar-title text-dark">MG</span>
                    </a>
                    <h6 className="fw-medium"><a href="/leads-details">Maria Garcia</a></h6>
                  </div>
                </div>
                <div className="mb-3 d-flex flex-column">
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-report-money text-dark me-1"></i>$4,10,000
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-mail text-dark me-1"></i>maria@gmail.com
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-phone text-dark me-1"></i>(120) 3728 039
                  </p>
                  <p className="text-default d-inline-flex align-items-center">
                    <i className="ti ti-map-pin-pin text-dark me-1"></i>Denver, United States
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                  <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-sm avatar-rounded flex-shrink-0 me-2">
                    <img src="/assets/img/company/company-05.svg" alt="image" />
                  </a>
                  <div className="icons-social d-flex align-items-center">
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-phone-call"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-brand-hipchat"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center"><i className="ti ti-color-swatch"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Closed Column */}
      <div className="kanban-list-items bg-white">
        <div className="card mb-0">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-semibold d-flex align-items-center mb-1">
                  <i className="ti ti-circle-filled fs-8 text-success me-2"></i>Closed
                </h4>
                <span className="fw-medium text-default">45 Leads - $15,44,540</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="action-icon d-inline-flex">
                  <a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
                  <a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="kanban-drag-wrap pt-4">
          <div>
            <div className="card kanban-card">
              <div className="card-body">
                <div className="d-block">
                  <div className="border-success border border-2 mb-3"></div>
                  <div className="d-flex align-items-center mb-3">
                    <a href="/leads-details" className="avatar avatar-lg bg-gray flex-shrink-0 me-2">
                      <span className="avatar-title text-dark">JS</span>
                    </a>
                    <h6 className="fw-medium"><a href="/leads-details">John Smith</a></h6>
                  </div>
                </div>
                <div className="mb-3 d-flex flex-column">
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-report-money text-dark me-1"></i>$3,20,000
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-mail text-dark me-1"></i>john@gmail.com
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-phone text-dark me-1"></i>(123) 4567 890
                  </p>
                  <p className="text-default d-inline-flex align-items-center">
                    <i className="ti ti-map-pin-pin text-dark me-1"></i>Chester, United Kingdom
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                  <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-sm avatar-rounded flex-shrink-0 me-2">
                    <img src="/assets/img/company/company-01.svg" alt="image" />
                  </a>
                  <div className="icons-social d-flex align-items-center">
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-phone-call"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-brand-hipchat"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center"><i className="ti ti-color-swatch"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lost Column */}
      <div className="kanban-list-items bg-white me-0">
        <div className="card mb-0">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-semibold d-flex align-items-center mb-1">
                  <i className="ti ti-circle-filled fs-8 text-danger me-2"></i>Lost
                </h4>
                <span className="fw-medium text-default">15 Leads - $14,89,543</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="action-icon d-inline-flex">
                  <a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
                  <a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="kanban-drag-wrap pt-4">
          <div>
            <div className="card kanban-card">
              <div className="card-body">
                <div className="d-block">
                  <div className="border-danger border border-2 mb-3"></div>
                  <div className="d-flex align-items-center mb-3">
                    <a href="/leads-details" className="avatar avatar-lg bg-gray flex-shrink-0 me-2">
                      <span className="avatar-title text-dark">MB</span>
                    </a>
                    <h6 className="fw-medium"><a href="/leads-details">Michael Brown</a></h6>
                  </div>
                </div>
                <div className="mb-3 d-flex flex-column">
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-report-money text-dark me-1"></i>$4,10,000
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-mail text-dark me-1"></i>micael@gmail.com
                  </p>
                  <p className="text-default d-inline-flex align-items-center mb-2">
                    <i className="ti ti-phone text-dark me-1"></i>(184) 2719 738
                  </p>
                  <p className="text-default d-inline-flex align-items-center">
                    <i className="ti ti-map-pin-pin text-dark me-1"></i>London, United Kingdom
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                  <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-sm avatar-rounded flex-shrink-0 me-2">
                    <img src="/assets/img/company/company-03.svg" alt="image" />
                  </a>
                  <div className="icons-social d-flex align-items-center">
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-phone-call"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center me-2"><i className="ti ti-brand-hipchat"></i></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center justify-content-center"><i className="ti ti-color-swatch"></i></a>
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

export default LeadsKanbanView;
