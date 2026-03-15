import { useState } from "react";
import { createUser } from "../api/userApi";
import type { CreateUserFormProps } from "../type/user";



export default function CreateUserForm({ onUsersCreated }: CreateUserFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await createUser(name, email);

        setName("");
        setEmail("");

        onUsersCreated();
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            />
            <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            />
            <button type="submit">Create User</button>
        </form>
    );

}