import { useCallback, useMemo, useState } from "react";
import { FiPlus, FiExternalLink } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Badge from "@/components/common/Badge/Badge";
import { companyService } from "@/api/services/companyService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBySearch } from "@/utils/helpers";
import { formatCurrency } from "@/utils/formatters";
export default function CompaniesList() {
  const load = useCallback(() => companyService.list(), []);
  const { data: rawCompanies, loading } = useAsync(load, [], []);
  const companies = useMemo(() => rawCompanies || [], [rawCompanies]);
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 250);
  const filtered = useMemo(
    () => filterBySearch(companies, debounced, ["name", "industry", "country"]),
    [companies, debounced]
  );
  const columns = [
    {
      key: "name", label: "Company", sortable: true,
      render: (r) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.name}</div>
          <a href={`https://${r.website}`} target="_blank" rel="noreferrer"
             className="d-inline-flex align-items-center gap-1 text-subtle" style={{ fontSize: 12 }}
             onClick={(e) => e.stopPropagation()}>
            {r.website} <FiExternalLink size={11} />
          </a>
        </div>
      ),
    },
    { key: "industry", label: "Industry", sortable: true },
    { key: "size",     label: "Size" },
    { key: "country",  label: "Country", sortable: true },
    { key: "revenue",  label: "Revenue", sortable: true, align: "right", render: (r) => formatCurrency(r.revenue) },
    { key: "contacts", label: "Contacts", align: "right", render: (r) => <Badge variant="primary">{r.contacts}</Badge> },
  ];
  return (
    <>
      <PageHeader
        title="Product Catalog"
        description="Manage your product listings and inventory"
        actions={<Button icon={FiPlus} variant="gradient">Create Product</Button>}
      />
      <div className="card p-3 mb-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search companies by name, industry or country…" />
      </div>
      <Table columns={columns} data={filtered} loading={loading} />
    </>
  );
}