import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../components/Card";
import { C, PIE_COLORS } from "../utils/constants";
import type { LogsStats } from "../utils/types";

function PieStat({logStats}:{logStats:LogsStats}){
    const pieData = [
      { name: "Info",  value: logStats.logs.length - logStats.errorCount - logStats.warnCount },
      { name: "Warn",  value: logStats.warnCount },
      { name: "Error", value: logStats.errorCount },
    ];


    return (
        <Card className="logs-pie-card">
          <div className="logs-pie-label">Log Breakdown</div>
          <ResponsiveContainer width="100%" height={110}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={28} outerRadius={48} paddingAngle={2}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 12, border: `0.5px solid ${C.border}`, borderRadius: 8, background: C.surface }}
                formatter={(v, n) => [v?.toLocaleString(), n]}
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
    )
}

export default PieStat