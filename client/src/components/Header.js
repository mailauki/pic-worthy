import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Tooltip } from '@mui/material';
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
            <Typography 
              variant="h3" 
              component="h3"
              sx={{fontSize: 24}}
            >
              PicWorthy
            </Typography>
            <div>
              <Tooltip title="Add Photo" arrow>
                <IconButton 
                  aria-label="add a photo" 
                  color={activePath === "add-photo" ? "primary" : "inherit"}
                  component={Link} to="/add-photo"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Menu" arrow>
                <IconButton 
                  aria-label="menu" 
                  color={activePath === "menu" ? "primary" : "inherit"}
                  component={Link} to="/menu"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  )
}

export default Header;
