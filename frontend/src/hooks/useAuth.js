import { useAuth as useAuthContext } from "../context/AuthContext";

/**
 * Custom authentication hook.
 *
 * Provides access to:
 * - Current user
 * - Authentication state
 * - Login
 * - Registration
 * - Logout
 * - User updates
 * - Authentication errors
 */
const useAuth = () => {
  const auth = useAuthContext();

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,

    login: auth.login,
    register: auth.register,
    logout: auth.logout,

    updateUser: auth.updateUser,
    clearError: auth.clearError,
  };
};

export default useAuth;