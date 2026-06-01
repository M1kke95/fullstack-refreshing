import type { User, UserItemProps } from "../type/user";
import { useState } from "react";



export default function UserItem({
  user,
  onDelete,
  onUpdate,
}: UserItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = async () => {
    if (!onUpdate) return;

    await onUpdate(user.id, name, email);
    setIsEditing(false);
  };

  return (
    <div className="user-card">
      {isEditing ? (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleUpdate}>
            Save
          </button>

          <button onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>

          <button onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      )}

      <button onClick={() => onDelete?.(user.id)}>
        Delete
      </button>
    </div>
  );
}