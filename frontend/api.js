const API = "http://localhost:3000";
async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
  };
  const res = await fetch(`${API}${path}`, { ...options, headers });
  return res;
}
