import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { APP_CONFIG } from "@/config/appConfig";
dayjs.extend(relativeTime);
dayjs.extend(utc);
export const formatCurrency = (value, currency = APP_CONFIG.currency) => {
  if (value == null || Number.isNaN(Number(value))) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
};
export const formatNumber = (value) => {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-IN").format(Number(value));
};
export const formatDate = (value, pattern = APP_CONFIG.dateFormat) => {
  if (!value) return "—";
  const d = dayjs.utc(value).local();
  return d.isValid() ? d.format(pattern) : "—";
};
export const formatDateTime = (value) => formatDate(value, APP_CONFIG.dateTimeFormat);
export const timeAgo = (value) => {
  if (!value) return "—";
  const d = dayjs.utc(value).local();
  return d.isValid() ? d.fromNow() : "—";
};
export const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
