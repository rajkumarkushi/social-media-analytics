export const API_URL = "http://localhost:5000/api";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to register");
  return res.json();
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // ensure refresh cookie is set
  });

  if (!res.ok) throw new Error("Invalid email or password");
  return res.json();
}

export async function getAccounts() {
  const res = await authFetch(`${API_URL}/accounts`);
  if (!res.ok) throw new Error("Failed to fetch accounts");
  return res.json();
}


export async function addAccount(data: {
  provider: string;
  accountId: string;
  accountName: string;
}) {
  const res = await authFetch(`${API_URL}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add account");
  return res.json();
}
export async function deleteAccount(id: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/accounts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete account");
  return res.json();
}

export async function getAnalytics(filters?: {
  provider?: string;
  startDate?: string;
  endDate?: string;
}) {
  const query = new URLSearchParams(filters as any).toString();
  const url = `${API_URL}/analytics${query ? `?${query}` : ""}`;
  const res = await authFetch(url);

  if (!res.ok) throw new Error("Failed to fetch analytics");
  return res.json();
}
export async function addAnalytics(data: {
  provider: string;
  followers: number;
  likes: number;
  shares: number;
}) {
  const res = await authFetch(`${API_URL}/analytics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add analytics: ${res.status} ${text}`);
  }
  return res.json();
}

export async function downloadCSV() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/reports/csv`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "analytics_report.csv";
  a.click();
}

export async function downloadPDF() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/reports/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "analytics_report.pdf";
  a.click();
}


export async function refreshToken() {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // send refresh cookie
  });

  if (!res.ok) throw new Error("Failed to refresh token");

  const data = await res.json();
  localStorage.setItem("token", data.accessToken); // replace old one
  return data.accessToken;
}

async function authFetch(url: string, options: RequestInit = {}) {
  let token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 || res.status === 403) {
    // try refresh
    try {
      token = await refreshToken();
      const retryRes = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        },
        // do NOT include credentials here to avoid CORS failures on protected routes
      });
      return retryRes;
    } catch (err) {
      try {
        localStorage.removeItem("token");
      } catch {}
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
      throw new Error("Session expired, redirecting to login");
    }
  }

  return res;
}

export async function getAllUsers() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function deleteUser(id: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}

export async function getDashboardStats() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch dashboard stats");
  return res.json();
}
export async function getRecentActivity() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/dashboard/activity`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch recent activity");
  return res.json();
}


