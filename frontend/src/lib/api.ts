export async function fetchTasks(token: string) {
  const res = await fetch("http://localhost:5000/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(
  token: string,
  data: { title: string }
) {
  const res = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTask(
  token: string,
  id: string,
  data: any
) {
  const res = await fetch(
    `http://localhost:5000/api/tasks/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return res.json();
}

export async function deleteTask(
  token: string,
  id: string
) {
  const res = await fetch(
    `http://localhost:5000/api/tasks/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
}
