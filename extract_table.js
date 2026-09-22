const fs = require('fs');
const path = require('path');

const projectReportPath = path.join(__dirname, 'frontend/src/pages/ProjectReport.jsx');
const projectReportContent = fs.readFileSync(projectReportPath, 'utf8');

const lines = projectReportContent.split('\n');

// Find the start and end of the card table
const startIndex = lines.findIndex(line => line.includes('<div className="card">'));
const endIndex = lines.findIndex((line, index) => index > startIndex && line.includes('Showing {Math.min')) + 22; // approx end of the table card

const tableLines = lines.slice(startIndex, endIndex);

const componentCode = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectReportTable = () => {
  const [currentPage_projectreport, setCurrentPage_projectreport] = useState(1);
  const [rowsPerPage_projectreport, setRowsPerPage_projectreport] = useState(10);
  const [searchQuery_projectreport, setSearchQuery_projectreport] = useState('');

  return (
${tableLines.join('\n')}
  );
};

export default ProjectReportTable;
`;

const newFilePath = path.join(__dirname, 'frontend/src/components/projects/ProjectReportTable.jsx');
fs.writeFileSync(newFilePath, componentCode, 'utf8');

// Now remove it from ProjectReport.jsx and use the component
const newProjectReportLines = [
  ...lines.slice(0, startIndex),
  '        <ProjectReportTable />',
  ...lines.slice(endIndex)
];

let finalProjectReportContent = newProjectReportLines.join('\n');

// Also remove the Footer and state
finalProjectReportContent = finalProjectReportContent.replace(/<Footer \/>/g, '');
finalProjectReportContent = finalProjectReportContent.replace(/const \[currentPage_projectreport.*?;\n/g, '');
finalProjectReportContent = finalProjectReportContent.replace(/const \[rowsPerPage_projectreport.*?;\n/g, '');
finalProjectReportContent = finalProjectReportContent.replace(/const \[searchQuery_projectreport.*?;\n/g, '');
finalProjectReportContent = finalProjectReportContent.replace("import CustomSelect from '../components/common/CustomSelect';", "import CustomSelect from '../components/common/CustomSelect';\nimport ProjectReportTable from '../components/projects/ProjectReportTable';");
// Also remove Footer import
finalProjectReportContent = finalProjectReportContent.replace(/import Footer from '..\/components\/common\/Footer';\n/g, '');

fs.writeFileSync(projectReportPath, finalProjectReportContent, 'utf8');
