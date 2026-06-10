const express = require("express");
const db = require("./db/connection");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: false
    })
);

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = 5000;

// Serve static files
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Task Manager Server Running");
});
app.get("/hello", (req, res) => {
    res.send("HELLO WORLD");
});
app.get("/test2", (req, res) => {
    res.send("TEST2 WORKS");
});
app.post("/register2", (req, res) => {
    res.send("REGISTER2 WORKS");
});

app.get("/dashboard", (req, res) => {

    if (req.session.userId) {

        res.send("Welcome to the dashboard!");

    } else {

        res.send("Please login first");

    }

});

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`);
});