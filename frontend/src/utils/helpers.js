// Generic pure helpers.
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const uniqueId = (prefix = "id") => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
export const classNames = (...args) => args.filter(Boolean).join(" ").trim();
export const paginate = (items = [], page = 1, pageSize = 10) => {
  const safeItems = Array.isArray(items) ? items : [];
  const start = (page - 1) * pageSize;
  return safeItems.slice(start, start + pageSize);
};
export const sortBy = (items = [], key, direction = "asc") => {
  const safeItems = Array.isArray(items) ? items : [];
  const dir = direction === "desc" ? -1 : 1;
  return [...safeItems].sort((a, b) => {
    const av = a?.[key];
    const bv = b?.[key];
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
};
export const filterBySearch = (items = [], term = "", keys = []) => {
  const safeItems = Array.isArray(items) ? items : [];
  const q = term.trim().toLowerCase();
  if (!q) return safeItems;
  return safeItems.filter((item) =>
    keys.some((k) =>
      String(item?.[k] ?? "")
        .toLowerCase()
        .includes(q),
    ),
  );
};
export const groupBy = (items = [], key) => {
  const safeItems = Array.isArray(items) ? items : [];
  return safeItems.reduce((acc, item) => {
    const k = item[key];
    (acc[k] ||= []).push(item);
    return acc;
  }, {});
};
