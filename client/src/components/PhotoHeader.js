import { Avatar, Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function PhotoHeader({ user }) {
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
          <p>@{user.username}</p>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "baseline", width: "fit-content" }}>
          <Avatar 
            // alt={user.username} 
            // src={user.avatar} 
            sx={{ 
              width: 60, 
              height: 60
            }}
          />
          <p></p>
        </div>
      )}
    </>
  )
}

export default PhotoHeader;
