import { useState } from "react";
import toast from "react-hot-toast";
import { FiUser, FiLock, FiBell, FiUsers } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Avatar from "@/components/common/Avatar/Avatar";
import Badge from "@/components/common/Badge/Badge";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { usersData } from "@/data/usersData";
import { classNames } from "@/utils/helpers";
const TABS = [
  { id: "profile",       label: "Profile",       icon: FiUser },
  { id: "security",      label: "Security",      icon: FiLock },
  { id: "notifications", label: "Notifications", icon: FiBell },
  { id: "team",          label: "Team",          icon: FiUsers },
];
export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [tab, setTab] = useState("profile");
  return (
    <>
      <PageHeader title="Settings" description="Manage your account, security and team preferences." />
      <div className="row g-3">
        <div className="col-12 col-md-3">
          <div className="card p-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={classNames(
                  "d-flex align-items-center gap-2 w-100 text-start px-3 py-2 mb-1",
                  "border-0 rounded"
                )}
                style={{
                  background: tab === t.id ? "var(--color-primary-soft)" : "transparent",
                  color: tab === t.id ? "var(--color-primary)" : "var(--color-text)",
                  fontWeight: 500, fontSize: 14, transition: "background-color 150ms",
                }}
              >
                <t.icon /> {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div className="card p-4">
            {tab === "profile" && (
              <div>
                <h3 className="mb-3" style={{ fontSize: "1.15rem" }}>Profile</h3>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <Avatar name={user?.name} size={64} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{user?.name}</div>
                    <div className="text-subtle" style={{ fontSize: 13 }}>{user?.email}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6"><Input label="Full name" defaultValue={user?.name} /></div>
                  <div className="col-md-6"><Input label="Email"     defaultValue={user?.email} /></div>
                  <div className="col-md-6"><Input label="Job title" defaultValue="Sales Director" /></div>
                  <div className="col-md-6"><Input label="Phone"     defaultValue="+1 415 555 0100" /></div>
                </div>
                <hr className="my-4" style={{ borderColor: "var(--color-divider)" }} />
                <h3 className="mb-3" style={{ fontSize: "1.05rem" }}>Appearance</h3>
                <div className="d-flex gap-2">
                  {["light","dark"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTheme(m)}
                      className={classNames("btn", theme === m ? "btn-primary" : "btn-light", "text-capitalize")}
                    >
                      {m} mode
                    </button>
                  ))}
                </div>
                <div className="mt-4 d-flex justify-content-end">
                  <Button onClick={() => toast.success("Profile saved")}>Save changes</Button>
                </div>
              </div>
            )}
            {tab === "security" && (
              <div>
                <h3 className="mb-3" style={{ fontSize: "1.15rem" }}>Security</h3>
                <Input label="Current password" type="password" />
                <Input label="New password"     type="password" />
                <Input label="Confirm new password" type="password" />
                <div className="mt-3 d-flex justify-content-end">
                  <Button onClick={() => toast.success("Password updated")}>Update password</Button>
                </div>
              </div>
            )}
            {tab === "notifications" && (
              <div>
                <h3 className="mb-3" style={{ fontSize: "1.15rem" }}>Notifications</h3>
                {[
                  ["New lead assigned to me",     true ],
                  ["Deal stage changes",          true ],
                  ["Daily activity summary",      false],
                  ["Weekly performance report",   true ],
                  ["Product announcements",       false],
                ].map(([label, def]) => (
                  <div key={label} className="d-flex justify-content-between align-items-center py-2"
                       style={{ borderBottom: "1px solid var(--color-divider)" }}>
                    <span style={{ fontSize: 14 }}>{label}</span>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" defaultChecked={def} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "team" && (
              <div>
                <h3 className="mb-3" style={{ fontSize: "1.15rem" }}>Team members</h3>
                <ul className="list-unstyled m-0">
                  {usersData.map((u) => (
                    <li key={u.id} className="d-flex align-items-center gap-3 py-3"
                        style={{ borderBottom: "1px solid var(--color-divider)" }}>
                      <Avatar name={u.name} size={40} />
                      <div className="flex-grow-1">
                        <div style={{ fontWeight: 600 }}>{u.name}</div>
                        <div className="text-subtle" style={{ fontSize: 12 }}>{u.email}</div>
                      </div>
                      <Badge variant="primary">{u.role}</Badge>
                      <Badge variant={u.status === "active" ? "success" : "warning"}>{u.status}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}