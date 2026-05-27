import LevelBadge from "../components/LevelBadge"
import Table from "../components/Table"
import { C } from "../utils/constants";
import type { Logs } from "../utils/types";

function LogsTable({logs}:{logs:Logs}){
    const data = logs;
    return(
        <Table columns={["Message", "Level", "Count", "First Occurrence", "Last Occurrence"]}>
          <tbody>
            {data.map((log, i) => (
              <tr key={log._id} style={{
                borderBottom: `0.5px solid ${C.border}`,
              }}>
                <td style={{ padding: "13px 20px", color: C.text, maxWidth: 260 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 12 }}>{log.message}</span>
                </td>
                <td><LevelBadge level={log.level} /></td>
                <td style={{  color: C.text, fontWeight: 500 }}>{log.count?.toLocaleString() || 0}</td>
                <td style={{  color: C.muted, whiteSpace: "nowrap" }}>{log.createdAt.toLocaleString()}</td>
                {/* <td style={{  color: C.muted, whiteSpace: "nowrap" }}>{log.last}</td> */}
              </tr>
            ))}
          </tbody>
        </Table>
    )
}

export default LogsTable