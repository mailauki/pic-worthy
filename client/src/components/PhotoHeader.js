import { useSelector } from 'react-redux';
import Anchor from '../components/Anchor';
import LikeBtn from '../components/LikeBtn';
import { Skeleton, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

function PhotoHeader({ currentUser }) {
  const photo = useSelector((state) => state.photos.entities)

  return (
    <List 
      sx={{
        width: "100%",
        mt: "-10px"
      }}
    >
      <ListItem>
        {photo.user ? (
          <>
            <ListItemAvatar>
              <Avatar 
                alt={photo.user.username} 
                src={photo.user.avatar} 
                sx={{ 
                  width: 60, 
                  height: 60, 
                  mr: 2,
                  mt: "-30px"
                }}
              >
                {photo.user.username ? photo.user.username[0].toUpperCase() : ""}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={<Anchor name={`@${photo.user.username}`} to={`/users/${photo.user.id}`} />} />
          </>
        ) : (
          <>
            <ListItemAvatar>
              <Avatar 
                sx={{width: 60, height: 60, mr: 2, mt: "-30px"}} 
              />
            </ListItemAvatar>
            <ListItemText primary={<Skeleton animation="wave" width={(350 /3)} />} />
          </>
        )}

        <LikeBtn currentUser={currentUser} photo={photo} />
      </ListItem>
    </List>
  )
}

export default PhotoHeader;
