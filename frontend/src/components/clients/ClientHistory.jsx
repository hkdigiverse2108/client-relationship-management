import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { useAuth } from '../../context/AuthContext';

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + " year" + (interval === 1 ? "" : "s") + " ago";
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + " month" + (interval === 1 ? "" : "s") + " ago";
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + " day" + (interval === 1 ? "" : "s") + " ago";
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
  return Math.floor(seconds) + " seconds ago";
}

function getMongoDate(id) {
  if (!id || typeof id !== 'string' || id.length !== 24) return new Date();
  return new Date(parseInt(id.substring(0, 8), 16) * 1000);
}

function HistoryList({ client }) {
  const [history, setHistory] = useState([]);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      const clientId = client?._id || client?.id;
      if (!clientId) return;
      try {
        // Fetch history and users in parallel
        const [historyRes, usersRes] = await Promise.all([
          axiosClient.get(`/clients/${clientId}/history`),
          axiosClient.get('/users')
        ]);
        
        const historyData = historyRes || [];
        const users = usersRes.data || [];
        
        // Helper to find user name and avatar
        const backendUrl = import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
        const getProfileUrl = (photoPath) => {
          if (!photoPath) return '/assets/img/profiles/avatar-03.jpg';
          if (photoPath.startsWith('http')) return photoPath;
          if (photoPath.startsWith('/assets')) return photoPath;
          return `${backendUrl}${photoPath}`;
        };

        const getUserInfo = (userId, fallbackName) => {
          if (!userId) return { name: fallbackName || 'System', avatar: '/assets/img/profiles/avatar-03.jpg' };
          const u = users.find(u => u._id === userId || u.id === userId);
          if (u) return { name: u.name, avatar: getProfileUrl(u.profile_photo) };
          if (currentUser && (currentUser._id === userId || currentUser.id === userId)) {
            return { name: currentUser.name || currentUser.role || 'Super Admin', avatar: getProfileUrl(currentUser.profile_photo) };
          }
          return { name: fallbackName || 'System', avatar: '/assets/img/profiles/avatar-03.jpg' };
        };

        // Map real client history to UI format
        const formattedHistory = historyData.map((log, index) => {
          let logDate = new Date();
          if (log.timestamp) {
            let dateStr = log.timestamp;
            if (typeof dateStr === 'string' && !dateStr.endsWith('Z') && !dateStr.includes('+')) {
              dateStr += 'Z';
            }
            logDate = new Date(dateStr);
          } else {
            logDate = getMongoDate(log._id || log.id);
          }
          
          const userInfo = getUserInfo(log.user_id, log.user_name);
          
          // Determine icon based on action
          let icon = 'ti ti-activity';
          let iconBg = 'bg-soft-info';
          
          const actionLower = (log.action || '').toLowerCase();
          if (actionLower.includes('deal')) { icon = 'ti ti-target'; iconBg = 'bg-transparent-purple'; }
          else if (actionLower.includes('project')) { icon = 'ti ti-briefcase'; iconBg = 'bg-soft-warning'; }
          else if (actionLower.includes('invoice')) { icon = 'ti ti-file-invoice'; iconBg = 'bg-soft-primary'; }
          else if (actionLower.includes('payment')) { icon = 'ti ti-cash'; iconBg = 'bg-soft-success'; }
          else if (actionLower.includes('client') || actionLower.includes('create')) { icon = 'ti ti-user'; iconBg = 'bg-soft-primary'; }
          else if (actionLower.includes('delete') || actionLower.includes('remove')) { icon = 'ti ti-trash'; iconBg = 'bg-soft-danger'; }

          return {
            id: log._id || index,
            type: actionLower,
            icon: icon,
            iconBg: iconBg,
            title: log.action || 'Activity',
            desc: log.description || '',
            user: userInfo.name,
            avatar: userInfo.avatar,
            time: getTimeAgo(logDate),
            date: logDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          };
        });

        setHistory(formattedHistory);
      } catch (err) {
        console.error("Failed to fetch client history", err);
      }
    };
    
    fetchHistory();
  }, [client]);

  if (history.length === 0) {
    return <div className="text-center py-4 text-muted">No history found for this client.</div>;
  }

  return (
    <div className="p-2 hide-scrollbar" style={{ maxHeight: '385px', overflowY: 'auto' }}>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      <ul className="list-unstyled mb-0">
        {history.map((item, index) => (
          <li key={item.id} className="d-flex align-items-start mb-3" style={{ position: 'relative' }}>
            <div className={`avatar avatar-md rounded-circle flex-shrink-0 me-3 ${item.iconBg} d-flex align-items-center justify-content-center z-1`}>
              <i className={`${item.icon} fs-18`}></i>
            </div>
            <div className="flex-grow-1 pb-3">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <h6 className="fs-14 fw-medium mb-0">{item.title}</h6>
                <small className="text-muted">{item.time}</small>
              </div>
              <p className="text-muted fs-13 mb-1">{item.desc}</p>
              <div className="d-flex align-items-center">
                <img
                  className="avatar avatar-xs rounded-circle me-1"
                  style={{ objectFit: 'cover' }}
                  src={item.avatar}
                  alt="img"
                />
                <small className="text-dark fw-medium">{item.user}</small>
                {item.date && (
                  <>
                    <span className="mx-1 text-muted">•</span>
                    <small className="text-muted">{item.date}</small>
                  </>
                )}
              </div>
            </div>
            {index < history.length - 1 && (
              <div style={{ position: 'absolute', left: '19px', top: '40px', bottom: '-15px', width: '2px', background: '#e9ecef', zIndex: 0 }}></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ClientHistory({ isAccordion, client }) {
  if (isAccordion) {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingClientHistory">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientHistory" aria-expanded="false" aria-controls="collapseClientHistory">
            History
          </button>
        </h2>
        <div id="collapseClientHistory" className="accordion-collapse collapse" aria-labelledby="headingClientHistory" data-bs-parent="#overviewAccordion">
          <div className="accordion-body pb-0">
            <HistoryList client={client} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="accordion accordions-items-seperate">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingHistoryTab">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHistoryTab" aria-expanded="true" aria-controls="collapseHistoryTab">
              History
            </button>
          </h2>
          <div id="collapseHistoryTab" className="accordion-collapse collapse show" aria-labelledby="headingHistoryTab">
            <div className="accordion-body">
              <HistoryList client={client} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
