import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Tag from "../components/Tag";
import LogsTable from "../features/LogsTable";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "../utils/constants";
import "./Logs.css";

function Logs () {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(LOGS.length / LOGS_PER_PAGE);
  const sliced = LOGS.slice((page - 1) * LOGS_PER_PAGE, page * LOGS_PER_PAGE);

  return (
    <div>
      {/* Header */}
      <div className="logs-header">
        <span onClick={onBack} className="logs-back">← Back</span>
        <span className="logs-divider">|</span>
        <h2 className="logs-title">{app.name}</h2>
        <Tag label={app.status}
          className="logs-tag"
          style={{ ...(STATUS_MAP[app.status] || STATUS_MAP.Active), border: "none" }} />
      </div>

      {/* Stat cards + pie */}
      <div className="logs-grid">
        {[
          { label: "Total Logs",  value: app.logs.toLocaleString() },
          { label: "Errors",      value: app.errors, danger: app.errors > 0 },
          { label: "Warnings",    value: app.warns },
        ].map(({ label, value, danger }) => (
          <Card key={label} className="logs-stat-card">
            <div className="logs-stat-label">{label}</div>
            <div className="logs-stat-value" style={{ color: danger ? C.danger : C.text }}>{value}</div>
          </Card>
        ))}

        {/* Pie chart */}
        <Card className="logs-pie-card">
          <div className="logs-pie-label">Log Breakdown</div>
          <ResponsiveContainer width="100%" height={110}>
            <PieChart>
              <Pie data={pieData(app)} dataKey="value" innerRadius={28} outerRadius={48} paddingAngle={2}>
                {pieData(app).map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 12, border: `0.5px solid ${C.border}`, borderRadius: 8, background: C.surface }}
                formatter={(v, n) => [v.toLocaleString(), n]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="logs-pie-legend">
            {["Info", "Warn", "Error"].map((l, i) => (
              <div key={l} className="logs-pie-legend-item">
                <div className="logs-pie-legend-swatch" style={{ background: PIE_COLORS[i] }} />
                {l}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Logs table */}
      <Card className="logs-table-card">
        <div className="logs-table-header">
          <div className="logs-table-title">Event Logs</div>
          <div className="logs-table-count">
            Showing {(page - 1) * LOGS_PER_PAGE + 1}–{Math.min(page * LOGS_PER_PAGE, LOGS.length)} of {LOGS.length} entries
          </div>
        </div>
        
        <LogsTable />

        {/* Pagination */}
        <div className="logs-pagination">
          <div className="logs-page-info">Page {page} of {totalPages}</div>
          <div className="logs-pagination-controls">
            <Button variant="ghost" onClick={() => setPage(p => Math.max(1, p - 1))} className="logs-page-button">
              ← Prev
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} className={`logs-page-number ${n === page ? "active" : ""}`}>{n}</button>
            ))}
            <Button variant="ghost" onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="logs-page-button">
              Next →
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Logs
