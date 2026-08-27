import React, { useState, useEffect } from 'react';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import Input from '@/components/common/Input/Input';
import { confirmDialog } from '@/components/common/ConfirmDialog/confirmDialog';
import { FiPlus, FiEdit2, FiTrash2, FiFileText } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-hot-toast';
import { hrmsService } from '@/api/services/hrmsService';

export default function HRUpdatesWidget() {
  const [updates, setUpdates] = useState([]);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
  
  // Form state
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const data = await hrmsService.getNotices();
      setUpdates(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load notices");
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setIsModalOpen(true);
  };

  const openEditModal = (update) => {
    setEditingId(update.id);
    setTitle(update.title);
    setContent(update.desc);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const ok = await confirmDialog({
      title: "Delete Notice?",
      text: "Are you sure you want to delete this notice/announcement?",
    });
    if (!ok) return;
    
    try {
      await hrmsService.deleteNotice(id);
      setUpdates(updates.filter(u => (u._id || u.id) !== id));
      toast.success("Notice deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete notice");
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      if (editingId) {
        const updatedNotice = await hrmsService.updateNotice(editingId, {
          title: title.trim(),
          desc: content.trim(),
          date: format(new Date(), 'yyyy-MM-dd'),
          author: '- HR Dept'
        });
        setUpdates(updates.map(u => (u._id || u.id) === editingId ? updatedNotice : u));
        toast.success("Notice updated");
      } else {
        const newNotice = await hrmsService.createNotice({
          title: title.trim(),
          desc: content.trim(),
          date: format(new Date(), 'yyyy-MM-dd'),
          author: '- HR Dept'
        });
        setUpdates([newNotice, ...updates]);
        toast.success("Notice published");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save notice");
    }
  };

  return (
    <>
      <div className="hrms-panel">
        <div className="hrms-panel-header">
          <div>
            <h3 className="hrms-panel-title">HR Updates Bulletin</h3>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline" size="sm" icon={FiPlus} onClick={openAddModal}>Post New</Button>
            <Button variant="ghost" size="sm" onClick={() => setIsViewAllModalOpen(true)}>View all</Button>
          </div>
        </div>

        <div className="hrms-bulletin-list">
          {updates.length === 0 ? (
            <div className="text-center p-4 text-muted" style={{fontSize: '0.85rem'}}>
              No updates or announcements available.
            </div>
          ) : (
            updates.slice(0, 5).map(update => ( // show only 5 recent
              <div key={update._id || update.id} className="hrms-bulletin-item">
                <div className="hrms-bulletin-top">
                  <span className="hrms-bulletin-title">{update.title}</span>
                  <div className="d-flex align-items-center gap-2">
                    <span className="hrms-bulletin-date">{update.date}</span>
                    <button style={{border: 'none', background: 'transparent', color: 'var(--color-primary)', cursor: 'pointer', padding: 0}} onClick={() => openEditModal(update)}><FiEdit2 size={13} /></button>
                    <button style={{border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', padding: 0}} onClick={() => handleDelete(update._id || update.id)}><FiTrash2 size={13} /></button>
                  </div>
                </div>
                <p className="hrms-bulletin-desc" style={{ whiteSpace: 'pre-wrap' }}>{update.desc}</p>
                <div className="hrms-bulletin-author">{update.author}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Notice" : "Publish Notice / Announcement"} size="md">
        <form onSubmit={handlePostSubmit} className="p-2">
          <Input 
            label="Notice/Announcement Title*" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            required
            className="mb-3"
          />
          <div className="mb-4">
            <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Notice/Announcement Content*</label>
            <textarea 
              className="form-control" 
              rows="4" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the announcement content here..."
              required
              style={{ fontSize: '0.9rem' }}
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">{editingId ? "Save Changes" : "Publish Notice"}</Button>
          </div>
        </form>
      </Modal>

      {/* View All Modal */}
      <Modal open={isViewAllModalOpen} onClose={() => setIsViewAllModalOpen(false)} title="All Announcements & Notices" size="md">
        <div className="p-2" style={{maxHeight: '60vh', overflowY: 'auto'}}>
          {updates.length === 0 ? (
            <p className="text-center text-muted py-4">No announcements available.</p>
          ) : (
            Object.entries(
              updates.reduce((acc, u) => {
                // Wrap in try-catch in case of invalid date format
                try {
                  const month = format(parseISO(u.date), 'MM/yyyy'); 
                  if (!acc[month]) acc[month] = [];
                  acc[month].push(u);
                } catch(e) {}
                return acc;
              }, {})
            ).map(([month, nots]) => (
              <div key={month} className="mb-4">
                <h6 className="mb-3 border-bottom pb-2" style={{color: 'var(--color-primary)', fontWeight: 700}}>{month}</h6>
                <div className="d-flex flex-column gap-3">
                  {nots.sort((a,b) => new Date(b.date) - new Date(a.date)).map(u => (
                    <div key={u._id || u.id} className="d-flex justify-content-between p-3 border rounded shadow-sm align-items-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                      <div className="d-flex gap-3 align-items-center">
                        <div style={{width: 40, height: 40, borderRadius: 8, background: 'rgba(59, 130, 246, 0.05)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center'}}>
                          <FiFileText size={18} />
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: 'var(--color-text-primary)'}}>{u.title}</div>
                          <div style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem'}}>{u.author}</div>
                        </div>
                      </div>
                      <div className="text-end">
                        <div style={{fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem'}}>
                          {(() => {
                             try { return format(parseISO(u.date), 'dd/MM/yyyy'); }
                             catch(e) { return u.date; }
                          })()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </>
  );
}
