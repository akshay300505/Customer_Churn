import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    login,
    isAuthenticated,
    loading,
    error,
    clearError,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const redirectPath =
    location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, {
        replace: true,
      });
    }
  }, [
    isAuthenticated,
    navigate,
    redirectPath,
  ]);

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setFormErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    if (error && clearError) {
      clearError();
    }
  };

  const validateForm = () => {
    const errors = {};

    const email =
      formData.email.trim();

    const password =
      formData.password;

    if (!email) {
      errors.email =
        "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      errors.email =
        "Enter a valid email address.";
    }

    if (!password) {
      errors.password =
        "Password is required.";
    }

    setFormErrors(errors);

    return (
      Object.keys(errors).length === 0
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await login(
        formData.email.trim(),
        formData.password,
        formData.rememberMe
      );

      if (
        result === false ||
        result?.success === false
      ) {
        return;
      }

      navigate(redirectPath, {
        replace: true,
      });
    } catch (submitError) {
      console.error(
        "Login error:",
        submitError
      );
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-container">
        <div className="auth-brand-panel">
          <div className="auth-brand">
            <div className="auth-brand-logo">
              CG
            </div>

            <div>
              <h1>
                Customer Churn
                Guidance
              </h1>

              <span>
                Intelligence in Customer
                Retention
              </span>
            </div>
          </div>

          <div className="auth-brand-content">
            <span className="auth-eyebrow">
              AI-POWERED ANALYTICS
            </span>

            <h2>
              Understand your
              customers.
              <br />
              Prevent churn.
            </h2>

            <p>
              Transform customer data into
              actionable churn insights and
              make smarter retention
              decisions.
            </p>
          </div>

          <div className="auth-feature-list">
            <div className="auth-feature">
              <span className="auth-feature-icon">
                ✓
              </span>

              <div>
                <strong>
                  Churn Prediction
                </strong>

                <p>
                  Identify customers who
                  are most likely to leave.
                </p>
              </div>
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon">
                ✓
              </span>

              <div>
                <strong>
                  Explainable AI
                </strong>

                <p>
                  Understand the factors
                  driving customer churn.
                </p>
              </div>
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon">
                ✓
              </span>

              <div>
                <strong>
                  Retention Guidance
                </strong>

                <p>
                  Turn predictions into
                  practical actions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-mobile-brand">
              <div className="auth-brand-logo">
                CG
              </div>

              <span>
                Customer Churn
                Guidance
              </span>
            </div>

            <div className="auth-form-header">
              <span className="auth-form-kicker">
                WELCOME BACK
              </span>

              <h2>
                Sign in to your account
              </h2>

              <p>
                Access your customer churn
                analytics dashboard.
              </p>
            </div>

            {error && (
              <div
                className="auth-alert auth-alert-error"
                role="alert"
              >
                <span className="auth-alert-icon">
                  !
                </span>

                <span>
                  {typeof error ===
                  "string"
                    ? error
                    : "Unable to sign in. Please check your credentials."}
                </span>
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="auth-field">
                <label htmlFor="login-email">
                  Email Address
                </label>

                <div
                  className={`auth-input-wrapper ${
                    formErrors.email
                      ? "has-error"
                      : ""
                  }`}
                >
                  <span className="auth-input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 6.5C4 5.67 4.67 5 5.5 5H18.5C19.33 5 20 5.67 20 6.5V17.5C20 18.33 19.33 19 18.5 19H5.5C4.67 19 4 18.33 4 17.5V6.5Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M5 7L12 12.5L19 7"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    autoComplete="email"
                    disabled={loading}
                    aria-invalid={
                      Boolean(
                        formErrors.email
                      )
                    }
                    aria-describedby={
                      formErrors.email
                        ? "login-email-error"
                        : undefined
                    }
                  />
                </div>

                {formErrors.email && (
                  <span
                    id="login-email-error"
                    className="auth-field-error"
                  >
                    {formErrors.email}
                  </span>
                )}
              </div>

              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="login-password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="auth-forgot-button"
                    onClick={() => {
                      window.alert(
                        "Password recovery will be available when the authentication backend is connected."
                      );
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <div
                  className={`auth-input-wrapper ${
                    formErrors.password
                      ? "has-error"
                      : ""
                  }`}
                >
                  <span className="auth-input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect
                        x="5"
                        y="10"
                        width="14"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M8 10V7.5C8 5.57 9.57 4 11.5 4H12.5C14.43 4 16 5.57 16 7.5V10"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    aria-invalid={
                      Boolean(
                        formErrors.password
                      )
                    }
                    aria-describedby={
                      formErrors.password
                        ? "login-password-error"
                        : undefined
                    }
                  />
                </div>

                {formErrors.password && (
                  <span
                    id="login-password-error"
                    className="auth-field-error"
                  >
                    {formErrors.password}
                  </span>
                )}
              </div>

              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={
                    formData.rememberMe
                  }
                  onChange={handleChange}
                  disabled={loading}
                />

                <span className="auth-checkbox-mark" />

                <span>
                  Remember me
                </span>
              </label>

              <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="auth-spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="auth-submit-arrow">
                      →
                    </span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span />
              <span>OR</span>
              <span />
            </div>

            <div className="auth-register-link">
              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create an account
              </Link>
            </div>

            <p className="auth-security-note">
              Your customer data is protected
              and handled securely.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;