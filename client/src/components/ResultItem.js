import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

function ResultItem({ id, image, text }) {
  return (
    <ListItem disablePadding key={id}>
      <ListItemButton
        component={Link} to={`/tags/${id}`}
        sx={{
          '&:hover': {
            div: {
              color: 'primary.main'
            }
          }
        }}
      >
        <ListItemAvatar>
          <Avatar 
            alt={text} 
            src={image} 
            sx={{ 
              width: 60, 
              height: 60, 
              mr: 2
            }} 
            variant="square"
          />
        </ListItemAvatar>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default ResultItem;
