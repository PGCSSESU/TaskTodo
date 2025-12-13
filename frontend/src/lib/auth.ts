const API = "http://localhost:5000/api/auth";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.msg || "Register failed");
  return json; 
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.msg || "Login failed");
  return json;
}
