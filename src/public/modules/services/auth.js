import { signal } from "preact/signals";

export const AUTH_KEY = 'userToken';

export const userLoggedIn = signal(AUTH_KEY in window.localStorage);

export async function login(data) {
  const result = await fetch('/api/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
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

export function getToken() {
  const token = JSON.parse(window.localStorage.getItem(AUTH_KEY) ?? '{"token": ""}');
  console.log(token);
  return token.token;
}
