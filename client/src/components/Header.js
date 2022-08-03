import { useHistory } from "react-router";
import { AppBar, Toolbar, BottomNavigation, BottomNavigationAction, Tabs, Tab, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TagIcon from '@mui/icons-material/Tag';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ mobileView, pathname }) {
  const history = useHistory()
  let activePath = pathname.split("/")[1]
  let value = activePath

  const handleChange = (event, newValue) => {
    history.push(`/${newValue}`)
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
              <BottomNavigation
                value={value}
                onChange={handleChange}
              >
                <BottomNavigationAction 
                  label="Add" 
                  value="add" 
                  icon={<AddIcon />} 
                />
                <BottomNavigationAction 
                  label="Menu" 
                  value="menu" 
                  icon={<MenuIcon />} 
                />
              </BottomNavigation>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  )
}

export default Header;
