import { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Switch, Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import NightlightIcon from '@mui/icons-material/Nightlight';

function Menu({ currentUser, onLogout, checked, setChecked }) {
  const history = useHistory()
  const [open, setOpen] = useState(false)

  function handleLogout() {
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

  function handleClick(event) {
    switch(event.currentTarget.id) {
      case "view-profile":
        history.push(`/users/${currentUser.id}`)
        break
      case "edit-account":
        history.push("/edit-account")
        break
      case "delete-account":
        setOpen(true)
        break
    }
  }

  function handleClose() {
    setOpen(false)
  }

  function handleDelete() {
    setOpen(false)

    fetch(`/users/${currentUser.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })

    onLogout(null)
    history.push("/")
  }

  return (
    <div className="Menu">
      {!currentUser ? (
        <Box
          className="Login-Signup"
        >
          <Button 
            variant="contained" 
            onClick={() => history.push('/login')} 
            startIcon={<LoginIcon />}
            size="large"
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => history.push('/signup')} 
            startIcon={<PersonAddIcon />}
            size="large"
          >
            Signup
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: "center",
              backgroundColor: 'divider',
            }}
          >
            {currentUser.first_name ? (
              <Typography 
                variant="h3" 
                component="h3"
                sx={{ fontSize: 24 }}
              >
                Hello, {currentUser.first_name}
              </Typography>
            ) : (
              <Typography 
                variant="h3" 
                component="h3"
                sx={{ fontSize: 24 }}
              >
                Hello
              </Typography>
            )}
            {!currentUser ? (
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  postition: "absolute", 
                  top: 30, 
                  right: 20,
                  zIndex: 1
                }}
              />
            ) : (
              <Avatar 
                alt={currentUser.username} 
                src={currentUser.avatar} 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  postition: "absolute", 
                  top: 30, 
                  right: 20,
                  zIndex: 1
                }}
              >
                {currentUser.username ? currentUser.username[0].toUpperCase() : ""}
              </Avatar>
            )}
          </Box>

          <Button 
            variant="contained" 
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            size="large"
          >
            Logout
          </Button>

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

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-delete-title"
            aria-describedby="alert-delete-description"
          >
            <DialogTitle id="alert-delete-title">
              {"Are you sure you want to delete your account?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-delete-description">
                Deleting your account will permanently delete your profile and everything accociated with it, including all photos and comments.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleDelete} autoFocus color="error">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  )
}

export default Menu;
