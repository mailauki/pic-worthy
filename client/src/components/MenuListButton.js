import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

function MenuListButton({ id, text, handleClick, icon }) {
  return (
    <ListItem disablePadding>
      <ListItemButton id={id} onClick={handleClick}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default MenuListButton;