const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json()); 
app.use(cors());



// ✅ Config
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";
const path = require("path");
const usersFilePath = path.join(__dirname, "users.json");


console.log("Reading users.json from:", usersFilePath);

// ✅ LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Error reading users.json:", err);
    res.status(500).json({ message: "Server error reading users file" });
  }
    
});

// ✅ PROTECTED ROUTE
app.get("/protected", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ message: "Protected data", user });
  });
});

// ✅ REGISTER (optional)
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFilePath));

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.json({ message: "User registered successfully!" });
});

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
