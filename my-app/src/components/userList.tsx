import type { UserListProps } from "../type/user";



export default function UserList({ users, onDelete }: UserListProps) {
    return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <div className="user-info">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
          <button onClick={() => onDelete?.(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}