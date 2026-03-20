import { useEffect, useState } from 'react'
import type { User } from './type/user'
import UserList from './components/userList'
import { deleteUser, fetchUsers, updateUser } from './api/userApi'
import './App.css'
import CreateUserForm from './components/createUserForm'

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, [])
  
  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  }

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    loadUsers();
  }

  const handleUpdateUser = async (id: number, name: string, email: string) => {
  await updateUser(id, name, email);
  loadUsers(); 
};

  return (
    <>
      <h1>Users</h1>
      <CreateUserForm onUsersCreated={loadUsers} />
      <UserList users={users} onDelete={handleDeleteUser} onUpdate={handleUpdateUser} />
    </>
  )
}

