import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "churn_guidance_auth";
const USER_STORAGE_KEY = "churn_guidance_user";

const DEFAULT_USER = {
  id: "user-admin-001",
  name: "Executive Analyst",
  email: "analyst@enterprise.ai",
  role: "admin",
  companyId: "primary",
  companyName: "Primary Enterprise",
};

const getStoredValue = (
  key,
  fallback = null
) => {
  try {
    const stored =
      localStorage.getItem(key);

    if (!stored) {
      return fallback;
    }

    return JSON.parse(stored);
  } catch {
    return fallback;
  }
};

const AuthProvider = ({ children }) => {
  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(() =>
    Boolean(
      localStorage.getItem(
        AUTH_STORAGE_KEY
      )
    )
  );

  const [user, setUser] = useState(() =>
    getStoredValue(
      USER_STORAGE_KEY,
      null
    )
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (
      isAuthenticated &&
      !user
    ) {
      setUser(DEFAULT_USER);

      localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(DEFAULT_USER)
      );
    }
  }, [isAuthenticated, user]);

  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      setError("");

      try {
        const cleanEmail =
          String(email || "").trim();

        if (!cleanEmail) {
          throw new Error(
            "Please enter your email address."
          );
        }

        if (!password) {
          throw new Error(
            "Please enter your password."
          );
        }

        const username =
          cleanEmail
            .split("@")[0]
            .replace(/[._-]/g, " ")
            .replace(/\b\w/g, (letter) =>
              letter.toUpperCase()
            );

        const loggedInUser = {
          ...DEFAULT_USER,
          name:
            username || DEFAULT_USER.name,
          email: cleanEmail,
        };

        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            authenticated: true,
            loginTime:
              new Date().toISOString(),
          })
        );

        localStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify(loggedInUser)
        );

        setUser(loggedInUser);
        setIsAuthenticated(true);

        return {
          success: true,
          user: loggedInUser,
        };
      } catch (loginError) {
        const message =
          loginError?.message ||
          "Login failed.";

        setError(message);

        return {
          success: false,
          error: message,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async ({
      name,
      email,
      password,
      companyName,
    } = {}) => {
      setLoading(true);
      setError("");

      try {
        if (!name?.trim()) {
          throw new Error(
            "Please enter your name."
          );
        }

        if (!email?.trim()) {
          throw new Error(
            "Please enter your email."
          );
        }

        if (!password) {
          throw new Error(
            "Please enter a password."
          );
        }

        const registeredUser = {
          ...DEFAULT_USER,
          id: `user-${Date.now()}`,
          name: name.trim(),
          email: email.trim(),
          companyName:
            companyName?.trim() ||
            DEFAULT_USER.companyName,
        };

        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            authenticated: true,
            loginTime:
              new Date().toISOString(),
          })
        );

        localStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify(
            registeredUser
          )
        );

        setUser(registeredUser);
        setIsAuthenticated(true);

        return {
          success: true,
          user: registeredUser,
        };
      } catch (registerError) {
        const message =
          registerError?.message ||
          "Registration failed.";

        setError(message);

        return {
          success: false,
          error: message,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(
      AUTH_STORAGE_KEY
    );

    localStorage.removeItem(
      USER_STORAGE_KEY
    );

    setUser(null);
    setIsAuthenticated(false);
    setError("");
  }, []);

  const updateUser = useCallback(
    (updates = {}) => {
      setUser((currentUser) => {
        const updatedUser = {
          ...(currentUser ||
            DEFAULT_USER),
          ...updates,
        };

        localStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify(updatedUser)
        );

        return updatedUser;
      });
    },
    []
  );

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      error,
      login,
      register,
      logout,
      updateUser,
      clearError,
    }),
    [
      user,
      isAuthenticated,
      loading,
      error,
      login,
      register,
      logout,
      updateUser,
      clearError,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
};

export { AuthContext };

export default AuthProvider;