import { useHistory } from "react-router";
import { AppBar, Toolbar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ mobileView, pathname }) {
  const history = useHistory()
  let activePath = pathname.split("/")[1]

  function handleClick(event) {
    history.push(event.currentTarget.value)
  }

  return (
    mobileView ? (
      <></>
    ) : (
      <div className="Header">
        <AppBar position="static" color="inherit">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <h3>Header</h3>
            <div>
              <IconButton 
                aria-label="add a photo" 
                color={activePath === "add" ? "primary" : "inherit"}
                value="add" 
                onClick={handleClick}
              >
                <AddIcon />
              </IconButton>
              <IconButton 
                aria-label="menu" 
                color={activePath === "menu" ? "primary" : "inherit"}
                value="menu" 
                onClick={handleClick}
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
