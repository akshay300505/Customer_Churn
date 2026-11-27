import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    isAuthenticated,
    loading,
    error,
    clearError,
  } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [formErrors, setFormErrors] =
    useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [
    isAuthenticated,
    navigate,
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

    const name =
      formData.name.trim();

    const email =
      formData.email.trim();

    const company =
      formData.company.trim();

    const password =
      formData.password;

    const confirmPassword =
      formData.confirmPassword;

    if (!name) {
      errors.name =
        "Full name is required.";
    } else if (name.length < 2) {
      errors.name =
        "Name must contain at least 2 characters.";
    }

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

    if (!company) {
      errors.company =
        "Company name is required.";
    }

    if (!password) {
      errors.password =
        "Password is required.";
    } else if (password.length < 8) {
      errors.password =
        "Password must contain at least 8 characters.";
    }

    if (!confirmPassword) {
      errors.confirmPassword =
        "Please confirm your password.";
    } else if (
      password !== confirmPassword
    ) {
      errors.confirmPassword =
        "Passwords do not match.";
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms =
        "You must accept the terms to continue.";
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
      const result = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        password: formData.password,
      });

      if (
        result === false ||
        result?.success === false
      ) {
        return;
      }

      navigate("/dashboard", {
        replace: true,
      });
    } catch (submitError) {
      console.error(
        "Registration error:",
        submitError
      );
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-container auth-register-container">
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
              START YOUR JOURNEY
            </span>

            <h2>
              Turn customer data
              <br />
              into smarter decisions.
            </h2>

            <p>
              Build a data-driven
              understanding of your
              customers and take action
              before churn happens.
            </p>
          </div>

          <div className="auth-feature-list">
            <div className="auth-feature">
              <span className="auth-feature-icon">
                ✓
              </span>

              <div>
                <strong>
                  Centralized Analytics
                </strong>

                <p>
                  Bring your customer
                  information together in one
                  place.
                </p>
              </div>
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon">
                ✓
              </span>

              <div>
                <strong>
                  Intelligent Predictions
                </strong>

                <p>
                  Discover customers who may
                  be at risk of churn.
                </p>
              </div>
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon">
                ✓
              </span>

              <div>
                <strong>
                  Actionable Guidance
                </strong>

                <p>
                  Move from prediction to
                  meaningful retention action.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-wrapper auth-register-form-wrapper">
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
                GET STARTED
              </span>

              <h2>
                Create your account
              </h2>

              <p>
                Set up your workspace and
                start analyzing customer
                churn.
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
                    : "Unable to create your account. Please try again."}
                </span>
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="auth-field">
                <label htmlFor="register-name">
                  Full Name
                </label>

                <div
                  className={`auth-input-wrapper ${
                    formErrors.name
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
                      <circle
                        cx="12"
                        cy="8"
                        r="3.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M5 20C5.7 16.8 8.25 15 12 15C15.75 15 18.3 16.8 19 20"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  <input
                    id="register-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                    disabled={loading}
                    aria-invalid={
                      Boolean(
                        formErrors.name
                      )
                    }
                  />
                </div>

                {formErrors.name && (
                  <span className="auth-field-error">
                    {formErrors.name}
                  </span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="register-email">
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
                    id="register-email"
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
                  />
                </div>

                {formErrors.email && (
                  <span className="auth-field-error">
                    {formErrors.email}
                  </span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="register-company">
                  Company Name
                </label>

                <div
                  className={`auth-input-wrapper ${
                    formErrors.company
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
                        d="M4 20V6.5C4 5.67 4.67 5 5.5 5H13.5C14.33 5 15 5.67 15 6.5V20"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M15 10.5H18.5C19.33 10.5 20 11.17 20 12V20"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M8 8H11M8 11.5H11M8 15H11M17 14H18M17 17H18M3 20H21"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  <input
                    id="register-company"
                    name="company"
                    type="text"
                    value={
                      formData.company
                    }
                    onChange={handleChange}
                    placeholder="Your company name"
                    autoComplete="organization"
                    disabled={loading}
                    aria-invalid={
                      Boolean(
                        formErrors.company
                      )
                    }
                  />
                </div>

                {formErrors.company && (
                  <span className="auth-field-error">
                    {formErrors.company}
                  </span>
                )}
              </div>

              <div className="auth-two-column">
                <div className="auth-field">
                  <label htmlFor="register-password">
                    Password
                  </label>

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
                      id="register-password"
                      name="password"
                      type="password"
                      value={
                        formData.password
                      }
                      onChange={handleChange}
                      placeholder="Password"
                      autoComplete="new-password"
                      disabled={loading}
                      aria-invalid={
                        Boolean(
                          formErrors.password
                        )
                      }
                    />
                  </div>

                  {formErrors.password && (
                    <span className="auth-field-error">
                      {
                        formErrors.password
                      }
                    </span>
                  )}
                </div>

                <div className="auth-field">
                  <label htmlFor="register-confirm-password">
                    Confirm Password
                  </label>

                  <div
                    className={`auth-input-wrapper ${
                      formErrors.confirmPassword
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
                          d="M6 11V8.5C6 5.46 8.46 3 11.5 3C14.54 3 17 5.46 17 8.5V11"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />

                        <rect
                          x="4"
                          y="11"
                          width="16"
                          height="10"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />

                        <path
                          d="M9.5 16L11.5 18L15 14.5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <input
                      id="register-confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={
                        formData.confirmPassword
                      }
                      onChange={handleChange}
                      placeholder="Confirm"
                      autoComplete="new-password"
                      disabled={loading}
                      aria-invalid={
                        Boolean(
                          formErrors.confirmPassword
                        )
                      }
                    />
                  </div>

                  {formErrors.confirmPassword && (
                    <span className="auth-field-error">
                      {
                        formErrors.confirmPassword
                      }
                    </span>
                  )}
                </div>
              </div>

              <label
                className={`auth-checkbox auth-terms-checkbox ${
                  formErrors.acceptTerms
                    ? "has-error"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={
                    formData.acceptTerms
                  }
                  onChange={handleChange}
                  disabled={loading}
                />

                <span className="auth-checkbox-mark" />

                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    className="auth-inline-button"
                    onClick={() =>
                      window.alert(
                        "Terms and conditions will be configured for the production version."
                      )
                    }
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="auth-inline-button"
                    onClick={() =>
                      window.alert(
                        "Privacy policy will be configured for the production version."
                      )
                    }
                  >
                    Privacy Policy
                  </button>
                  .
                </span>
              </label>

              {formErrors.acceptTerms && (
                <span className="auth-field-error auth-terms-error">
                  {
                    formErrors.acceptTerms
                  }
                </span>
              )}

              <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="auth-spinner" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="auth-submit-arrow">
                      →
                    </span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-register-link">
              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign in
              </Link>
            </div>

            <p className="auth-security-note">
              Your account information is
              protected and handled securely.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;