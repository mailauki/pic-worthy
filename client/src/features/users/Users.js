import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from './usersSlice';

function Users() {
  const users = useSelector((state) => state.users.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div>
      <h1>Users</h1>
      {users.map( user => <Link to={`/users/${user.id}`}><p>{user.username} - {user.first_name}</p></Link> )}
    </div>
  )
}

export default Users;