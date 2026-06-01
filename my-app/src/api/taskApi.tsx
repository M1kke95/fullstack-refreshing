const API_URL = "http://localhost:3000/tasks"

export async function fetchTasks() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function createTask(taskname: string, description: string, userId: number) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskname, description, userId }),
    });
    return response.json();
}

export async function deleteTask(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    return response.json();
}


