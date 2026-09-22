import React from 'react';
import { Link } from 'react-router-dom';
import CustomDataTable from './common/CustomDataTable';
import CustomDatePicker from './common/CustomDatePicker';

const teamRosterData = [
  { id: 1, name: 'Darlee Robertson', role: 'Facility Manager', deals: '1,244', projects: '24', tasks: '1,000', totalItems: '2,268', avatar: '/assets/img/profiles/avatar-19.jpg' },
  { id: 2, name: 'Sharon Roy', role: 'Installer', deals: '422', projects: '35', tasks: '90', totalItems: '547', avatar: '/assets/img/profiles/avatar-20.jpg' },
  { id: 3, name: 'Vaughan Lewis', role: 'Senior Manager', deals: '852', projects: '51', tasks: '251', totalItems: '1,154', avatar: '/assets/img/profiles/avatar-21.jpg' },
  { id: 4, name: 'Jessica Louise', role: 'Test Engineer', deals: '144', projects: '47', tasks: '56', totalItems: '247', avatar: '/assets/img/users/user-33.jpg' },
  { id: 5, name: 'Carol Thomas', role: 'UI /UX Designer', deals: '200', projects: '12', tasks: '250', totalItems: '462', avatar: '/assets/img/users/user-34.jpg' },
  { id: 6, name: 'Dawn Mercha', role: 'Technician', deals: '15', projects: '7', tasks: '10', totalItems: '32', avatar: '/assets/img/users/user-38.jpg' },
];

const TeamRosterTable = () => {
  const columns = [
    {
      name: 'NAME',
      sortable: true,
      selector: row => row.name,
      cell: row => (
        <div className="d-flex align-items-center file-name-icon">
          <Link to="#" className="avatar avatar-md border avatar-rounded">
            <img src={row.avatar} className="img-fluid" alt="img" />
          </Link>
          <div className="ms-2">
            <h6 className="fw-medium fs-14"><Link to="#">{row.name}</Link></h6>
          </div>
        </div>
      )
    },
    {
      name: 'ROLE',
      sortable: true,
      selector: row => row.role,
    },
    {
      name: 'DEALS',
      sortable: true,
      selector: row => row.deals,
    },
    {
      name: 'PROJECTS',
      sortable: true,
      selector: row => row.projects,
    },
    {
      name: 'TASKS',
      sortable: true,
      selector: row => row.tasks,
    },
    {
      name: 'TOTAL ITEMS',
      sortable: true,
      selector: row => row.totalItems,
    }
  ];

  return (
    <div className="card flex-fill w-100">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <h5>Team Roster</h5>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
          <div className="me-3">
            <CustomDatePicker isRange={true} placeholderText="" />
          </div>
          <div className="dropdown me-3">
            <Link to="#"
              className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown">
              Role
            </Link>
            <ul className="dropdown-menu dropdown-menu-end p-3">
              <li>
                <Link to="#" className="dropdown-item rounded-1">Manager</Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item rounded-1">Designer</Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item rounded-1">Developer</Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item rounded-1">Technician</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body p-0 d-flex flex-column">
        <CustomDataTable columns={columns} data={teamRosterData} />
      </div>
    </div>
  );
};

export default TeamRosterTable;
