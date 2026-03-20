import type { UserListProps } from "../type/user";



export default function UserList({ users, onDelete }: UserListProps) {
    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <button onClick={() => {
                    console.log("Clicked delete:", user.id);
                    onDelete?.(user.id);
                    }}>
                    Delete
                    </button>
                </div>
            ))}
        </div>
    );
}