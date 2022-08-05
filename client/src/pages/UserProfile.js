import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Users from '../features/users/Users';
import ImageGrid from '../components/ImageGrid';

function UserProfile() {
  const { id } = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch(`/users/${id}`)
    .then((r) => r.json())
    .then((data) => setUser(data))
  }, [id])

  return (
    <>
      <h1>User Profile</h1>
      {/* <Users /> */}
      <ImageGrid user={user} />
    </>
  )
}

export default UserProfile;
