import { Button, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Switch, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import NightlightIcon from '@mui/icons-material/Nightlight';

function MenuButtonsList({ handleClick, checked, setChecked }) {
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton id="view-profile" onClick={handleClick}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="View My Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton id="edit-account" onClick={handleClick}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Account" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton id="delete-account" onClick={handleClick}>
            <ListItemIcon>
              <PersonOffIcon />
            </ListItemIcon>
            <ListItemText primary="Delete Account" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <ListItem>
        <ListItemIcon>
          <NightlightIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-dark" primary="Dark Mode" />
        <Switch
          edge="end"
          color="primary"
          onChange={handleToggle('dark')}
          checked={checked.indexOf('dark') !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-dark',
          }}
        />
      </ListItem>
    </>
  )
}

export default MenuButtonsList;
