import React from "react";
import PropTypes from "prop-types";
import "./CustomerTable.css";

const CustomerTable = ({
  data = [],
  loading = false,
  emptyMessage = "No customers available.",
  onViewDetails,
  onEdit,
  onRowClick,
}) => {
  const getCustomerName = (customer) =>
    customer?.customerName ||
    customer?.name ||
    customer?.customer_name ||
    "Unknown Customer";

  const getCustomerId = (customer) =>
    customer?.customerId ||
    customer?.id ||
    customer?.customer_id ||
    "—";

  const getEmail = (customer) =>
    customer?.email ||
    customer?.emailAddress ||
    customer?.email_address ||
    "—";

  const getCompany = (customer) =>
    customer?.company ||
    customer?.companyName ||
    customer?.company_name ||
    "—";

  const getPlan = (customer) =>
    customer?.plan ||
    customer?.subscriptionPlan ||
    customer?.subscription_plan ||
    "Standard";

  const getStatusClass = (status) => {
    const normalized = String(status || "")
      .toLowerCase()
      .replace(/\s+/g, "");

    if (normalized === "active") {
      return "customer-table-status-active";
    }

    if (
      normalized === "atrisk" ||
      normalized === "at-risk"
    ) {
      return "customer-table-status-risk";
    }

    if (normalized === "churned") {
      return "customer-table-status-churned";
    }

    if (
      normalized === "inactive" ||
      normalized === "in-active"
    ) {
      return "customer-table-status-inactive";
    }

    return "customer-table-status-default";
  };

  const getInitials = (name) => {
    if (!name) {
      return "CU";
    }

    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length === 1) {
      return parts[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return `${parts[0][0]}${parts[1][0]}`
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="customer-table-container">
        <div className="customer-table-loading">
          <div className="customer-table-spinner" />
          <span>Loading customers...</span>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="customer-table-container">
        <div className="customer-table-empty">
          <div className="customer-table-empty-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="9"
                cy="8"
                r="3"
                stroke="currentColor"
                strokeWidth="1.7"
              />

              <path
                d="M3 20C3.5 16.5 5.5 15 9 15C12.5 15 14.5 16.5 15 20"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />

              <path
                d="M17 8H21"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />

              <path
                d="M19 6V10"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h3>No Customers Found</h3>
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-table-container">
      <div className="customer-table-wrapper">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Company</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((customer, index) => {
              const key =
                customer?.id ||
                customer?.customerId ||
                customer?.customer_id ||
                index;

              const name =
                getCustomerName(customer);

              const status =
                customer?.status || "Active";

              const joined =
                customer?.joinedDate ||
                customer?.joined_date ||
                customer?.createdAt ||
                customer?.created_at ||
                "—";

              return (
                <tr
                  key={key}
                  className={
                    onRowClick
                      ? "customer-table-clickable-row"
                      : ""
                  }
                  onClick={() => {
                    if (
                      typeof onRowClick ===
                      "function"
                    ) {
                      onRowClick(customer);
                    }
                  }}
                >
                  <td>
                    <div className="customer-table-customer">
                      {customer?.avatar ? (
                        <img
                          src={customer.avatar}
                          alt={`${name} profile`}
                          className="customer-table-avatar"
                        />
                      ) : (
                        <div className="customer-table-avatar customer-table-avatar-placeholder">
                          {getInitials(name)}
                        </div>
                      )}

                      <div className="customer-table-customer-info">
                        <span className="customer-table-customer-name">
                          {name}
                        </span>

                        <span className="customer-table-customer-id">
                          ID: {getCustomerId(customer)}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="customer-table-contact">
                      <span className="customer-table-email">
                        {getEmail(customer)}
                      </span>

                      {customer?.phone && (
                        <span className="customer-table-phone">
                          {customer.phone}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <span className="customer-table-company">
                      {getCompany(customer)}
                    </span>
                  </td>

                  <td>
                    <span className="customer-table-plan">
                      {getPlan(customer)}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`customer-table-status ${getStatusClass(
                        status
                      )}`}
                    >
                      <span className="customer-table-status-dot" />
                      {status}
                    </span>
                  </td>

                  <td>
                    <span className="customer-table-date">
                      {joined}
                    </span>
                  </td>

                  <td>
                    <div className="customer-table-actions">
                      <button
                        type="button"
                        className="customer-table-action-button"
                        onClick={(event) => {
                          event.stopPropagation();

                          if (
                            typeof onViewDetails ===
                            "function"
                          ) {
                            onViewDetails(
                              customer
                            );
                          }
                        }}
                        aria-label={`View ${name}`}
                        title="View details"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 12C4.5 7.5 8 5 12 5C16 5 19.5 7.5 21.5 12C19.5 16.5 16 19 12 19C8 19 4.5 16.5 2.5 12Z"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                          />

                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="1.7"
                          />
                        </svg>
                      </button>

                      {onEdit && (
                        <button
                          type="button"
                          className="customer-table-action-button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onEdit(customer);
                          }}
                          aria-label={`Edit ${name}`}
                          title="Edit customer"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M4 20H8L19 9C20.1 7.9 20.1 6.1 19 5C17.9 3.9 16.1 3.9 15 5L4 16V20Z"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinejoin="round"
                            />

                            <path
                              d="M13.5 6.5L17.5 10.5"
                              stroke="currentColor"
                              strokeWidth="1.7"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

CustomerTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.object
  ),
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  onViewDetails: PropTypes.func,
  onEdit: PropTypes.func,
  onRowClick: PropTypes.func,
};

export default CustomerTable;