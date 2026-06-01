import type { UserItemProps } from "../type/user";
import { useState } from "react";
import { createTask, deleteTask } from "../api/taskApi";

export default function UserItem({
  user,
  onDelete,
  onUpdate,
  onRefresh,
}: UserItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskname, setTaskname] = useState("");
  const [description, setDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleUpdate = async () => {
    if (!onUpdate) return;

    await onUpdate(user.id, name, email);
    setIsEditing(false);
    await onRefresh();
  };

  const handleCreateTask = async () => {
    console.log("Creating task:", { taskname, description, userId: user.id });  
    if (!taskname.trim() || !description.trim()) return;

    await createTask(taskname, description, user.id);

    setTaskname("");
    setDescription("");
    setShowTaskForm(false);

    await onRefresh();
  };

  const handleDeleteTask = async (taskId: number) => {
    await deleteTask(taskId);
    await onRefresh();
  };

  const startEditTask = (taskId: number, taskname: string, description: string) => {
    setEditingTaskId(taskId);
    setEditTaskName(taskname);
    setEditDescription(description);
  };

  return (
    <div className="user-card">
      {isEditing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>

          <div className="user-actions">
          <button onClick={() => setIsEditing(true)}>
                Edit user
          </button>

          <button onClick={() => onDelete?.(user.id)}>
            Delete user
          </button>
          </div>
        </>
      )}

      <h4>Tasks</h4>

      {user.tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <ul className="task-list">
          {user.tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editingTaskId === task.id ? (
                <>
                  <input
                    value={editTaskName}
                    onChange={(e) => setEditTaskName(e.target.value)}
                  />

                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />

                  <button>
                    Save
                  </button>

                  <button onClick={() => setEditingTaskId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>
                    {task.taskname} - {task.description}
                  </span>

                  <button
                    onClick={() =>
                      startEditTask(
                        task.id,
                        task.taskname,
                        task.description
                      )
                    }
                  >
                    Edit task
                  </button>

                  <button onClick={() => handleDeleteTask(task.id)}>
                    Delete task
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {showTaskForm ? (
        <div className="task-form">
          <input
            value={taskname}
            onChange={(e) => setTaskname(e.target.value)}
            placeholder="Task name"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <button onClick={handleCreateTask}>Save task</button>
          <button onClick={() => setShowTaskForm(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setShowTaskForm(true)}>Add task</button>
      )}

      
    </div>
  );
}