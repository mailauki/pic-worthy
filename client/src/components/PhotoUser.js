import Anchor from '../components/Anchor';
import { Avatar } from '@mui/material';

function PhotoUser({ user }) {
  return (
    <>
      {user ? (
        <div style={{ display: "flex", alignItems: "baseline", width: "fit-content" }}>
          <Avatar 
            alt={user.username} 
            src={user.avatar} 
            sx={{ 
              width: 60, 
              height: 60
            }}
          >
            {user.username[0]}
          </Avatar>
          <Anchor name={`@${user.username}`} to={`/users/${user.id}`} />
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "baseline", width: "fit-content" }}>
          <Avatar 
            sx={{ 
              width: 60, 
              height: 60
            }}
          />
        </div>
      )}
    </>
  )
}

export default PhotoUser;
