import { useState } from 'react';
import { useHistory } from 'react-router';
import MenuHeader from '../components/MenuHeader';
import MenuButtonsList from '../components/MenuButtonsList';
import DeleteAlert from '../components/DeleteAlert';
import { Button, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Menu({ currentUser, onLogout, checked, setChecked }) {
  const history = useHistory()
  const [open, setOpen] = useState(false)

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
          <MenuHeader currentUser={currentUser} onLogout={onLogout} />

          <MenuButtonsList handleClick={handleClick} checked={checked} setChecked={setChecked} />
          
          <DeleteAlert open={open} handleClose={handleClose} handleDelete={handleDelete} />
        </>
      )}
    </div>
  )
}

export default Menu;
