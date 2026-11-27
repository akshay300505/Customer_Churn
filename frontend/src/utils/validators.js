/* =========================================================
   CUSTOMER CHURN GUIDANCE
   Validation Utilities
   ========================================================= */

import {
  FILE_LIMITS,
  SUPPORTED_FILE_TYPES,
  VALIDATION,
} from "./constants";

/* ---------------------------------------------------------
   REQUIRED
   --------------------------------------------------------- */

export const required = (
  value,
  fieldName = "This field"
) => {
  if (
    value === null ||
    value === undefined ||
    String(value).trim() === ""
  ) {
    return `${fieldName} is required.`;
  }

  return "";
};

/* ---------------------------------------------------------
   EMAIL
   --------------------------------------------------------- */

export const isValidEmail = (
  email
) => {
  if (!email) {
    return false;
  }

  const value =
    String(email).trim();

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return emailRegex.test(
    value
  );
};

export const validateEmail = (
  email
) => {
  if (!email) {
    return "Email is required.";
  }

  if (!isValidEmail(email)) {
    return "Please enter a valid email address.";
  }

  if (
    String(email).length >
    VALIDATION.MAX_EMAIL_LENGTH
  ) {
    return `Email must not exceed ${VALIDATION.MAX_EMAIL_LENGTH} characters.`;
  }

  return "";
};

/* ---------------------------------------------------------
   PASSWORD
   --------------------------------------------------------- */

export const validatePassword = (
  password
) => {
  if (!password) {
    return "Password is required.";
  }

  const value =
    String(password);

  if (
    value.length <
    VALIDATION.MIN_PASSWORD_LENGTH
  ) {
    return `Password must contain at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters.`;
  }

  if (
    value.length >
    VALIDATION.MAX_PASSWORD_LENGTH
  ) {
    return `Password must not exceed ${VALIDATION.MAX_PASSWORD_LENGTH} characters.`;
  }

  return "";
};

/* ---------------------------------------------------------
   CONFIRM PASSWORD
   --------------------------------------------------------- */

export const validateConfirmPassword =
  (
    password,
    confirmPassword
  ) => {
    if (!confirmPassword) {
      return "Please confirm your password.";
    }

    if (
      password !==
      confirmPassword
    ) {
      return "Passwords do not match.";
    }

    return "";
  };

/* ---------------------------------------------------------
   NAME
   --------------------------------------------------------- */

export const validateName = (
  name,
  fieldName = "Name"
) => {
  if (!name) {
    return `${fieldName} is required.`;
  }

  const value =
    String(name).trim();

  if (value.length < 2) {
    return `${fieldName} must contain at least 2 characters.`;
  }

  if (
    value.length >
    VALIDATION.MAX_NAME_LENGTH
  ) {
    return `${fieldName} must not exceed ${VALIDATION.MAX_NAME_LENGTH} characters.`;
  }

  return "";
};

/* ---------------------------------------------------------
   COMPANY NAME
   --------------------------------------------------------- */

export const validateCompanyName =
  (name) => {
    if (!name) {
      return "Company name is required.";
    }

    const value =
      String(name).trim();

    if (value.length < 2) {
      return "Company name must contain at least 2 characters.";
    }

    if (
      value.length >
      VALIDATION.MAX_COMPANY_NAME_LENGTH
    ) {
      return `Company name must not exceed ${VALIDATION.MAX_COMPANY_NAME_LENGTH} characters.`;
    }

    return "";
  };

/* ---------------------------------------------------------
   NUMBER
   --------------------------------------------------------- */

export const isValidNumber = (
  value
) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return false;
  }

  return Number.isFinite(
    Number(value)
  );
};

export const validateNumber = (
  value,
  options = {}
) => {
  const {
    fieldName = "Value",
    min,
    max,
    required: isRequired = true,
  } = options;

  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return isRequired
      ? `${fieldName} is required.`
      : "";
  }

  if (!isValidNumber(value)) {
    return `${fieldName} must be a valid number.`;
  }

  const number =
    Number(value);

  if (
    min !== undefined &&
    number < min
  ) {
    return `${fieldName} must be at least ${min}.`;
  }

  if (
    max !== undefined &&
    number > max
  ) {
    return `${fieldName} must not exceed ${max}.`;
  }

  return "";
};

/* ---------------------------------------------------------
   CHURN PROBABILITY
   --------------------------------------------------------- */

export const validateChurnProbability =
  (value) => {
    return validateNumber(
      value,
      {
        fieldName:
          "Churn probability",
        min:
          VALIDATION.MIN_CHURN_PROBABILITY,
        max:
          VALIDATION.MAX_CHURN_PROBABILITY,
      }
    );
  };

/* ---------------------------------------------------------
   POSITIVE NUMBER
   --------------------------------------------------------- */

