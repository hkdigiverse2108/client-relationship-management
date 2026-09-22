import React from 'react';
import { Link } from 'react-router-dom';
import CustomDataTable from './../common/CustomDataTable';
import CustomDatePicker from './../common/CustomDatePicker';

const ProjectReportTable = () => {

  const data = [
    { name: 'Office Management App', status: 'Active', stage: 'In Progress', priority: 'Low', budget: '$50,000', value: '$25,000', deadline: '12 Sep 2024' },
    { name: 'Clinic Management', status: 'Active', stage: 'Planning', priority: 'Medium', budget: '$35,000', value: '$18,500', deadline: '24 Oct 2024' },
    { name: 'Educational Platform', status: 'Active', stage: 'In Review', priority: 'High', budget: '$120,000', value: '$110,000', deadline: '18 Feb 2024' },
    { name: 'Chat & Call Mobile App', status: 'Active', stage: 'In Progress', priority: 'Low', budget: '$15,000', value: '$8,000', deadline: '17 Oct 2024' },
    { name: 'Travel Planning Website', status: 'Active', stage: 'Completed', priority: 'High', budget: '$45,000', value: '$45,000', deadline: '20 Jul 2024' },
    { name: 'Service Booking Software', status: 'Active', stage: 'In Progress', priority: 'Low', budget: '$25,000', value: '$12,000', deadline: '10 Apr 2024' },
    { name: 'Hotel Booking App', status: 'Active', stage: 'Planning', priority: 'Medium', budget: '$60,000', value: '$20,000', deadline: '29 Aug 2024' },
    { name: 'Car & Bike Rental Software', status: 'Inactive', stage: 'On Hold', priority: 'Low', budget: '$18,000', value: '$0', deadline: '22 Feb 2024' },
    { name: 'Food Order App', status: 'Active', stage: 'In Review', priority: 'Medium', budget: '$40,000', value: '$38,000', deadline: '03 Nov 2024' },
    { name: 'POS Admin Software', status: 'Active', stage: 'Completed', priority: 'Low', budget: '$30,000', value: '$30,000', deadline: '17 Dec 2024' }
  ];

  const columns = [
    {
      name: 'Project',
      selectorKey: 'name',
      sortable: true,
      cell: (row) => (
        <div className="d-flex align-items-center file-name-icon py-2">
          <h6 className="fw-medium mb-0"><Link to="#">{row.name}</Link></h6>
        </div>
      )
    },
    {
      name: 'Status',
      selectorKey: 'status',
      sortable: true,
      cell: (row) => {
        const badgeClass = row.status === 'Active' ? 'badge-success' : 'badge-danger';
        return (
          <span className={`badge ${badgeClass} d-inline-flex align-items-center badge-xs`}>
            <i className="ti ti-point-filled me-1"></i>{row.status}
          </span>
        );
      }
    },
    {
      name: 'Stage',
      selectorKey: 'stage',
      sortable: true,
      cell: (row) => row.stage
    },
    {
      name: 'Priority',
      selectorKey: 'priority',
      sortable: true,
      cell: (row) => {
        let badgeClass = 'badge-success-transparent';
        if (row.priority === 'Medium') badgeClass = 'badge-warning-transparent';
        if (row.priority === 'High') badgeClass = 'badge-danger-transparent';
        
        return (
          <span className={`badge ${badgeClass}`}>
            <i className="ti ti-point-filled me-1"></i>{row.priority}
          </span>
        );
      }
    },
    {
      name: 'Budget',
      selectorKey: 'budget',
      sortable: true,
      cell: (row) => row.budget
    },
    {
      name: 'Value',
      selectorKey: 'value',
      sortable: true,
      cell: (row) => row.value
    },
    {
      name: 'Deadline',
      selectorKey: 'deadline',
      sortable: true,
      cell: (row) => row.deadline
    }
  ];

  return (
    <div className="card">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <h5>Project Performance Summary</h5>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
          <div className="me-3">
            <CustomDatePicker isRange={true} placeholderText="" />
          </div>
          <div className="dropdown me-3">
            <Link to="#"
              className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown">
              Select Priority
            </Link>
            <ul className="dropdown-menu dropdown-menu-end p-3">
              <li><Link to="#" className="dropdown-item rounded-1">Low</Link></li>
              <li><Link to="#" className="dropdown-item rounded-1">Medium</Link></li>
              <li><Link to="#" className="dropdown-item rounded-1">High</Link></li>
            </ul>
          </div>
          <div className="dropdown me-3">
            <Link to="#"
              className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown">
              Select Status
            </Link>
            <ul className="dropdown-menu dropdown-menu-end p-3">
              <li><Link to="#" className="dropdown-item rounded-1">Active</Link></li>
              <li><Link to="#" className="dropdown-item rounded-1">Inactive</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <CustomDataTable columns={columns} data={data} defaultRowsPerPage={10} />
      </div>
    </div>
  );
};

export default ProjectReportTable;
