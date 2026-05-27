import { useState } from "react";
import { Formik, Form, Field } from "formik";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import AppsTable from "../features/AppsTable";
import { C } from "../utils/constants";
import Modal from "../components/Modal";
import "./Home.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { createApplication, getApplications } from "../api/application";
import { useAuth } from "../hooks/useAuth";

function Home () {

  const [showCreate, setShowCreate] = useState(false);

  const {user } = useAuth()

  const queryClient = useQueryClient()

  const {data,isLoading, error} = useQuery({
    queryKey: ['applications'],
    queryFn: ()=> getApplications(user!.apiKey)
  })

  const postMutaution = useMutation({
    mutationFn: async(args:{name:string})=>{
      createApplication(args.name,user?.apiKey || "")
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["applications"]})
    }
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
          <p className="home-meta">{data!.length} apps connected</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ New Application</Button>
      </div>

      {showCreate && (
        <Modal>
          <Card className="modal-card">
            <Formik
              initialValues={{ name: "" }}
              onSubmit={(values) => {
                console.log("Creating application:", values);
                postMutaution.mutate(values)
                setShowCreate(false);
              }}
            >
              {() => (
                <Form>
                  <div className="modal-title">New Application</div>
                  <div className="modal-field">
                    <label className="form-label" htmlFor="name">
                      App Name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="e.g. Billing Service"
                      as={Input}
                    />
                  </div>
                  <div className="modal-actions">
                    <Button variant="ghost" onClick={() => setShowCreate(false)} type="button">
                      Cancel
                    </Button>
                    <Button type="submit">Create</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </Modal>
      )}

      {/* Table */}
      {data && data.length > 0 ?
  
        <AppsTable data={data} />
        :
        <h2>No Applications yet ...</h2>
      }
      
    </div>
  );
};

export default Home