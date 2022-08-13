import Anchor from '../../components/Anchor';
import { Avatar, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';

function User({ user }) {
  return (
    user ? (
      <>
        <ListItemAvatar>
          <Avatar 
            alt={user.username} 
            src={user.avatar} 
            sx={{ 
              width: 60, 
              height: 60, 
              mr: 2
            }}
          >
            {user.username ? user.username[0].toUpperCase() : ""}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Anchor name={`@${user.username}`} to={`/users/${user.id}`} />} />
      </>
    ) : (
      <>
        <ListItemAvatar>
          <Avatar sx={{width: 60, height: 60, mr: 2}} />
        </ListItemAvatar>
        <ListItemText primary={<Skeleton animation="wave" width={(350 /3)} />} />
      </>
    )
    
  )
}

export default User;