import { useState } from "react";
import type { UserListProps } from "../type/user";



export default function UserList({ users, onDelete, onUpdate }: UserListProps) {
  return (
    <div className="user-list">
      {users.map(user => {
        const [isEditing, setIsEditing] = useState(false);
        const [name, setName] = useState(user.name);
        const [email, setEmail] = useState(user.email);

        const handleUpdate = async () => {
          if (onUpdate) {
            await onUpdate(user.id, name, email);
            setIsEditing(false);
          }
        };

        return (
          <div key={user.id} className="user-card">
            <div className="user-info">
              {isEditing ? (
                <>
                  <input value={name} onChange={e => setName(e.target.value)} />
                  <input value={email} onChange={e => setEmail(e.target.value)} />
                  <button onClick={handleUpdate}>Save</button>
                </>
              ) : (
                <>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
              )}
            </div>
            <button onClick={() => onDelete?.(user.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}