export const validatePositiveNumber =
  (
    value,
    fieldName = "Value"
  ) => {
    return validateNumber(
      value,
      {
        fieldName,
        min: 0,
      }
    );
  };

/* ---------------------------------------------------------
   FILE TYPE
   --------------------------------------------------------- */

export const isSupportedFileType =
  (file) => {
    if (!file) {
      return false;
    }

    const fileName =
      String(
        file.name || ""
      ).toLowerCase();

    return SUPPORTED_FILE_TYPES.some(
      (extension) =>
        fileName.endsWith(
          extension
        )
    );
  };

export const validateFileType = (
  file
) => {
  if (!file) {
    return "Please select a file.";
  }

  if (
    !isSupportedFileType(
      file
    )
  ) {
    return `Unsupported file type. Supported formats: ${SUPPORTED_FILE_TYPES.join(
      ", "
    )}.`;
  }

  return "";
};

/* ---------------------------------------------------------
   FILE SIZE
   --------------------------------------------------------- */

export const isValidFileSize = (
  file
) => {
  if (!file) {
    return false;
  }

  return (
    Number(file.size) <=
    FILE_LIMITS.MAX_SIZE_BYTES
  );
};

export const validateFileSize = (
  file
) => {
  if (!file) {
    return "Please select a file.";
  }

  if (
    !isValidFileSize(
      file
    )
  ) {
    return `File size must not exceed ${FILE_LIMITS.MAX_SIZE_MB} MB.`;
  }

  return "";
};

/* ---------------------------------------------------------
   FILE
   --------------------------------------------------------- */

export const validateFile = (
  file
) => {
  const typeError =
    validateFileType(
      file
    );

  if (typeError) {
    return typeError;
  }

  const sizeError =
    validateFileSize(
      file
    );

  if (sizeError) {
    return sizeError;
  }

  return "";
};

/* ---------------------------------------------------------
   FORM
   --------------------------------------------------------- */

export const validateForm = (
  values,
  rules
) => {
  const errors = {};

  Object.entries(
    rules || {}
  ).forEach(
    ([field, fieldRules]) => {
      const value =
        values?.[field];

      for (
        const rule of fieldRules
      ) {
        let error = "";

        if (
          typeof rule ===
          "function"
        ) {
          error = rule(value);
        } else if (
          rule?.validator &&
          typeof rule.validator ===
            "function"
        ) {
          error =
            rule.validator(
              value,
              values
            );
        }

        if (error) {
          errors[field] =
            error;
          break;
        }
      }
    }
  );

  return errors;
};

/* ---------------------------------------------------------
   HAS ERRORS
   --------------------------------------------------------- */

export const hasValidationErrors =
  (errors) => {
    return Object.values(
      errors || {}
    ).some(
      (error) =>
        Boolean(error)
    );
  };

/* ---------------------------------------------------------
   URL
   --------------------------------------------------------- */

export const isValidUrl = (
  value
) => {
  if (!value) {
    return false;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/* ---------------------------------------------------------
   PHONE
   --------------------------------------------------------- */

export const isValidPhone = (
  phone
) => {
  if (!phone) {
    return false;
  }

  const cleaned =
    String(phone).replace(
      /[\s\-()+]/g,
      ""
    );

  return /^\d{10,15}$/.test(
    cleaned
  );
};

export const validatePhone = (
  phone
) => {
  if (!phone) {
    return "Phone number is required.";
  }

  if (!isValidPhone(phone)) {
    return "Please enter a valid phone number.";
  }

  return "";
};

/* ---------------------------------------------------------
   DATE
   --------------------------------------------------------- */

export const isValidDate = (
  value
) => {
  if (!value) {
    return false;
  }

  const date =
    new Date(value);

  return !Number.isNaN(
    date.getTime()
  );
};

/* ---------------------------------------------------------
   RANGE
   --------------------------------------------------------- */

export const validateRange = (
  value,
  min,
  max,
  fieldName = "Value"
) => {
  return validateNumber(
    value,
    {
      fieldName,
      min,
      max,
    }
  );
};

/* ---------------------------------------------------------
   SEARCH
   --------------------------------------------------------- */

export const validateSearch = (
  value
) => {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  if (
    String(value).length >
    100
  ) {
    return "Search text is too long.";
  }

  return "";
};

/* ---------------------------------------------------------
   EXPORT DEFAULT
   --------------------------------------------------------- */

const validators = {
  required,
  isValidEmail,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateCompanyName,
  isValidNumber,
  validateNumber,
  validateChurnProbability,
  validatePositiveNumber,
  isSupportedFileType,
  validateFileType,
  isValidFileSize,
  validateFileSize,
  validateFile,
  validateForm,
  hasValidationErrors,
  isValidUrl,
  isValidPhone,
  validatePhone,
  isValidDate,
  validateRange,
  validateSearch,
};

export default validators;