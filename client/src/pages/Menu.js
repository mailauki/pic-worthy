import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

function Menu() {
  const history = useHistory()
  // const currentUser = { first_name: "Julie", username: "mailauki", image: "https://images.unsplash.com/photo-1659377229079-8f0b34c64077?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80" }
  const currentUser = null

  return (
    <div className="Menu">
      {!currentUser ? (
        <Button variant="contained" onClick={() => history.push('/login')}>Login</Button>
      ) : (
        <>
          <div className="menu-header">
            <h3>Hello, {currentUser.first_name}</h3>
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
          <Button variant="contained">Logout</Button>
        </>
      )}
    </div>
  )
}

export default Menu;
