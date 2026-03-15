import { useEffect, useState } from 'react'
import type { User } from './type/user'
import UserList from './components/userlist'
import { fetchUsers } from './api/userApi'

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


  return (
    <>
      <h1>Users</h1>
      <UserList users={users} />
      <CreateUserForm onUsersCreated={loadUsers} />
    </>
  )
}

