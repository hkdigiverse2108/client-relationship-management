import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import EmployeeLeaves from './EmployeeLeaves';
import HRLeaves from './HRLeaves';

export default function Leaves() {
  const { user } = useAuth();
  const isHR = ['admin', 'hr', 'superadmin'].includes(user?.role?.toLowerCase());
  
  const [view, setView] = useState('team'); // 'team' or 'personal'

  if (isHR) {
    return (
      <div className="h-100 d-flex flex-column">
        <div className="flex-grow-1 overflow-auto">
          {view === 'team' ? (
            <HRLeaves isHR={isHR} view={view} setView={setView} />
          ) : (
            <EmployeeLeaves isHR={isHR} view={view} setView={setView} />
          )}
        </div>
      </div>
    );
  }

  // Regular Employee View
  return <EmployeeLeaves isHR={false} />;
}
