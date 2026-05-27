import { useNavigate } from "react-router";
import Table from "../components/Table";
import Tag from "../components/Tag";
import { APPS, C, STATUS_MAP } from "../utils/constants";
import type { Applications } from "../utils/types";
import { useAuth } from "../hooks/useAuth";
import {  deleteApplicationByName } from "../api/application";
import {  useMutation, useQueryClient } from "@tanstack/react-query";

function AppsTable({data}:{data:Applications}){
    
    const {user} = useAuth()

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: async (args:{name:string,apiKey:string})=>{
          deleteApplicationByName(args.name,args.apiKey)
        },
        onSuccess: ()=>{
          queryClient.invalidateQueries({queryKey:["applications"]})
        }
    })

    const rowClickHandler= (name:string)=>{
      navigate("/logs/"+name)
    }


    const deleteHandler = (e:Event,name:string) => {
      e.preventDefault()
      e.stopPropagation()
      deleteMutation.mutate({name,apiKey:user!.apiKey})
    }
  
    const columns = ["#", "Name", "Status", "Total Logs", ""];
    return(
    <Table columns={columns}>
        <tbody>
            {data.map((app, idx) => {
              const st = STATUS_MAP["Active"] || STATUS_MAP.Active;
              return (
                <tr key={app.name}
                  onClick={() => {rowClickHandler(app.name)}}
                  style={{ borderBottom: `0.5px solid ${C.border}`, cursor: "pointer" }}>
                  <td style={{  color: C.hint }}>{idx + 1}</td>
                  <td style={{  fontWeight: 500, color: C.text }}>{app.name}</td>
                  <td style={{ }}>
                    <Tag label="Active" style={{ background: st.bg, color: st.color, border: "none" }} />
                  </td>
                  <td style={{  color: C.text }}>{app.logCount}</td>
                  <td style={{  textAlign: "right" }}>
                    <span onClick={(e)=>{
                      console.log("CLICKED SPAN")
                      deleteHandler(e,app.name) }} style={{
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