const express = require("express");
const db = require("../db/connection");

const router = express.Router();

router.post("/create", (req, res) => {

    console.log(req.body);

    const { title } = req.body;

    const sql =
        "INSERT INTO tasks (title, status) VALUES (?, ?)";

    db.query(
        sql,
        [title, "Pending"],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.send("Task creation failed");
            }

            res.send("Task created successfully");

        }
    );

});

router.get("/", (req, res) => {

    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, results) => {

        if (err) {

            console.log(err);

            return res.send("Error fetching tasks");

        }

        res.json(results);

    });

});

router.put("/update/:id", (req, res) => {

    const taskId = req.params.id;

    const sql =
        "UPDATE tasks SET status = 'Completed' WHERE id = ?";

    db.query(sql, [taskId], (err, result) => {

        if (err) {

            console.log(err);

            return res.send("Task update failed");

        }

        res.send("Task updated successfully");

    });

});

router.delete("/delete/:id", (req, res) => {

    const taskId = req.params.id;

    const sql = "DELETE FROM tasks WHERE id = ?";

    db.query(sql, [taskId], (err, result) => {

        if (err) {

            console.log(err);

            return res.send("Task deletion failed");

        }

        res.send("Task deleted successfully");

    });

});

module.exports = router;