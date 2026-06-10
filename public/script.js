async function loadTasks() {

    const response =
        await fetch("/tasks");

    const tasks =
        await response.json();

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

    taskList.innerHTML += `
        <div>

            <h3>${task.title}</h3>

            <p>Status: ${task.status}</p>

            <button onclick="completeTask(${task.id})">

                Complete

            </button>

            <button onclick="deleteTask(${task.id})">

                Delete

            </button>

        </div>

        <hr>
    `;

});

}


async function addTask() {

    const taskInput =
        document.getElementById("taskInput");

    const title =
        taskInput.value;

    await fetch("/tasks/create", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body: JSON.stringify({
            title: title
        })

    });

    taskInput.value = "";

    loadTasks();

}

async function completeTask(id) {

    await fetch(`/tasks/update/${id}`, {

        method: "PUT"

    });

    loadTasks();

}

loadTasks();
async function deleteTask(id) {

    await fetch(`/tasks/delete/${id}`, {

        method: "DELETE"

    });

    loadTasks();

}