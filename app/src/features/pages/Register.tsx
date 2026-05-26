import { useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import "./Register.css";

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={(values) => {
        register(values);
        navigate("/");
      }}
    >
      {() => (
        <>
          <Card className="auth-card">
            <Form>
              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <Field
                  id="username"
                  name="username"
                  placeholder="Jane Smith"
                  as={Input}
                />
              </div>
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
                Register
              </Button>
            </Form>
          </Card>
          <div className="auth-footer">
            Already have one?{" "}
            <span className="auth-footer-action" onClick={() => navigate("/auth/login")}>Sign in</span>
          </div>
        </>
      )}
    </Formik>
  );
}

export default Register;
