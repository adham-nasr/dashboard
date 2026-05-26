import { useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import "./Login.css";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        console.log("Values")
        console.log(values)
        login(values);
        navigate("/");
      }}
    >
      {() => (
        <>
          <Card className="auth-card">
            <Form>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  as={Input}
                />
              </div>
              <div className="form-group form-group--bottom">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  as={Input}
                />
              </div>
              <Button type="submit" className="full-width-button">
                Sign In
              </Button>
            </Form>
          </Card>
          <div className="auth-footer">
            No account?{" "}
            <span className="auth-footer-action" onClick={() => navigate("/auth/register")}>Register</span>
          </div>
        </>
      )}
    </Formik>
  );
}

export default Login;
