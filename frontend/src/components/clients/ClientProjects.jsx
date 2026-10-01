import React from 'react';
import ProjectsGridView from '../projects/ProjectsGridView';

export default function ClientProjects({ isAccordion, client, projects = [], users = {}, clients = {}, setProjectToEdit, setIsProjectModalOpen, setProjectToDelete }) {
  
  const content = (
    <div className="hide-scrollbar" style={{ minHeight: '410px', maxHeight: '425px', overflowY: 'auto' }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none !important; }`}</style>
      <ProjectsGridView 
        data={projects} 
        users={users} 
        clients={clients} 
        setProjectToEdit={setProjectToEdit}
        setIsProjectModalOpen={setIsProjectModalOpen}
        setProjectToDelete={setProjectToDelete}
        hideClient={true}
      />
    </div>
  );

  if (isAccordion) {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingClientProjects">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientProjects" aria-expanded="false" aria-controls="collapseClientProjects">
            Projects
          </button>
        </h2>
        <div id="collapseClientProjects" className="accordion-collapse collapse" aria-labelledby="headingClientProjects" data-bs-parent="#overviewAccordion">
          <div className="accordion-body">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="accordion accordions-items-seperate">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingProjectsTab">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseProjectsTab" aria-expanded="true" aria-controls="collapseProjectsTab">
            Projects
          </button>
        </h2>
        <div id="collapseProjectsTab" className="accordion-collapse collapse show" aria-labelledby="headingProjectsTab">
          <div className="accordion-body p-0">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
