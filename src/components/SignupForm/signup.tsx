import React from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import "./signup.scss";
import { useAuthContext } from "../../context/context";
import { useState } from "react";
import { Toaster } from "../../shared/Toaster";

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const { setAuthToken, setUserDetails, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialValues: SignupFormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const generateToken = () => {
    return Math.random().toString(36).substr(2);
  };

  const handleSubmit = async (
    values: SignupFormValues,
    actions: FormikHelpers<SignupFormValues>
  ) => {
    try {
      setIsSubmitting(true);
      const token = generateToken();
      setAuthToken(token);
      setUserDetails({
        username: values.username,
        email: values.email,
        password: values.confirmPassword,
      });

      setIsAuthenticated(true);
      Toaster("success", `Signup successful! Welcome, ${values.username}!`);
      navigate("/login");
    } catch (err) {
      setError("An error occurred during signup. Please try again.");
      Toaster("error", `An error occurred during signup. Please try again.`);
    } finally {
      actions.setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  return (
    <section className="signup-container">
      <div className="main padding--25">
        <p className="login-title text--center">Sign up</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="login-content">
              {error && <div className="error-message">{error}</div>}
              <div className="form-group">
                <Field
                  className={`un ${
                    touched.username && errors.username ? "is-invalid" : ""
                  }`}
                  name="username"
                  type="text"
                  placeholder="Username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>
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
              <div className="form-group">
                <Field
                  className={`pass ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "is-invalid"
                      : ""
                  }`}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
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
                  {isSubmitting ? "Signing up..." : "Sign up"}
                </button>
              </div>
              <div className="flex justify-content--center mt--10">
                <p>
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SignUp;
