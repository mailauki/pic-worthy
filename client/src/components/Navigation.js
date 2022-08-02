import { useState } from 'react';
import { useHistory } from "react-router";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TagIcon from '@mui/icons-material/Tag';
import MenuIcon from '@mui/icons-material/Menu';

function Navigation({ mobileView }) {
  const [value, setValue] = useState("home")
  const history = useHistory()

  const handleChange = (event, newValue) => {
    setValue(newValue)
    newValue === "home" ? history.push('/') : history.push(`/${newValue}`)
  }

  return (
    <div className="Navigation">
      { mobileView ? (
        <BottomNavigation
          // showLabels
          value={value}
          onChange={handleChange}
          style={{ 
            position: "fixed", 
            bottom: 0, 
            width: "100%", 
            minWidth: "400px" 
          }}
        >
          <BottomNavigationAction 
            label="Home" 
            value="home" 
            icon={<HomeIcon />}
          />
          <BottomNavigationAction 
            label="Search" 
            value="search" 
            icon={<SearchIcon />}
          />
          <IconButton
            aria-label="add"
            style={{ 
              backgroundColor: "#eee", 
              filter: "drop-shadow( 2px 2px 2px #aaa )", 
              postion: "absolute", 
              bottom: "4px", 
              width: 40, 
              height: 40, 
              margin: 6 
            }}
          >
            <AddIcon />
          </IconButton>
          <BottomNavigationAction 
            label="Tags" 
            value="tags" 
            icon={<TagIcon />}
          />
          <BottomNavigationAction 
            label="Menu" 
            value="menu" 
            icon={<MenuIcon />}
          />
        </BottomNavigation>
      ) : (
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider',
          minHeight: 'calc(100vh - 64px)' }}
        >
          <Tab 
            icon={<HomeIcon />} 
            label="Home" 
            value="home" 
            iconPosition="start" 
          />
          <Tab 
            icon={<SearchIcon />} 
            label="Search" 
            value="search" 
            iconPosition="start" 
          />
          <Tab 
            icon={<TagIcon />} 
            label="Tags" 
            value="tags" 
            iconPosition="start" 
          />
        </Tabs>
      ) }
    </div>
  )
}

export default Navigation;