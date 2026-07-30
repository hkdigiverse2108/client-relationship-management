import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import { tasksData } from "@/data/tasksData";
import "./Calendar.css";
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
/** Simple month-view calendar — reads events from the mock task fixtures. */
export default function Calendar() {
  const [cursor, setCursor] = useState(dayjs());
  const grid = useMemo(() => {
    const start = cursor.startOf("month").startOf("week");
    const end = cursor.endOf("month").endOf("week");
    const days = [];
    let d = start;
    while (d.isBefore(end) || d.isSame(end, "day")) {
      days.push(d);
      d = d.add(1, "day");
    }
    return days;
  }, [cursor]);
  const eventsByDay = useMemo(() => {
    const map = {};
    tasksData.forEach((t) => {
      const key = dayjs(t.dueDate).format("YYYY-MM-DD");
      (map[key] ||= []).push(t);
    });
    return map;
  }, []);
  const today = dayjs();
  return (
    <>
      <PageHeader
        title="Calendar"
        description="Meetings, follow-ups and deadlines at a glance."
        actions={<Button icon={FiPlus}>New event</Button>}
      />
      <div className="card p-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-light btn-sm" onClick={() => setCursor((c) => c.subtract(1, "month"))} aria-label="Previous month">
              <FiChevronLeft />
            </button>
            <button className="btn btn-light btn-sm" onClick={() => setCursor((c) => c.add(1, "month"))} aria-label="Next month">
              <FiChevronRight />
            </button>
            <button className="btn btn-light btn-sm" onClick={() => setCursor(dayjs())}>Today</button>
          </div>
          <h3 style={{ fontSize: "1.15rem" }}>{cursor.format("MMMM YYYY")}</h3>
          <div style={{ width: 120 }} />
        </div>
        <div className="aio-cal">
          {WEEKDAYS.map((d) => (
            <div key={d} className="aio-cal__head">{d}</div>
          ))}
          {grid.map((d) => {
            const key = d.format("YYYY-MM-DD");
            const events = eventsByDay[key] || [];
            const outside = d.month() !== cursor.month();
            const isToday = d.isSame(today, "day");
            return (
              <div key={key} className={`aio-cal__cell ${outside ? "is-outside" : ""} ${isToday ? "is-today" : ""}`}>
                <div className="aio-cal__date">{d.date()}</div>
                <div className="aio-cal__events">
                  {events.slice(0, 3).map((e) => (
                    <div key={e.id} className="aio-cal__event" title={e.title}>
                      {e.title}
                    </div>
                  ))}
                  {events.length > 3 && <div className="aio-cal__more">+{events.length - 3} more</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}