import { useCallback, useMemo, useState } from "react";
import { FiPlus, FiMoreVertical, FiEdit2, FiTrash2, FiMail, FiPhone } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Badge from "@/components/common/Badge/Badge";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import Avatar from "@/components/common/Avatar/Avatar";
import { customerService } from "@/api/services/customerService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBySearch } from "@/utils/helpers";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import CustomerFormModal from "./CustomerFormModal";
import toast from "react-hot-toast";

export default function CustomersList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const load = useCallback(() => customerService.list(), []);
  const { data: rawCustomers, loading, refetch } = useAsync(load, [], []);
  const customers = useMemo(() => rawCustomers || [], [rawCustomers]);
  
  const debounced = useDebounce(search, 250);
  
  const filtered = useMemo(() => {
    let result = customers;
    if (debounced) {
      result = filterBySearch(result, debounced, ["name", "email", "phone", "city", "customer_id"]);
    }
    if (statusFilter !== "all") {
      result = result.filter(c => c.status?.toLowerCase() === statusFilter.toLowerCase());
    }
    return result;
  }, [customers, debounced, statusFilter]);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      if (editing) {
        const idToUpdate = editing.id || editing._id;
        await customerService.update(idToUpdate, values);
        toast.success("Customer updated successfully!");
      } else {
        await customerService.create(values);
        toast.success("Customer created successfully!");
      }
      setModalOpen(false);
      setEditing(null);
      refetch();
    } catch (error) {
      console.error("Failed to save customer:", error);
      toast.error(error?.message || "Failed to save customer");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (customer) => {
    setEditing(customer);
    setModalOpen(true);
  };

  const handleDelete = async (customer) => {
    const ok = await confirmDialog({
      title: "Delete customer?",
      text: `Customer ${customer.name} will be permanently removed.`,
    });
    if (!ok) return;

    try {
      const idToDelete = customer.id || customer._id;
      await customerService.remove(idToDelete);
      toast.success("Customer deleted successfully");
      refetch();
    } catch (error) {
      console.error("Failed to delete customer:", error);
      toast.error(error?.message || "Failed to delete customer");
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "inactive":
        return <Badge variant="warning">Inactive</Badge>;
      case "blocked":
        return <Badge variant="danger">Blocked</Badge>;
      default:
        return <Badge variant="neutral">{status || "Active"}</Badge>;
    }
  };

  const columns = [
    {
      key: "customer",
      label: "Customer",
      sortable: true,
      render: (r) => (
        <div className="d-flex align-items-center gap-3">
          <Avatar name={r.name} size={40} />
          <div>
            <div style={{ fontWeight: 600 }}>{r.name}</div>
            <div className="text-subtle" style={{ fontSize: 12 }}>
              ID: {r.customer_id}
            </div>
          </div>
        </div>
      )
    },
    {
      key: "contact_details",
      label: "Contact Info",
      render: (r) => (
        <div>
          {r.email && (
            <div className="d-flex align-items-center gap-2 text-subtle mb-1" style={{ fontSize: 13 }}>
              <FiMail /> <span>{r.email}</span>
            </div>
          )}
          {r.phone && (
            <div className="d-flex align-items-center gap-2 text-subtle" style={{ fontSize: 13 }}>
              <FiPhone /> <span>{r.phone}</span>
            </div>
          )}
          {(!r.email && !r.phone) && <span className="text-subtle">N/A</span>}
        </div>
      )
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
      render: (r) => (
        <div>
          <div style={{ fontWeight: 500 }}>{r.city || "Unknown City"}</div>
          {(r.state || r.country) && (
            <div className="text-subtle" style={{ fontSize: 12 }}>
              {[r.state, r.country].filter(Boolean).join(", ")}
            </div>
          )}
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      align: "center",
      render: (r) => getStatusBadge(r.status)
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (r) => (
        <Dropdown
          trigger={({ onClick }) => (
            <button className="btn btn-sm btn-light" onClick={(e) => { e.stopPropagation(); onClick(); }}>
              <FiMoreVertical />
            </button>
          )}
          items={[
            { label: "Edit", icon: FiEdit2, onClick: () => handleEdit(r) },
            { label: "Delete", icon: FiTrash2, danger: true, onClick: () => handleDelete(r) }
          ]}
        />
      )
    }
  ];

  return (
    <>
      <PageHeader
        title="Customers"
        description="Manage your E-Commerce customers"
        actions={
          <Button icon={FiPlus} variant="gradient" onClick={() => { setEditing(null); setModalOpen(true); }}>
            New Customer
          </Button>
        }
      />
      <div className="card p-3 mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-5">
            <SearchBar 
              value={search} 
              onChange={setSearch} 
              placeholder="Search by ID, name, email, phone or city..." 
            />
          </div>
          <div className="col-8 col-md-3">
            <select 
              className="form-select" 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ height: 38 }}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div className="col-4 col-md-4 text-end d-flex justify-content-end align-items-center gap-2">
            {(statusFilter !== "all" || search !== "") && (
              <button 
                className="btn btn-sm btn-link text-danger p-0 m-0" 
                onClick={() => {
                  setStatusFilter("all");
                  setSearch("");
                }}
                style={{ fontSize: 13, textDecoration: "none", fontWeight: 500 }}
              >
                Clear
              </button>
            )}
             <span className="text-muted-2 ms-2" style={{ fontSize: 13 }}>
              {filtered.length} customers
            </span>
          </div>
        </div>
      </div>
      
      <Table columns={columns} data={filtered} loading={loading} />

      {modalOpen && (
        <CustomerFormModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          onSubmit={handleSubmit}
          initialValues={editing}
          submitting={submitting}
        />
      )}
    </>
  );
}