import type { UserListProps } from "../type/user";
import UserItem from "./user";



export default function UserList({ users, onDelete, onUpdate, onRefresh }: UserListProps) {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}
