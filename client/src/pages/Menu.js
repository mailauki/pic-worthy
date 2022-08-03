import { useHistory } from "react-router";
import { Button, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Switch } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import NightlightIcon from '@mui/icons-material/Nightlight';

function Menu({ currentUser, checked, setChecked }) {
  const history = useHistory()

  function handleLogout({ onLogout }) {
    fetch("/logout", {
      method: "DELETE"
    })
      .then((r) => {
        if(r.ok) {
          onLogout(null)
          history.push("/")
        }
      })
  }

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
    <div className="Menu">
      {!currentUser ? (
        <div>
          <Button 
            variant="contained" 
            onClick={() => history.push('/login')} 
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
          <Button 
            onClick={() => history.push('/signup')} 
            startIcon={<PersonAddIcon />}
          >
            Signup
          </Button>
        </div>
      ) : (
        <>
          <div className="menu-header">
            {currentUser.first_name ? <h3>Hello, {currentUser.first_name}</h3> : <h3>Hello</h3>}
            <Avatar 
              alt={currentUser.username} 
              src={currentUser.image} 
              sx={{ 
                width: 60, 
                height: 60, 
                postition: "absolute", 
                top: 30, 
                right: 20,
                zIndex: 1
              }}
            >
              {currentUser.username[0]}
            </Avatar>
          </div>
          <Button 
            variant="contained" 
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="View My Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
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
              onChange={handleToggle('dark')}
              checked={checked.indexOf('dark') !== -1}
              inputProps={{
                'aria-labelledby': 'switch-list-label-dark',
              }}
            />
          </ListItem>
        </>
      )}
    </div>
  )
}

export default Menu;
