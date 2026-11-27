import api, {
  getApiErrorMessage,
} from "./api";

const TOKEN_KEY =
  "churn_auth_token";

const USER_KEY =
  "churn_user";

const DEFAULT_AUTH_USERS = [
  {
    id: "USR-001",
    name: "Enterprise Admin",
    email: "admin@enterprise.ai",
    password: "admin123",
    role: "admin",
    isAdmin: true,
  },
  {
    id: "USR-002",
    name: "Operations Analyst",
    email: "analyst@enterprise.ai",
    password: "analyst123",
    role: "analyst",
    isAdmin: false,
  },
];

const createAuthToken = (user) => {
  return `auth-token-${user.id}-${Date.now()}`;
};

const saveSession = (
  token,
  user
) => {
  localStorage.setItem(
    TOKEN_KEY,
    token
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};

export const login = async (
  email,
  password
) => {
  const cleanEmail =
    String(email || "")
      .trim()
      .toLowerCase();

  const cleanPassword =
    String(password || "");

  if (!cleanEmail || !cleanPassword) {
    throw new Error(
      "Email and password are required."
    );
  }

  try {
    const response = await api.post(
      "/auth/login",
      {
        email: cleanEmail,
        password: cleanPassword,
      }
    );

    const data = response.data;

    const token =
      data?.access_token ||
      data?.token;

    const user =
      data?.user ||
      data?.data?.user;

    if (token) {
      saveSession(
        token,
        user || {
          email: cleanEmail,
        }
      );
    }

    return data;
  } catch (error) {
    const authUser =
      DEFAULT_AUTH_USERS.find(
        (item) =>
          item.email === cleanEmail &&
          item.password ===
            cleanPassword
      );

    if (!authUser) {
      throw new Error(
        getApiErrorMessage(
          error,
          "Invalid email or password."
        )
      );
    }

    const {
      password: _password,
      ...safeUser
    } = authUser;

    const token =
      createAuthToken(
        safeUser
      );

    saveSession(
      token,
      safeUser
    );

    return {
      access_token: token,
      token,
      user: safeUser,
    };
  }
};

export const register = async (
  userData
) => {
  const payload = {
    name: String(
      userData?.name || ""
    ).trim(),

    email: String(
      userData?.email || ""
    )
      .trim()
      .toLowerCase(),

    password: String(
      userData?.password || ""
    ),
  };

  if (
    !payload.name ||
    !payload.email ||
    !payload.password
  ) {
    throw new Error(
      "Name, email and password are required."
    );
  }

  try {
    const response = await api.post(
      "/auth/register",
      payload
    );

    return response.data;
  } catch {
    const user = {
      id: `USR-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      role: "analyst",
      isAdmin: false,
    };

    const token =
      createDemoToken(user);

    saveSession(
      token,
      user
    );

    return {
      access_token: token,
      token,
      user,
      demo: true,
    };
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch {
    // Backend may not be running.
  }

  localStorage.removeItem(
    TOKEN_KEY
  );

  localStorage.removeItem(
    USER_KEY
  );
};

export const getCurrentUser = () => {
  const storedUser =
    localStorage.getItem(
      USER_KEY
    );

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(
      storedUser
    );
  } catch {
    localStorage.removeItem(
      USER_KEY
    );

    return null;
  }
};

export const getToken = () => {
  return localStorage.getItem(
    TOKEN_KEY
  );
};

export const isAuthenticated = () => {
  return Boolean(
    localStorage.getItem(
      TOKEN_KEY
    )
  );
};

export const getProfile = async () => {
  try {
    const response =
      await api.get(
        "/auth/me"
      );

    const user =
      response.data?.user ||
      response.data;

    if (user) {
      localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
      );
    }

    return user;
  } catch {
    return getCurrentUser();
  }
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  getToken,
  isAuthenticated,
  getProfile,
};

export default authService;