import LevelBadge from "../components/LevelBadge"
import Table from "../components/Table"
import { C } from "../utils/constants";

function LogsTable(){
    const data = [];
    return(
        <Table columns={["Message", "Level", "Count", "First Occurrence", "Last Occurrence"]}>
          <tbody>
            {data.map((log, i) => (
              <tr key={log.id} style={{
                borderBottom: i < sliced.length - 1 ? `0.5px solid ${C.border}` : "none",
              }}>
                <td style={{ padding: "13px 20px", color: C.text, maxWidth: 260 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 12 }}>{log.message}</span>
                </td>
                <td><LevelBadge level={log.level} /></td>
                <td style={{  color: C.text, fontWeight: 500 }}>{log.count.toLocaleString()}</td>
                <td style={{  color: C.muted, whiteSpace: "nowrap" }}>{log.first}</td>
                <td style={{  color: C.muted, whiteSpace: "nowrap" }}>{log.last}</td>
              </tr>
            ))}
          </tbody>
        </Table>
    )
}

export default LogsTable