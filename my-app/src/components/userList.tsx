import type { User } from "../type/user";

type UserListProps = {
    users: User[];
}

export default function UserList({ users }: UserListProps) {
    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
}