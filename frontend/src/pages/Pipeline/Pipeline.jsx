import { useCallback, useMemo } from "react";
import { FiPlus, FiDollarSign } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";
import Avatar from "@/components/common/Avatar/Avatar";
import { dealService } from "@/api/services/dealService";
import { useAsync } from "@/hooks/useAsync";
import { DEAL_STAGES } from "@/utils/constants";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { groupBy } from "@/utils/helpers";
import "./Pipeline.css";
import SearchInput from "@/components/common/PageHeaderSearchBar/SearchInput";
export default function DealsBoard() {
  const load = useCallback(() => dealService.list(), []);
  const { data: rawDeals, loading } = useAsync(load, [], []);
  const deals = useMemo(() => rawDeals || [], [rawDeals]);
  const grouped = useMemo(() => groupBy(deals, "stage"), [deals]);
  const stageTotals = useMemo(() => {
    const totals = {};
    DEAL_STAGES.forEach((s) => {
      totals[s.id] = (grouped[s.id] || []).reduce((sum, d) => sum + Number(d.amount || 0), 0);
    });
    return totals;
  }, [grouped]);
  if (loading) return <Loader />;
  return (
    <>
      <PageHeader
        title="Sales Pipeline"
        description="7 Deal Stages • Drag & drop to manage deals"
        actions={  <>   <SearchInput
        dark
        placeholder="Search deals..."
      /> <Button icon={FiPlus} variant="gradient">Create deal</Button> </>}
      />
      <div className="aio-board">
        {DEAL_STAGES.map((stage) => {
          const items = grouped[stage.id] || [];
          return (
            <div key={stage.id} className="aio-board__column">
              <div className="aio-board__col-head">
                <div>
                  <div className="aio-board__col-title">{stage.label}</div>
                  <div className="aio-board__col-meta">
                    {items.length} deals · {formatCurrency(stageTotals[stage.id])}
                  </div>
                </div>
                <span className="aio-board__col-badge">{items.length}</span>
              </div>
              <div className="aio-board__list">
                {items.map((d) => (
                  <article key={d.id} className="aio-board__card">
                    <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{d.title}</div>
                      <span className="aio-board__amount">
                        <FiDollarSign /> {formatCurrency(d.amount).replace("$", "")}
                      </span>
                    </div>
                    <div className="text-muted-2 mb-3" style={{ fontSize: 12 }}>{d.company}</div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Avatar name={d.owner} size={26} />
                      <span className="text-subtle" style={{ fontSize: 11 }}>
                        Close {formatDate(d.closeDate)}
                      </span>
                    </div>
                  </article>
                ))}
                {items.length === 0 && (
                  <div className="aio-board__empty">No deals</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}