import { useHistory } from "react-router";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ mobileView }) {
  const history = useHistory()

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
                size="large"
                edge="start"
                color="inherit"
                aria-label="add"
                sx={{ mr: 2 }}
                onClick={() => history.push("/add")}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => history.push("/menu")}
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