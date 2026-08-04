import React from "react";
import { FiShield } from "react-icons/fi";
import Button from "@/components/common/Button/Button";
import { useNavigate } from "react-router-dom";

export default function PermissionDenied() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 w-100 text-center p-4">
      <div className="mb-4" style={{ fontSize: 64, color: "var(--color-danger)" }}>
        <FiShield />
      </div>
      <h2 className="mb-3">Access Denied</h2>
      <p className="text-muted-2 mb-4" style={{ maxWidth: 400 }}>
        You don't have permission to view this page. Please contact your administrator.
      </p>
      <Button onClick={() => navigate("/")}>Go to Dashboard</Button>
    </div>
  );
}
