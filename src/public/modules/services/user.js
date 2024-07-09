import { getToken, logout } from "./auth.js";

export async function getUsers() {
  const token = getToken();

  const result = await fetch('/api/admin/users', {
    method: "GET",
    headers: {
      "Authorization": token.token
    }
  });

  if (result.status === 200) {
    const users = await result.json();
    return users;
  } else if (result.status === 403) {
    logout();
    window.location = "/login";
  } else {
    return [];
  }
}

export async function createUser(data) {
  const token = getToken();

  const result = await fetch('/api/admin/user', {
    method: "POST",
    headers: {
      "Authorization": token.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (result.status === 200) {
    const newUser = await result.json();
    return newUser;
  } else if (result.status === 403) {
    logout();
    window.location = "/login";
  } else {
    return null;
  }
}

