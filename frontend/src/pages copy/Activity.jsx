import React from 'react';
import { Link } from 'react-router-dom';
import CustomTable from '../components/CustomTable';
import PageHeader from '../components/common/PageHeader';

// ---- Static Data ----
const activityData = [
  { title: 'We scheduled a meeting for next week', type: 'Meeting', typeBadge: 'badge-pink-transparent', typeIcon: 'ti-device-computer-camera', dueDate: '16 Jan 2024', owner: 'Hendry Milner', createdDate: '14 Jan 2024' },
  { title: 'Had conversation with Fred regarding task', type: 'Calls', typeBadge: 'badge-purple-transparent', typeIcon: 'ti-phone', dueDate: '24 Jan 2024', owner: 'Guilory Berggren', createdDate: '21 Jan 2024' },
  { title: 'Analysing latest time estimation for new project', type: 'Tasks', typeBadge: 'badge-info-transparent', typeIcon: 'ti-subtask', dueDate: '23 Feb 2024', owner: 'Jami Carlile', createdDate: '20 Feb 2024' },
  { title: 'Store and manage contact data', type: 'Email', typeBadge: 'badge-warning-transparent', typeIcon: 'ti-mail', dueDate: '18 Mar 2024', owner: 'Theresa Nelson', createdDate: '15 Mar 2024' },
  { title: 'Call John and discuss about project', type: 'Calls', typeBadge: 'badge-purple-transparent', typeIcon: 'ti-phone', dueDate: '14 Apr 2024', owner: 'Smith Cooper', createdDate: '12 Apr 2024' },
  { title: 'Will have a meeting before project start', type: 'Meeting', typeBadge: 'badge-pink-transparent', typeIcon: 'ti-device-computer-camera', dueDate: '22 Apr 2024', owner: 'Martin Lewis', createdDate: '20 Apr 2024' },
  { title: 'Will have a meeting before project start', type: 'Meeting', typeBadge: 'badge-pink-transparent', typeIcon: 'ti-device-computer-camera', dueDate: '22 Apr 2024', owner: 'Martin Lewis', createdDate: '20 Apr 2024' },
  { title: 'Built landing pages', type: 'Email', typeBadge: 'badge-warning-transparent', typeIcon: 'ti-device-computer-camera', dueDate: '08 Jul 2024', owner: 'Newell Egan', createdDate: '06 Jul 2024' },
  { title: 'Discussed budget proposal with Edwin', type: 'Calls', typeBadge: 'badge-purple-transparent', typeIcon: 'ti-phone', dueDate: '05 Sep 2024', owner: 'Janet Carlson', createdDate: '02 Sep 2024' },
  { title: 'Attach final proposal for upcoming project', type: 'Tasks', typeBadge: 'badge-info-transparent', typeIcon: 'ti-subtask', dueDate: '18 Nov 2024', owner: 'Craig Byrne', createdDate: '15 Nov 2024' },
  { title: 'Regarding latest updates in project', type: 'Meeting', typeBadge: 'badge-pink-transparent', typeIcon: 'ti-device-computer-camera', dueDate: '12 Dec 2024', owner: 'Daniel Brown', createdDate: '10 Dec 2024' },
];

const columns = [
  { label: (<div className="form-check form-check-md"><input className="form-check-input" type="checkbox" id="select-all" /></div>) },
  'Title',
  'Activity Type',
  'Due Date',
  'Owner',
  'Created Date',
  '',
];

const Activity = () => {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">

          {/* Breadcrumb */}
				<PageHeader 
					title="Activity"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Activity List', active: true }
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
                <a href="#" data-bs-toggle="modal" data-bs-target="#add_activity"
                  className="btn btn-primary d-flex align-items-center"><i
                    className="ti ti-circle-plus me-2"></i>Add Activity</a>
              </div>
              <div className="ms-2 head-icons">
                <a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
                  data-bs-original-title="Collapse" id="collapse-header">
                  <i className="ti ti-chevrons-up"></i>
                </a>
              </div>
				</PageHeader>
				{/* /Breadcrumb */}

          {/* Activity List */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5>Activity List</h5>
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
                    Activity Type
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li><Link to="#" className="dropdown-item rounded-1">Meeting</Link></li>
                    <li><Link to="#" className="dropdown-item rounded-1">Calls</Link></li>
                    <li><Link to="#" className="dropdown-item rounded-1">Tasks</Link></li>
                    <li><Link to="#" className="dropdown-item rounded-1">Email</Link></li>
                  </ul>
                </div>
                <div className="dropdown">
                  <Link to="#"
                    className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                    data-bs-toggle="dropdown">
                    Sort By : Last 7 Days
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li><Link to="#" className="dropdown-item rounded-1">Recently Added</Link></li>
                    <li><Link to="#" className="dropdown-item rounded-1">Ascending</Link></li>
                    <li><Link to="#" className="dropdown-item rounded-1">Descending</Link></li>
                    <li><Link to="#" className="dropdown-item rounded-1">Last Month</Link></li>
                    <li><Link to="#" className="dropdown-item rounded-1">Last 7 Days</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <CustomTable
                columns={columns}
                data={activityData}
                searchFields={['title', 'type', 'dueDate', 'owner', 'createdDate']}
                renderRow={(row, i) => (
                  <tr key={i}>
                    <td>
                      <div className="form-check form-check-md">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <p className="fs-14 text-dark fw-medium">{row.title}</p>
                    </td>
                    <td>
                      <span className={`badge ${row.typeBadge}`}>
                        <i className={`ti ${row.typeIcon} me-1`}></i>{row.type}
                      </span>
                    </td>
                    <td>{row.dueDate}</td>
                    <td>{row.owner}</td>
                    <td>{row.createdDate}</td>
                    <td>
                      <div className="action-icon d-inline-flex">
                        <a href="#" className="me-2" data-bs-toggle="modal"
                          data-bs-target="#edit_activity"><i className="ti ti-edit"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
                          data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
                      </div>
                    </td>
                  </tr>
                )}
              />
            </div>
          </div>
          {/* /Activity List */}

        </div>

        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
          <p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
        </div>

      </div>
    </>
  );
};

export default Activity;
