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
    color: activePath === "add-photo" ? theme.palette.getContrastText(theme.palette.primary.main) : theme.palette.text.secondary,
    backgroundColor: activePath === "add-photo" ? theme.palette.primary.main : theme.palette.neutral.lighter,
    '&:hover': {
      backgroundColor: activePath === "add-photo" ? theme.palette.primary.darker : theme.palette.neutral.darker,
    },
    bottom: 25
  }))

  return (
    <div className="Navigation">
      { mobileView ? (
        <BottomNavigation
          value={value}
          sx={{ 
            zIndex: 1,
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
          <div style={{ margin: 10, width: 'fit-content' }}>
            <AddButton
              aria-label="add"
              value="add" 
              component={Link} to="/add-photo"
            >
              <AddIcon />
            </AddButton>
          </div>
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
          aria-label="Vertical tabs"
          sx={{ 
            zIndex: 1,
            borderRight: 1, 
            borderColor: "divider",
            height: "calc(100vh - 66px)",
            position: "sticky",
            top: "66px"
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
