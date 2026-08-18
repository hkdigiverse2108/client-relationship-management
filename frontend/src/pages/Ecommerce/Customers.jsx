import { useCallback, useMemo, useState } from "react";
import { FiPlus, FiMail, FiPhone } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Avatar from "@/components/common/Avatar/Avatar";
import Badge from "@/components/common/Badge/Badge";
import Loader from "@/components/common/Loader/Loader";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import { contactService } from "@/api/services/contactService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBySearch } from "@/utils/helpers";
import GridTable from "@/components/common/GridTable/GridTable";
import SearchInput from "@/components/common/PageHeaderSearchBar/SearchInput";
export default function ContactsList() {
  const [view, setView] = useState("grid");
  const load = useCallback(() => contactService.list(), []);
  const { data: rawContacts, loading } = useAsync(load, [], []);
  const contacts = useMemo(() => rawContacts || [], [rawContacts]);
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 250);
  const filtered = useMemo(
    () => filterBySearch(contacts, debounced, ["name", "email", "company", "title"]),
    [contacts, debounced]
  );
  return (
    <>
      <PageHeader
        title="Contacts"
        description="0 contacts in your CRM"
        actions={  <>
      <SearchInput dark placeholder="Search contacts..." />

      <GridTable
        value={view}
        onChange={setView}
        options={[
          { label: "Grid", value: "grid" },
          { label: "Table", value: "table" },
        ]}
      />
 <Button icon={FiPlus}>New contact</Button> </> }
      />
      <div className="card p-3 mb-3">
        <div className="row g-2">
          <div className="col-12 col-md-6"><SearchBar value={search} onChange={setSearch} placeholder="Search contacts…" /></div>
          <div className="col-12 col-md-6 text-md-end">
            <span className="text-muted-2" style={{ fontSize: 13, lineHeight: "38px" }}>
              {filtered.length} contacts
            </span>
          </div>
        </div>
      </div>
      {loading ? <Loader /> : filtered.length === 0 ? (
        <EmptyState title="No contacts match your search" description="Try clearing filters or adding a new contact." />
      ) : (
        <div className="row g-3">
          {filtered.map((c) => (
            <div className="col-12 col-md-6 col-xl-4" key={c.id}>
              <div className="card p-3 h-100" style={{ transition: "transform var(--transition-base), box-shadow var(--transition-base)" }}
                   onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                   onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <Avatar name={c.name} size={44} />
                  <div className="flex-grow-1 min-width-0">
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    <div className="text-subtle" style={{ fontSize: 12 }}>{c.title} · {c.company}</div>
                  </div>
                </div>
                <div className="d-flex flex-column gap-2 mb-3" style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
                  <div className="d-flex align-items-center gap-2"><FiMail /> <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{c.email}</span></div>
                  <div className="d-flex align-items-center gap-2"><FiPhone /> <span>{c.phone}</span></div>
                </div>
                <div className="d-flex flex-wrap gap-1">
                  {(Array.isArray(c.tags) ? c.tags : typeof c.tags === 'string' ? JSON.parse(c.tags) : []).map((t) => <Badge key={t} variant="primary" size="sm">{t}</Badge>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}








// Baad me jab Grid aur Table view banaoge, tab sirf:

// {view === "grid" ? (
//   <CustomerGrid />
// ) : (
//   <CustomerTable />
// )}

// ya

// switch (view) {
//   case "grid":
//     return <CustomerGrid />;
//   case "table":
//     return <CustomerTable />;
// }