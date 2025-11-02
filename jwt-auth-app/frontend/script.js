const apiBase = "http://localhost:3000";

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${apiBase}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    document.getElementById("output").innerText = "Login successful. Token stored!";
  } else {
    document.getElementById("output").innerText = data.message;
  }
}

async function getProtected() {
  const token = localStorage.getItem("token");
  if (!token) {
    document.getElementById("output").innerText = "Please login first!";
    return;
  }

  const res = await fetch(`${apiBase}/protected`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (res.status === 403 || res.status === 401) {
    document.getElementById("output").innerText = "Invalid or expired token!";
    return;
  }

  const data = await res.json();
  document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}
