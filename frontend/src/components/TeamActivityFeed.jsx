import React from 'react';

const timeAgo = (dateStr) => {
  // If the backend timestamp doesn't include 'Z' (timezone), Javascript parses it as local time. 
  // We append 'Z' to treat it strictly as UTC so the browser converts it to the user's local time (e.g. IST) correctly.
  const date = new Date(dateStr.endsWith('Z') ? dateStr : dateStr + 'Z');
  const now = new Date();
  
  // Calculate difference in seconds
  let diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Guard against future times (which can happen if server clock is slightly ahead)
  if (diffInSeconds < 0) {
    diffInSeconds = 0;
  }
  
  if (diffInSeconds < 60) return `Just now`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

const getIconAndColor = (module, action) => {
  const mod = (module || '').toLowerCase();
  const act = (action || '').toLowerCase();
  
  if (mod.includes('deal')) return { icon: 'ti-briefcase', color: 'primary' };
  if (mod.includes('project')) return { icon: 'ti-clipboard-list', color: 'secondary' };
  if (mod.includes('task')) return { icon: 'ti-checklist', color: 'success' };
  if (act.includes('delete') || act.includes('remove')) return { icon: 'ti-trash', color: 'danger' };
  if (mod.includes('user') || mod.includes('employee') || mod.includes('auth')) return { icon: 'ti-user', color: 'warning' };
  
  return { icon: 'ti-activity', color: 'info' };
};

const TeamActivityFeed = ({ data = [] }) => {
  return (
    <>
      <style>{`
        .custom-scroll-hidden::-webkit-scrollbar {
          display: none;
        }
        .custom-scroll-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="card flex-fill w-100 d-flex flex-column">
        <div className="card-body d-flex flex-column h-100">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2 flex-shrink-0">
            <h3 className="mb-0 card-title">Activity Feed</h3>
          </div>

          <div className="flex-grow-1 w-100" style={{ position: 'relative', minHeight: 0 }}>
            <div className="custom-scroll-hidden" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'auto' }}>
              {data.length > 0 ? (
              data.map((activity, index) => {
                const { icon, color } = getIconAndColor(activity.module, activity.action);
                
                return (
                  <div key={activity.id || index} className="d-flex align-items-center justify-content-between mb-3 p-2 br-5">
                    <div className="d-flex align-items-center">
                      <span
                        className={`avatar rounded-circle bg-transparent-${color} text-${color} mb-2 flex-shrink-0`}>
                        <i className={`ti ${icon} fs-16`}></i>
                      </span>
                      <div className="ms-3">
                        <h4 className="fs-14 fw-medium text-truncate mb-1">{activity.message}</h4>
                        <p className="fs-13 mb-1 text-muted">{activity.action} in {activity.module}</p>
                        <p className="fs-13"><i className="ti ti-clock-record"></i> {timeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center p-4 text-muted">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default TeamActivityFeed;
