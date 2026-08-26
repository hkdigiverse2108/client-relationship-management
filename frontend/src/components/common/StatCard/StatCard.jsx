import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { formatCurrency, formatNumber } from "@/utils/formatters";
import { classNames } from "@/utils/helpers";
import "./StatCard.css";
export default function StatCard({ label, value, delta, trend, format = "number", icon: Icon, className = "" }) {
  const display =
    format === "currency" ? formatCurrency(value)
    : format === "percent"  ? `${value}%`
    : format === "text" ? value
    : formatNumber(value);
  const positive = trend === "up";
  const TrendIcon = positive ? FiTrendingUp : FiTrendingDown;
  return (
    <div className={`aio-stat ${className}`.trim()}>
      <div className="aio-stat__head">
        <span className="aio-stat__label">{label}</span>
        {Icon && (
          <span className="aio-stat__icon"><Icon /></span>
        )}
      </div>
      <div className="aio-stat__value">{display}</div>
      {delta != null && (
        <div className={classNames("aio-stat__delta", positive ? "is-up" : "is-down")}>
          <TrendIcon />
          <span>{Math.abs(delta)}%</span>
          <span className="text-subtle" style={{ fontWeight: 400 }}>vs last period</span>
        </div>
      )}
    </div>
  );
}