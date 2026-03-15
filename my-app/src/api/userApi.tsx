const API_URL = "http://localhost:3000/users"

export async function fetchUsers() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function fetchUserById(id: number) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export async function createUser(name: string, email: string) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
    });
    return response.json();
}

export async function updateUser(id: number, name: string | undefined, email: string | undefined) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
    });
    return response.json();
}

export async function deleteUser(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    return response.json();
}