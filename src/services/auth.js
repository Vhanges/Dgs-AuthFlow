const API_BASE_URL = "http://localhost:8000/api/v1";

export const login = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

export const googleLogin = () => {
  window.location.href = `${API_BASE_URL}/auth/google`;
};
