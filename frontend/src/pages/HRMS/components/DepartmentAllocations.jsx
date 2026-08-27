import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import Button from '@/components/common/Button/Button';
import { hrmsService } from '@/api/services/hrmsService';
import toast from 'react-hot-toast';

export default function DepartmentAllocations() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await hrmsService.getDepartmentStats();
      setDepartments(res || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load department stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hrms-panel">
      <div className="hrms-panel-header">
        <div>
          <h3 className="hrms-panel-title">Department Allocations & Distribution</h3>
          <p className="hrms-panel-subtitle">Ratio analysis of staff counts across divisions.</p>
        </div>
        <Button variant="outline" size="sm" icon={FiDownload}>
          Export CSV
        </Button>
      </div>

      <div className="hrms-dept-list">
        {loading ? (
          <div className="text-center py-4 text-muted">Loading stats...</div>
        ) : departments.length === 0 ? (
          <div className="text-center py-4 text-muted">No departments found.</div>
        ) : (
          departments.map((dept, index) => (
            <div key={index} className="hrms-dept-item">
              <span className="hrms-dept-name">{dept.name}</span>
              <span className="hrms-dept-stats">{dept.count} Employees ({dept.percentage}%)</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
