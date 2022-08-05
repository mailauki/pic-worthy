import { useParams } from 'react-router-dom';
import Users from '../features/users/Users';
import ImageGrid from '../components/ImageGrid';

function UserProfile() {
  const id = useParams()

  return (
    <>
      <h1>User Profile</h1>
      {/* <Users /> */}
      <ImageGrid />
    </>
  )
}

export default UserProfile;
