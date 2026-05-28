import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Tag from "../components/Tag";
import LogsTable from "../features/LogsTable";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { C, STATUS_MAP } from "../utils/constants";
import "./Logs.css";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getLogsByApplicationName } from "../api/application";
import { useAuth } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { getLogsStats } from "../utils/helpers";
import PieStat from "../features/PieStat";
import Search from "../components/Search";


function Logs () {

  const [page, setPage] = useState(1);
  const LOGS_PER_PAGE = 5;

  const [filterParams,setFilterParams ]= useState<Record<string,string>>({})

  const navigate = useNavigate()

  const {user} = useAuth()

  const params = useParams()

  const appName = params.name || ""

  console.log("parmas")
  console.log(params)
  console.log("filterParams = ")
  console.log(filterParams)
  const {data,error,isLoading} = useQuery({
    queryKey:["logs",appName,filterParams,page],
    queryFn:()=>getLogsByApplicationName(appName,user!.apiKey,
      {...filterParams,
        limit:LOGS_PER_PAGE.toString(),
        offset:((page-1)*LOGS_PER_PAGE).toString()
      }
    )
  })

  const backHandler = ()=>{
    navigate('/');
  }
  
  if(error)
  {
    console.log("ENTERED >>>>> ")
        return <div>{error?.message}</div>

  }

  const logsStats = data?.stats
  const logs = data?.logs || []


  const totalPages = logsStats?.totalCount? Math.ceil(logsStats.totalCount / LOGS_PER_PAGE) : 0;
  // const sliced = logsStats.logs.slice((page - 1) * LOGS_PER_PAGE, page * LOGS_PER_PAGE);

  console.log("LOG STATS   .  .. ")
  console.log(logsStats)

  return (
    <div>
      {/* Header */}
      <div className="logs-header">
        <span onClick={backHandler} className="logs-back">← Back</span>
        <span className="logs-divider">|</span>
        <h2 className="logs-title">{appName}</h2>
        {/* <Tag label={app.status}
          className="logs-tag"
          style={{ ...(STATUS_MAP[app.status] || STATUS_MAP.Active), border: "none" }} /> */}
          
      </div>

      {/* Stat cards + pie */}
      <div className="logs-grid">
        {[
          { label: "Total Logs",  value: logsStats?.totalCount },
          { label: "Errors",      value: logsStats?.errorCount, danger: logsStats?.errorCount || false },
          { label: "Warnings",    value: logsStats?.warnCount },
        ].map(({ label, value, danger }) => (
          <Card key={label} className="logs-stat-card">
            <div className="logs-stat-label">{label}</div>
            <div className="logs-stat-value" style={{ color: danger ? C.danger : C.text }}>{value}</div>
          </Card>
        ))}
        {logsStats && <PieStat logStats={logsStats}/> }
      </div>
        <Search setFilterParams={setFilterParams} setPage={setPage}/>

      {/* Logs table */}
      {isLoading &&  <ClipLoader color={C.accent} size={100} loading={isLoading}  />}
      <Card className="logs-table-card"> 
        <LogsTable logs={logs} />

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
