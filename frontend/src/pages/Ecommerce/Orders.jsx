import { useCallback, useMemo, useState } from "react";
import { FiPlus, FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Badge from "@/components/common/Badge/Badge";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import { orderService } from "@/api/services/orderService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBySearch } from "@/utils/helpers";
import { formatCurrency } from "@/utils/formatters";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import OrderFormModal from "./OrderFormModal";
import toast from "react-hot-toast";

export default function OrdersList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  
  // Filter States
  const [platformFilter, setPlatformFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [orderFilter, setOrderFilter] = useState("all");

  const load = useCallback(() => orderService.list(), []);
  const { data: rawOrders, loading, refetch } = useAsync(load, [], []);
  const orders = useMemo(() => rawOrders || [], [rawOrders]);
  
  const debounced = useDebounce(search, 250);
  
  const filtered = useMemo(() => {
    let result = orders;

    if (debounced) {
      result = filterBySearch(result, debounced, ["customer_name", "product_name", "platform", "destination_city", "order_id"]);
    }

    if (platformFilter !== "all") {
      result = result.filter(o => o.platform?.toLowerCase() === platformFilter.toLowerCase());
    }

    if (paymentFilter !== "all") {
      result = result.filter(o => o.payment_status?.toLowerCase() === paymentFilter.toLowerCase());
    }

    if (orderFilter !== "all") {
      result = result.filter(o => o.order_status?.toLowerCase() === orderFilter.toLowerCase());
    }

    return result;
  }, [orders, debounced, platformFilter, paymentFilter, orderFilter]);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      if (editing) {
        const idToUpdate = editing.id || editing._id;
        await orderService.update(idToUpdate, values);
        toast.success("Order updated successfully!");
      } else {
        await orderService.create(values);
        toast.success("E-commerce order simulated and saved successfully!");
      }
      setModalOpen(false);
      setEditing(null);
      refetch();
    } catch (error) {
      console.error("Failed to save order:", error);
      toast.error(error?.message || "Failed to save order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (order) => {
    setEditing(order);
    setModalOpen(true);
  };

  const handleDelete = async (order) => {
    const ok = await confirmDialog({
      title: "Delete order?",
      text: `Order ${order.order_id} for ${order.customer_name} will be permanently removed.`,
    });
    if (!ok) return;

    try {
      const idToDelete = order.id || order._id;
      await orderService.remove(idToDelete);
      toast.success("Order deleted successfully");
      refetch();
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error(error?.message || "Failed to delete order");
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return <Badge variant="success">Paid</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "failed":
        return <Badge variant="danger">Failed</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getOrderStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <Badge variant="success">Delivered</Badge>;
      case "processing":
        return <Badge variant="info">Processing</Badge>;
      case "shipped":
        return <Badge variant="primary">Shipped</Badge>;
      case "in transit":
        return <Badge variant="warning">In Transit</Badge>;
      case "out for delivery":
        return <Badge variant="accent">Out for Delivery</Badge>;
      case "packed":
      default:
        return <Badge variant="neutral">{status || "Packed"}</Badge>;
    }
  };

  const columns = [
    {
      key: "order_id",
      label: "Order ID",
      sortable: true,
      render: (r) => <span className="text-primary" style={{ fontWeight: 600 }}>{r.order_id}</span>
    },
    {
      key: "customer_name",
      label: "Customer & Destination",
      sortable: true,
      render: (r) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.customer_name}</div>
          <div className="text-subtle" style={{ fontSize: 12 }}>
            {r.destination_city}
          </div>
        </div>
      )
    },
    {
      key: "product_name",
      label: "Product & Platform",
      sortable: true,
      render: (r) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.product_name}</div>
          <div className="text-subtle" style={{ fontSize: 11 }}>
            Platform: <span className="text-primary" style={{ fontWeight: 500 }}>{r.platform}</span>
          </div>
        </div>
      )
    },
    {
      key: "quantity",
      label: "Qty & Unit Price",
      align: "center",
      render: (r) => (
        <div>
          <div>{r.quantity} pcs</div>
          <div className="text-subtle" style={{ fontSize: 11 }}>
            {formatCurrency(r.unit_price)} each
          </div>
        </div>
      )
    },
    {
      key: "total_amount",
      label: "Order Financials",
      align: "right",
      render: (r) => {
        const qty = Number(r.quantity) || 0;
        const price = Number(r.unit_price) || 0;
        const disc = Number(r.discount) || 0;
        const tax = Number(r.tax) || 0;
        const total = (qty * price) - disc + tax;
        return (
          <div>
            <div style={{ fontWeight: 600 }}>{formatCurrency(total)}</div>
            <div className="text-subtle" style={{ fontSize: 11 }}>
              Disc: -{formatCurrency(disc)} | Tax: +{formatCurrency(tax)}
            </div>
          </div>
        );
      }
    },
    {
      key: "payment_status",
      label: "Payment",
      sortable: true,
      align: "center",
      render: (r) => getPaymentStatusBadge(r.payment_status)
    },
    {
      key: "order_status",
      label: "Status",
      sortable: true,
      align: "center",
      render: (r) => getOrderStatusBadge(r.order_status)
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
        title="Orders Management"
        description="Track and manage all e-commerce orders across platforms"
        actions={
          <Button icon={FiPlus} variant="gradient" onClick={() => { setEditing(null); setModalOpen(true); }}>
            Simulate E-com Order
          </Button>
        }
      />
      <div className="card p-3 mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-5">
            <SearchBar 
              value={search} 
              onChange={setSearch} 
              placeholder="Search by ID, customer, product, platform or city…" 
            />
          </div>
          <div className="col-6 col-md-2">
            <select 
              className="form-select" 
              value={platformFilter} 
              onChange={(e) => setPlatformFilter(e.target.value)}
              style={{ height: 38 }}
            >
              <option value="all">All Platforms</option>
              <option value="Amazon">Amazon</option>
              <option value="Flipkart">Flipkart</option>
              <option value="Meesho">Meesho</option>
              <option value="Shopify">Shopify</option>
              <option value="WooCommerce">WooCommerce</option>
              <option value="Myntra">Myntra</option>
              <option value="Ajio">Ajio</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-6 col-md-2">
            <select 
              className="form-select" 
              value={paymentFilter} 
              onChange={(e) => setPaymentFilter(e.target.value)}
              style={{ height: 38 }}
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="col-6 col-md-2">
            <select 
              className="form-select" 
              value={orderFilter} 
              onChange={(e) => setOrderFilter(e.target.value)}
              style={{ height: 38 }}
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="packed">Packed</option>
              <option value="shipped">Shipped</option>
              <option value="in transit">In Transit</option>
              <option value="out for delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <div className="col-6 col-md-1 text-md-end">
            {(platformFilter !== "all" || paymentFilter !== "all" || orderFilter !== "all" || search !== "") && (
              <button 
                className="btn btn-sm btn-link text-danger p-0" 
                onClick={() => {
                  setPlatformFilter("all");
                  setPaymentFilter("all");
                  setOrderFilter("all");
                  setSearch("");
                }}
                style={{ fontSize: 13, textDecoration: "none", fontWeight: 500 }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} data={filtered} loading={loading} />

      {modalOpen && (
        <OrderFormModal
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