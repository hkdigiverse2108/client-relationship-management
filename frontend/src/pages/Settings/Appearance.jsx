import React, { useEffect } from "react";
import { useAppearance } from "@/context/AppearanceContext";
import { useTheme } from "@/context/ThemeContext";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { FiRefreshCw, FiCheckCircle, FiUpload, FiDownload, FiLayout, FiSliders, FiGrid } from "react-icons/fi";

const THEME_PRESETS = [
  { id: "default", name: "Default", colors: ["#0052CC", "#F7F8FB", "#E5EEFF"] },
  { id: "modern", name: "Modern Blue", colors: ["#2563EB", "#EFF6FF", "#BFDBFE"] },
  { id: "corporate", name: "Corporate Dark", colors: ["#0F172A", "#F1F5F9", "#CBD5E1"] },
  { id: "forest", name: "Forest Green", colors: ["#059669", "#ECFDF5", "#A7F3D0"] },
  { id: "sunset", name: "Sunset Orange", colors: ["#EA580C", "#FFF7ED", "#FED7AA"] },
  { id: "royal", name: "Royal Purple", colors: ["#7C3AED", "#F5F3FF", "#DDD6FE"] },
  { id: "gold", name: "Luxury Gold", colors: ["#F6C343", "#FFFDF5", "#D8A019"] },
  { id: "minimal", name: "Minimal White", colors: ["#FFFFFF", "#F4F5F7", "#EBECF0"] },
  { id: "startup", name: "Startup Gradient", colors: ["#FF5630", "#FFEBE6", "#DE350B"] },
  { id: "enterprise", name: "Enterprise Gray", colors: ["#42526E", "#F4F5F7", "#5E6C84"] },
];

const COLOR_CONFIGS = [
  { id: "primary", label: "Primary Color", sub: "Main brand highlights, links, primary buttons", hex: "#0052CC" },
  { id: "secondary", label: "Secondary Color", sub: "Secondary highlights, sub-menus", hex: "#3B82F6" },
  { id: "accent", label: "Accent Color", sub: "Alert badges, graphs gradients, accessory buttons", hex: "#8B5AD5" },
  { id: "sidebar", label: "Sidebar Background", sub: "Fills the left-hand navigation sidebar", hex: "#E5EEFF" },
  { id: "navbar", label: "Navbar/Header Background", sub: "Fills the top header dashboard bar", hex: "#0F172A" },
  { id: "card", label: "Card Background", sub: "Grid cards, modals, dropdown panels", hex: "#FFFFFF" },
  { id: "app_bg", label: "App Background", sub: "Core body background", hex: "#F8FAFC" },
  { id: "table_header", label: "Table Header Fill", sub: "Grid/list table column headers background", hex: "#EFF4FF" },
  { id: "hover", label: "Hover Background", sub: "List items, dropdowns and button hover states", hex: "#EFF4FF" },
  { id: "border", label: "Border Color", sub: "Dividers, grid outlines, input wraps", hex: "#CBD5E1" },
  { id: "link", label: "Link Text Color", sub: "Hyperlink anchors and clickable symbols", hex: "#0052CC" },
  { id: "icon", label: "Icon Color", sub: "Main navigation and card symbol graphics", hex: "#64748B" },
  { id: "success", label: "Success Indicators", sub: "Active, paid, confirmed status tags", hex: "#10B981" },
  { id: "warning", label: "Warning Indicators", sub: "Pending, low stock status warnings", hex: "#F59E0B" },
  { id: "error", label: "Error / Danger Indicators", sub: "Failed, cancelled, out of stock warnings", hex: "#EF4444" },
  { id: "info", label: "Info Alerts", sub: "Informational banner highlights", hex: "#0EA5E9" },
];

