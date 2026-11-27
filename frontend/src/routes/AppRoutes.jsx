import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

/* =========================================================
   DASHBOARD
========================================================= */
import Dashboard from "../pages/Dashboard/Dashboard";
import Overview from "../pages/Dashboard/Overview";

/* =========================================================
   AUTHENTICATION
========================================================= */
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

/* =========================================================
   COMPANIES
========================================================= */
import Companies from "../pages/Companies/Companies";
import AddCompany from "../pages/Companies/AddCompany";
import CompanyDetails from "../pages/Companies/CompanyDetails";

/* =========================================================
   CUSTOMERS
========================================================= */
import Customers from "../pages/Customers/Customers";
import CustomerDetails from "../pages/Customers/CustomerDetails";

/* =========================================================
   ANALYTICS
========================================================= */
import Analytics from "../pages/Analytics/Analytics";
import CustomerAnalytics from "../pages/Analytics/CustomerAnalytics";

/* =========================================================
   DATA MANAGEMENT
========================================================= */
import DataUpload from "../pages/Data/DataUpload";
import DataHistory from "../pages/Data/DataHistory";
import DataValidation from "../pages/Data/DataValidation";

/* =========================================================
   EXPLAINABILITY
========================================================= */
import Explainability from "../pages/Explainability/Explainability";

/* =========================================================
   GUIDANCE
========================================================= */
import Guidance from "../pages/Guidance/Guidance";
import RecommendationDetails from "../pages/Guidance/RecommendationDetails";

/* =========================================================
   PREDICTIONS
========================================================= */
import Predictions from "../pages/Predictions/Predictions";
import PredictionDetails from "../pages/Predictions/PredictionDetails";

/* =========================================================
   REPORTS
========================================================= */
import Reports from "../pages/Reports/Reports";

/* =========================================================
   SETTINGS
========================================================= */
import Settings from "../pages/Settings/Settings";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            ROOT
        ===================================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        {/* =====================================================
            AUTHENTICATION
        ===================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =====================================================
            DASHBOARD
        ===================================================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/dashboard/overview"
          element={<Overview />}
        />


        {/* =====================================================
            COMPANIES
        ===================================================== */}

        <Route
          path="/companies"
          element={<Companies />}
        />

        <Route
          path="/companies/add"
          element={<AddCompany />}
        />

        <Route
          path="/companies/:id"
          element={<CompanyDetails />}
        />


        {/* =====================================================
            CUSTOMERS
        ===================================================== */}

        <Route
          path="/customers"
          element={<Customers />}
        />

        {/* Add Customer */}
        <Route
          path="/customers/add"
          element={<Customers />}
        />

        {/* High Risk Customers */}
        <Route
          path="/customers/high-risk"
          element={<Customers />}
        />

        {/* Customer Details */}
        <Route
          path="/customers/:id"
          element={<CustomerDetails />}
        />


        {/* =====================================================
            ANALYTICS
        ===================================================== */}

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/analytics/customers"
          element={<CustomerAnalytics />}
        />


        {/* =====================================================
            DATA MANAGEMENT
        ===================================================== */}

        <Route
          path="/data/upload"
          element={<DataUpload />}
        />

        <Route
          path="/data/history"
          element={<DataHistory />}
        />

        <Route
          path="/data/validation"
          element={<DataValidation />}
        />


        {/* =====================================================
            DATA UPLOAD SIDEBAR ALIAS
        ===================================================== */}

        <Route
          path="/data-upload"
          element={
            <Navigate
              to="/data/upload"
              replace
            />
          }
        />


        {/* =====================================================
            EXPLAINABILITY
        ===================================================== */}

        <Route
          path="/explainability"
          element={<Explainability />}
        />


        {/* =====================================================
            GUIDANCE
        ===================================================== */}

        <Route
          path="/guidance"
          element={<Guidance />}
        />

        <Route
          path="/guidance/:id"
          element={<RecommendationDetails />}
        />


        {/* =====================================================
            PREDICTIONS
        ===================================================== */}

        <Route
          path="/predictions"
          element={<Predictions />}
        />

        <Route
          path="/predictions/:id"
          element={<PredictionDetails />}
        />


        {/* =====================================================
            CHURN PREDICTION SIDEBAR ALIAS
        ===================================================== */}

        <Route
          path="/prediction"
          element={
            <Navigate
              to="/predictions"
              replace
            />
          }
        />

        <Route
          path="/churn-prediction"
          element={
            <Navigate
              to="/predictions"
              replace
            />
          }
        />


        {/* =====================================================
            REPORTS
        ===================================================== */}

        <Route
          path="/reports"
          element={<Reports />}
        />


        {/* =====================================================
            SETTINGS
        ===================================================== */}

        <Route
          path="/settings"
          element={<Settings />}
        />


        {/* =====================================================
            NAVIGATION ALIASES
        ===================================================== */}

        {/* Dashboard */}
        <Route
          path="/home"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* Customer Management */}
        <Route
          path="/customer-management"
          element={
            <Navigate
              to="/customers"
              replace
            />
          }
        />

        {/* Data Management */}
        <Route
          path="/data-management"
          element={
            <Navigate
              to="/data/upload"
              replace
            />
          }
        />


        {/* =====================================================
            UNKNOWN ROUTES
        ===================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;