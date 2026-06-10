const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/connection");

const router = express.Router();


router.post("/register", async (req, res) => { 
    console.log("REGISTER ROUTE HIT");

    const { username, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql =
            "INSERT INTO users (username, password) VALUES (?, ?)";

        db.query(
            sql,
            [username, hashedPassword],
            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.send("Registration failed");
                }

                res.send("User registered successfully");

            }
        );

    }

    catch (error) {

        console.log(error);

        res.send("Something went wrong");

    }

});
router.post("/login", (req, res) => {

    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], async (err, results) => {

        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        if (results.length === 0) {
            return res.send("Invalid username or password");
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            req.session.userId = user.id;

           res.send("Login successful");

        } else {

            res.send("Invalid username or password");

        }

    });

});

console.log(router.stack);

module.exports = router;