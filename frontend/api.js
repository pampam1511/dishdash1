const API = "https://dishdash-backend-7dig.onrender.com";
async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
  };
  const res = await fetch(`${API}${path}`, { ...options, headers });
  return res;
}
