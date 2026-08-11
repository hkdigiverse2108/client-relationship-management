import React, { useState } from "react";
import { createPortal } from "react-dom";
import { FiX, FiDownload } from "react-icons/fi";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import toast from "react-hot-toast";
import "./ExportModal.css";

export default function ExportModal({ isOpen, onClose, onExport, title = "Export Data" }) {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  if (!isOpen) return null;

  const handleExport = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    if (startDate > endDate) {
      toast.error("Start date cannot be after end date.");
      return;
    }
    if (startDate > today || endDate > today) {
      toast.error("Future dates are not allowed.");
      return;
    }

    onExport(startDate, endDate);
  };

  return createPortal(
    <div className="aio-export-modal-backdrop">
      <div className="aio-export-modal">
        <div className="aio-export-modal-header">
          <h3>{title}</h3>
          <button className="aio-export-modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="aio-export-modal-body">
          <p className="aio-export-modal-desc">
            Select a date range to filter the records you want to export.
          </p>
          <div className="aio-export-modal-dates">
            <div className="aio-export-modal-field">
              <label>Start Date</label>
              <Input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                max={today}
              />
            </div>
            <div className="aio-export-modal-field">
              <label>End Date</label>
              <Input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                max={today}
              />
            </div>
          </div>
        </div>
        <div className="aio-export-modal-footer">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" icon={FiDownload} onClick={handleExport}>
            Download PDF
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
