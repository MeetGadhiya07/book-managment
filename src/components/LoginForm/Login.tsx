import React from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

import { useAuthContext } from "../../context/context";
import "./login.scss";
import { Toaster } from "../../shared/Toaster";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, userDetails, authToken } = useAuthContext();

  const initialValues: LoginFormValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    if (values.email === userDetails?.email) {
      localStorage.setItem("authToken", authToken || "");
      localStorage.setItem("username", userDetails?.username || "");
      localStorage.setItem("email", userDetails?.email || "");

      setIsAuthenticated(true);
      Toaster("success", `Welcome, ${userDetails?.username}!`);
      navigate("/");
    } else {
      Toaster("error", `Invalid email or password`);
    }

    actions.setSubmitting(false);
  };

  return (
    <section className="login-container">
      <div className="main padding--25">
        <p className="login-title text--center">Sign in</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="login-content">
              <div className="form-group">
                <Field
                  className={`un ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <Field
                  className={`pass ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="flex justify-content--center">
                <button
                  className="login-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign in
                </button>
              </div>
              <div className="flex justify-content--center mt--10">
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Login;
