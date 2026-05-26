import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import AppsTable from "../features/AppsTable";
import { APPS , C, tempapiKey } from "../utils/constants";
import Modal from "../components/Modal";
import "./Home.css"
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getApplications } from "../api/application";

function Home () {

  const [showCreate, setShowCreate] = useState(false);

  const {data,isLoading, error} = useQuery({
    queryKey: ['applications'],
    queryFn: ()=> getApplications(tempapiKey)
  })

  if(isLoading)
    return <ClipLoader color={C.accent} size={100} loading={isLoading} />
  
  if(error)
    return <div>{error.message}</div>

  return (
    <div className="home-page">
      <div className="home-header">
        <div>
          <h2 className="home-title">Applications</h2>
          <p className="home-meta">{data.length} apps connected</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ New Application</Button>
      </div>

      {/* Create modal
      {showCreate && 
        <Modal>
            <Card style={{ width: 400, padding: "28px 28px" }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 20 }}>New Application</div>
                <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>App Name</label>
                <Input placeholder="e.g. Billing Service" />
                </div>
                <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>Environment</label>
                <select style={{
                    width: "100%", height: 40, padding: "0 14px",
                    fontSize: 14, background: C.bg,
                    border: `0.5px solid ${C.borderMd}`, borderRadius: 8,
                    fontFamily: "inherit", color: C.text, outline: "none",
                }}>
                    <option>Production</option>
                    <option>Staging</option>
                    <option>Development</option>
                </select>
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                    <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
                    <Button onClick={() => setShowCreate(false)}>Create</Button>
                </div>
            </Card>
        </Modal>
      } */}

      {/* Table */}
      <AppsTable data={data} />
    </div>
  );
};

export default Home