import MenuListButton from './MenuListButton';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Switch } from '@mui/material';
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
        <MenuListButton 
          id="view-profile" 
          text="View My Profile" 
          handleClick={handleClick} 
          icon={<PersonIcon />}
        />
        <MenuListButton 
          id="edit-account" 
          text="Edit Account" 
          handleClick={handleClick} 
          icon={<ManageAccountsIcon />}
        />
      </List>

      <Divider />

      <List>
        <MenuListButton 
          id="delete-account" 
          text="Delete Account" 
          handleClick={handleClick} 
          icon={<PersonOffIcon />}
        />
      </List>

      <Divider />

      <List>
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
      </List>
      
    </>
  )
}

export default MenuButtonsList;
