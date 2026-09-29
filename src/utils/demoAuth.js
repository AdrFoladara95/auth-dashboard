const USERS_KEY = "portfolio_demo_users";
const AUTH_KEY = "portfolio_demo_logged_in";

function getUsers() {
  const savedUsers = localStorage.getItem(USERS_KEY);

  if (!savedUsers) return {};

  try {
    return JSON.parse(savedUsers);
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function saveDemoUser(user) {
  const users = getUsers();

  users[user.email] = user;

  saveUsers(users);
}

export function getDemoUser() {
  const email = sessionStorage.getItem(AUTH_KEY);

  if (!email) return null;

  const users = getUsers();

  return users[email] || null;
}

export function loginDemoUser(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const users = getUsers();

  let user = users[email];

  if (!user) {
    user = {
      firstName: "Demo",
      lastName: "User",
      email,
      avatarUrl: null,
    };

    users[email] = user;
    saveUsers(users);
  }

  sessionStorage.setItem(AUTH_KEY, email);

  return user;
}

export function logoutDemoUser() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isDemoLoggedIn() {
  return sessionStorage.getItem(AUTH_KEY) !== null;
}