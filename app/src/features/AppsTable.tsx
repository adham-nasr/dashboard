import { useNavigate } from "react-router";
import Table from "../components/Table";
import Tag from "../components/Tag";
import { APPS, C, STATUS_MAP } from "../utils/constants";
import type { Applications } from "../utils/types";

function AppsTable({data}:{data:Applications}){

    const navigate = useNavigate()
    const rowClickHandler= (id:string)=>{
      navigate("/logs/"+id)
    }
  
    const columns = ["#", "Name", "Status", "Total Logs", "Errors", ""];
    return(
    <Table columns={columns}>
        <tbody>
            {data.map((app, idx) => {
              const st = STATUS_MAP["Active"] || STATUS_MAP.Active;
              return (
                <tr key={app._id}
                  onClick={() => {rowClickHandler(app._id)}}
                  style={{ borderBottom: `0.5px solid ${C.border}`, cursor: "pointer" }}>
                  <td style={{  color: C.hint }}>{idx + 1}</td>
                  <td style={{  fontWeight: 500, color: C.text }}>{app.name}</td>
                  <td style={{ }}>
                    <Tag label="Active" style={{ background: st.bg, color: st.color, border: "none" }} />
                  </td>
                  <td style={{  color: C.text }}>{app.logs?.toLocaleString()}</td>
                  <td>
                    <span style={{ color: app.errors > 0 ? C.danger : C.success, fontWeight: 500 }}>
                      {app.errors}
                    </span>
                  </td>
                  <td style={{  textAlign: "right" }}>
                    <span onClick={(e) => { e.stopPropagation(); }} style={{
                      fontSize: 12, color: C.danger, cursor: "pointer", padding: "4px 10px",
                      border: `0.5px solid var(--dangerSoft)`, borderRadius: 6,
                    }}>Delete</span>
                  </td>
                </tr>
              );
            })}
        </tbody>
    </Table>
    )
}

export default AppsTable;