export default function Appearance() {
  const { appearance, updateAppearance, updateColor, updateColors, resetAppearance, applyPreset } = useAppearance();
  const { setTheme } = useTheme();

  useEffect(() => {
    // Inject ux4g CSS only on this page
    const link = document.createElement("link");
    link.href = "https://cdn.ux4g.gov.in/UX4G@3.0.18/index.css";
    link.rel = "stylesheet";
    link.id = "ux4g-theme-css";
    document.head.appendChild(link);
    
    return () => {
      const existing = document.getElementById("ux4g-theme-css");
      if (existing) {
        existing.remove();
      }
    };
  }, []);

  const handlePresetSelect = (preset) => {
    applyPreset(preset.id);
    
    // Auto-sync with global dark mode
    if (preset.id === "corporate") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  
  return (
    <div className="ux4g-p-l" style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <FiLayout className="text-primary" size={24} />
            <h2 className="m-0" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Appearance & Theme Settings</h2>
          </div>
          <p className="text-muted m-0" style={{ fontSize: "0.9rem" }}>
            Customize global UI style presets, color builders, border radius, layout density, and shadow attributes.
          </p>
        </div>
        <button className="ux4g-btn-outline-neutral ux4g-btn-md" onClick={resetAppearance}>
          <FiRefreshCw className="me-2" /> One-Click Reset
        </button>
      </div>

      <div className="row g-4">
        {/* Left Column (Main Content) */}
        <div className="col-lg-8">
          
          {/* Section 1: Presets */}
          <div className="ux4g-card ux4g-card-solid ux4g-card-vertical p-4 mb-4" style={{ borderRadius: "16px" }}>
            <h6 className="mb-4 d-flex align-items-center text-uppercase text-muted" style={{ fontSize: "0.8rem", letterSpacing: "0.5px", fontWeight: 600 }}>
              <FiGrid className="me-2 text-primary" /> PROFESSIONAL DESIGN THEME PRESETS
            </h6>
            <div className="row g-3">
              {THEME_PRESETS.map((preset) => (
                <div className="col-md-4 col-sm-6" key={preset.id}>
                  <div 
                    className={`ux4g-card ux4g-card-outline p-3 d-flex flex-column justify-content-center cursor-pointer`}
                    style={{ 
                      borderRadius: "12px", 
                      border: appearance.preset === preset.id ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                      background: appearance.preset === preset.id ? "var(--color-primary-soft)" : "transparent"
                    }}
                    onClick={() => handlePresetSelect(preset)}
                  >
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "12px" }}>{preset.name}</span>
                    <div className="d-flex gap-2">
                      {preset.colors.map((c, i) => (
                        <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.1)" }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Custom Palette Editor */}
          <div className="ux4g-card ux4g-card-solid ux4g-card-vertical p-4 mb-4" style={{ borderRadius: "16px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="m-0 d-flex align-items-center text-uppercase text-muted" style={{ fontSize: "0.8rem", letterSpacing: "0.5px", fontWeight: 600 }}>
                <FiSliders className="me-2 text-primary" /> CUSTOM UX4G COLOR PALETTE EDITOR
              </h6>
              <span className="text-muted" style={{ fontStyle: "italic", fontSize: "0.8rem" }}>Adjust picker to build custom colors</span>
            </div>
            
            <div className="row g-4">
              {COLOR_CONFIGS.map((col) => (
                <div className="col-md-6 d-flex align-items-center justify-content-between" key={col.id}>
                  <div className="pe-3">
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{col.label}</div>
                    <div className="text-muted" style={{ fontSize: "0.75rem", lineHeight: "1.2" }}>{col.sub}</div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <input 
                      type="text" 
                      className="ux4g-bg-neutral-soft px-2 py-1 rounded form-control border-0" 
                      style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--color-text-subtle)", border: "1px solid var(--color-border)", width: "70px", height: "28px" }}
                      value={appearance.colors[col.id] || col.hex}
                      onChange={(e) => updateColor(col.id, e.target.value)}
                    />
                    <input 
                      type="color"
                      value={appearance.colors[col.id] || col.hex}
                      onChange={(e) => updateColor(col.id, e.target.value)}
                      style={{ width: 28, height: 28, borderRadius: "50%", padding: 0, border: "1px solid rgba(0,0,0,0.1)", cursor: "pointer", background: "none" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Layout, Density & Borders */}
          <div className="ux4g-card ux4g-card-solid ux4g-card-vertical p-4 mb-4" style={{ borderRadius: "16px" }}>
            <h6 className="mb-4 d-flex align-items-center text-uppercase text-muted" style={{ fontSize: "0.8rem", letterSpacing: "0.5px", fontWeight: 600 }}>
              <FiLayout className="me-2 text-primary" /> CUSTOM LAYOUT, DENSITY & BORDERS
            </h6>
            
            <div className="row g-4">
              <div className="col-md-6">
                <label className="text-uppercase text-muted d-block mb-2" style={{ fontSize: "0.7rem", fontWeight: 600 }}>UI Spacing Density</label>
                <div className="d-flex rounded p-1" style={{ background: "var(--color-surface-alt)", border: "1px solid var(--color-border)" }}>
                  {["Compact", "Comfortable", "Wide"].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => updateAppearance({ density: opt })}
                      className={`flex-grow-1 border-0 py-1 rounded ${appearance.density === opt ? "bg-white shadow-sm text-primary fw-medium" : "bg-transparent text-muted"}`}
                      style={{ fontSize: "0.8rem", transition: "all 0.2s" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="col-md-6">
                <label className="text-uppercase text-muted d-block mb-2" style={{ fontSize: "0.7rem", fontWeight: 600 }}>Base Typography Font Size</label>
                <div className="d-flex rounded p-1" style={{ background: "var(--color-surface-alt)", border: "1px solid var(--color-border)" }}>
                  {["SM", "BASE", "LG", "XL"].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => updateAppearance({ fontSize: opt })}
                      className={`flex-grow-1 border-0 py-1 rounded ${appearance.fontSize === opt ? "bg-white shadow-sm text-primary fw-medium" : "bg-transparent text-muted"}`}
                      style={{ fontSize: "0.8rem", transition: "all 0.2s" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex justify-content-between mb-2">
                  <label className="text-uppercase text-muted m-0" style={{ fontSize: "0.7rem", fontWeight: 600 }}>Border Corner Radius</label>
                  <span className="text-primary fw-bold" style={{ fontSize: "0.75rem" }}>{appearance.borderRadius}PX</span>
                </div>
                <input type="range" className="form-range" min="0" max="40" value={appearance.borderRadius} onChange={(e) => updateAppearance({ borderRadius: Number(e.target.value) })} />
              </div>
              
              <div className="col-md-6">
                <div className="d-flex justify-content-between mb-2">
                  <label className="text-uppercase text-muted m-0" style={{ fontSize: "0.7rem", fontWeight: 600 }}>Sidebar Navigation Width</label>
                  <span className="text-primary fw-bold" style={{ fontSize: "0.75rem" }}>{appearance.sidebarWidth}PX</span>
                </div>
                <input type="range" className="form-range" min="200" max="320" value={appearance.sidebarWidth} onChange={(e) => updateAppearance({ sidebarWidth: Number(e.target.value) })} />
              </div>

              <div className="col-md-6">
                <label className="text-uppercase text-muted d-block mb-2" style={{ fontSize: "0.7rem", fontWeight: 600 }}>Font Family</label>
                <select className="form-select" style={{ fontSize: "0.85rem" }}>
                  <option>Inter (SaaS standard)</option>
                  <option>Roboto</option>
                  <option>Outfit</option>
                  <option>Open Sans</option>
                </select>
              </div>
              
              <div className="col-md-6">
                <label className="text-uppercase text-muted d-block mb-2" style={{ fontSize: "0.7rem", fontWeight: 600 }}>Card Shadow Intensity</label>
                <div className="d-flex rounded p-1" style={{ background: "var(--color-surface-alt)", border: "1px solid var(--color-border)" }}>
                  {["None", "Light", "Medium", "High"].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => updateAppearance({ shadow: opt })}
                      className={`flex-grow-1 border-0 py-1 rounded ${appearance.shadow === opt ? "bg-white shadow-sm text-primary fw-medium" : "bg-transparent text-muted"}`}
                      style={{ fontSize: "0.8rem", transition: "all 0.2s" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-12 mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Enable Interface Transitions & Keyframes</div>
                  <div className="text-muted" style={{ fontSize: "0.8rem" }}>Toggles sliding cards and fade-in transitions. Disabling improves legacy device render performance.</div>
                </div>
                <label className="ux4g-switch ux4g-switch-md">
                  <input type="checkbox" defaultChecked />
                  <span className="ux4g-switch-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 4: Org Policy */}
          <div className="ux4g-card ux4g-card-solid ux4g-card-vertical p-4 mb-4" style={{ borderRadius: "16px" }}>
            <h6 className="mb-4 d-flex align-items-center text-uppercase text-muted" style={{ fontSize: "0.8rem", letterSpacing: "0.5px", fontWeight: 600 }}>
              <FiCheckCircle className="me-2 text-primary" /> ORGANIZATION THEME POLICY (ROLE-BASED)
            </h6>
            <div className="row g-3">
              {[
                { name: "Personal Override", desc: "Saves theme as local personal profile preference" },
                { name: "Department Scope", desc: "Allows Admin to save theme for entire Marketing/Sales groups" },
                { name: "Organization Default", desc: "Super Admin: Force default appearance across all active tenants" }
              ].map(opt => (
                <div className="col-md-4" key={opt.name}>
                  <div 
                    className={`ux4g-card ux4g-card-outline p-3 cursor-pointer h-100`}
                    style={{ 
                      borderRadius: "12px", 
                      border: appearance.policy === opt.name ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                      background: appearance.policy === opt.name ? "var(--color-primary-soft)" : "transparent"
                    }}
                    onClick={() => updateAppearance({ policy: opt.name })}
                  >
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", marginBottom: "4px" }}>{opt.name}</div>
                    <div className="text-muted" style={{ fontSize: "0.75rem", lineHeight: 1.3 }}>{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-between align-items-center border-top pt-4 mb-5">
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>Export & Share UI Configurations</div>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>Export custom setup as JSON files or import themes created by other organization members.</div>
            </div>
            <div className="d-flex gap-2">
              <button className="ux4g-btn-outline-neutral ux4g-btn-md">
                <FiDownload className="me-2" /> Export Theme
              </button>
              <button className="ux4g-btn-outline-neutral ux4g-btn-md">
                <FiUpload className="me-2" /> Import JSON
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (Live Preview Panel) */}
        <div className="col-lg-4">
          <div className="ux4g-card ux4g-card-outline p-4" style={{ borderRadius: "16px", position: "sticky", top: "20px" }}>
            <h6 className="mb-4 d-flex align-items-center text-uppercase text-muted" style={{ fontSize: "0.8rem", letterSpacing: "0.5px", fontWeight: 600 }}>
              <FiLayout className="me-2 text-primary" /> CENTRALIZED LIVE PREVIEW PANEL
            </h6>
            
            <div className="rounded overflow-hidden mb-4" style={{ border: "1px solid var(--color-border)", background: "var(--color-surface-alt)" }}>
              {/* Mock Header */}
              <div className="d-flex justify-content-between align-items-center px-3 py-2" style={{ background: "#0F172A", color: "white" }}>
                <div className="d-flex align-items-center gap-2">
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#3B82F6" }}></div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.5px" }}>AIO CRM</span>
                </div>
                <div className="rounded px-3 py-1" style={{ background: "rgba(255,255,255,0.1)", fontSize: "0.7rem", color: "rgba(255,255,255,0.7)" }}>Search Palette...</div>
              </div>
              
              <div className="p-3">
                {/* Mock Card */}
                <div className="bg-white rounded p-3 shadow-sm mb-3" style={{ border: "1px solid var(--color-border)" }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="ux4g-badge-dot-primary" style={{ fontSize: "0.7rem" }}>Active</span>
                  </div>
                  <div className="d-flex gap-3 mt-3">
                    <div className="rounded" style={{ width: 80, height: 60, background: "#E5EEFF" }}></div>
                    <div className="flex-grow-1">
                      <div className="text-muted mb-1" style={{ fontSize: "0.65rem", textTransform: "uppercase" }}>Mock Analytics Card</div>
                      <div className="d-flex justify-content-between align-items-end">
                        <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0052CC" }}>₹45,900</div>
                        <span className="ux4g-badge-dot-success" style={{ fontSize: "0.65rem", padding: "2px 6px" }}>+12%</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <div className="rounded flex-grow-1 text-center text-white py-1" style={{ background: "#0052CC", fontSize: "0.7rem" }}>Primary Button</div>
                    <div className="rounded flex-grow-1 text-center py-1" style={{ border: "1px solid #0052CC", color: "#0052CC", fontSize: "0.7rem" }}>Secondary</div>
                  </div>
                </div>

                {/* Mock Table Header */}
                <div className="rounded px-3 py-2 mb-2 text-uppercase text-muted" style={{ background: "#EFF4FF", fontSize: "0.65rem", fontWeight: 700 }}>
                  Table Header Row
                </div>
                <div className="px-3 pb-3 pt-1 text-muted" style={{ fontSize: "0.75rem" }}>
                  Fulfillment flow item
                </div>

                {/* Badges Preview */}
                <div className="d-flex justify-content-between px-2 pt-2 border-top">
                  <span className="rounded px-2 text-white text-center" style={{ background: "#10B981", fontSize: "0.65rem", width: "23%" }}>Success</span>
                  <span className="rounded px-2 text-white text-center" style={{ background: "#F59E0B", fontSize: "0.65rem", width: "23%" }}>Warning</span>
                  <span className="rounded px-2 text-white text-center" style={{ background: "#EF4444", fontSize: "0.65rem", width: "23%" }}>Danger</span>
                  <span className="rounded px-2 text-white text-center" style={{ background: "#0EA5E9", fontSize: "0.65rem", width: "23%" }}>Info</span>
                </div>
              </div>
            </div>

            <h6 className="mb-2 d-flex align-items-center text-primary" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              <FiCheckCircle className="me-2" /> Design Token Audit
            </h6>
            <p className="text-muted m-0" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
              Updating tokens above triggers dynamic injection of styles. All active CRM modules (E-Commerce, Omnichannel Hub, Support, Admin Settings) will adapt reactively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
