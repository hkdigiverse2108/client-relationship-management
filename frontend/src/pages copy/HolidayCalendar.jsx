import React from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';import PageHeader from '../components/common/PageHeader';


const HolidayCalendar = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">
				{/* Breadcrumb */}
				<PageHeader 
					title="Holiday Calendar"
					breadcrumbs={[
						{ label: '' },
						{ label: 'Attendance' },
						{ label: 'Holiday Calendar', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_event"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add New Holiday</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="card">
					<div className="card-body">
						<FullCalendar
							plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
							initialView="dayGridMonth"
							headerToolbar={{
								left: 'today prev,next',
								center: 'title',
								right: 'dayGridMonth,timeGridWeek,timeGridDay'
							}}
                            events={[]}
						/>
					</div>
				</div>
			</div>
		</div>
		
    </>
  );
};

export default HolidayCalendar;
