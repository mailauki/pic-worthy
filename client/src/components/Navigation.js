import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Tabs, Tab, Fab } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TagIcon from '@mui/icons-material/Tag';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

function Navigation({ mobileView, pathname }) {
  let activePath = pathname.split("/")[1]
  let value = activePath === "" ? "home" : activePath

  const AddButton = styled(Fab)(({ theme }) => ({
    color: theme.palette.getContrastText(activePath === "add-photo" ? theme.palette.primary.main : theme.palette.neutral.lighter),
    backgroundColor: activePath === "add-photo" ? theme.palette.primary.main : theme.palette.neutral.lighter,
    '&:hover': {
      backgroundColor: activePath === "add-photo" ? theme.palette.primary.darker : theme.palette.neutral.darker,
    },
    bottom: 25, 
    margin: 10
  }))

  return (
    <div className="Navigation">
      { mobileView ? (
        <BottomNavigation
          value={value}
          // onChange={handleChange}
          sx={{ 
            position: "fixed", 
            bottom: 0, 
            width: "100%"
          }}
        >
          <BottomNavigationAction 
            label="Home" 
            value="home" 
            component={Link} to="/"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction 
            label="Search" 
            value="search" 
            component={Link} to="/search"
            icon={<SearchIcon />}
          />
          <AddButton
            aria-label="add"
            value="add" 
            component={Link} to="/add-photo"
            // onClick={handleClick}
          >
            <AddIcon />
          </AddButton>
          {/* <Fab 
            color="neutral" 
            aria-label="add" 
            component={Link} to="/add-photo"
          >
            <AddIcon />
          </Fab> */}
          <BottomNavigationAction 
            label="Tags" 
            value="tags" 
            component={Link} to="/tags"
            icon={<TagIcon />}
          />
          <BottomNavigationAction 
            label="Menu" 
            value="menu" 
            component={Link} to="/menu"
            icon={<MenuIcon />}
          />
        </BottomNavigation>
      ) : (
        <Tabs
          orientation="vertical"
          value={value}
          // onChange={handleChange}
          aria-label="Vertical tabs"
          sx={{ 
            borderRight: 1, 
            borderColor: 'divider',
            height: '100%'
          }}
        >
          <Tab 
            icon={<HomeIcon />} 
            label="Home" 
            value="home" 
            component={Link} to="/"
            iconPosition="start" 
          />
          <Tab 
            icon={<SearchIcon />} 
            label="Search" 
            value="search" 
            component={Link} to="/search"
            iconPosition="start" 
          />
          <Tab 
            icon={<TagIcon />} 
            label="Tags" 
            value="tags" 
            component={Link} to="/tags"
            iconPosition="start" 
          />
        </Tabs>
      ) }
    </div>
  )
}

export default Navigation;
