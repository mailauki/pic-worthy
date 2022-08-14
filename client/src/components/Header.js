import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ mobileView, pathname }) {
  let activePath = pathname.split("/")[1]

  return (
    mobileView ? (
      <></>
    ) : (
      <div className="Header">
        <AppBar position="static" color="inherit">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <h3>PicWorthy</h3>
            <div>
              <IconButton 
                aria-label="add a photo" 
                color={activePath === "add-photo" ? "primary" : "inherit"}
                component={Link} to="/add-photo"
              >
                <AddIcon />
              </IconButton>
              <IconButton 
                aria-label="menu" 
                color={activePath === "menu" ? "primary" : "inherit"}
                component={Link} to="/menu"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  )
}

export default Header;
