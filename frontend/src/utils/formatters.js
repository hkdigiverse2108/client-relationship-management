import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { APP_CONFIG } from "@/config/appConfig";
dayjs.extend(relativeTime);
export const formatCurrency = (value, currency = APP_CONFIG.currency) => {
  if (value == null || Number.isNaN(Number(value))) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value));
};
export const formatNumber = (value) => {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US").format(Number(value));
};
export const formatDate = (value, pattern = APP_CONFIG.dateFormat) => {
  if (!value) return "—";
  const d = dayjs(value);
  return d.isValid() ? d.format(pattern) : "—";
};
export const formatDateTime = (value) => formatDate(value, APP_CONFIG.dateTimeFormat);
export const timeAgo = (value) => {
  if (!value) return "—";
  const d = dayjs(value);
  return d.isValid() ? d.fromNow() : "—";
};
export const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
