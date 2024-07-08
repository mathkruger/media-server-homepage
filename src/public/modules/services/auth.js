import { signal } from "preact/signals";

const AUTH_KEY = 'userToken';

export const userLoggedIn = signal(AUTH_KEY in window.localStorage);

export async function login({ username, password }) {
  const form = new FormData();
  form.append('username', username);
  form.append('password', password);

  const result = await fetch('/api/login', {
    method: "POST",
    body: form,
  });

  if (result.status === 200) {
    const token = await result.json();
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(token));
    userLoggedIn.value = true;
  } else {
    userLoggedIn.value = false;
  }

  return userLoggedIn.value;
}

export function logout() {
  window.localStorage.removeItem(AUTH_KEY);
  userLoggedIn.value = false;
}
