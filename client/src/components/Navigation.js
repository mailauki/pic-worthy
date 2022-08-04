import { useHistory } from "react-router";
import { BottomNavigation, BottomNavigationAction, Tabs, Tab, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TagIcon from '@mui/icons-material/Tag';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

function Navigation({ mobileView, pathname }) {
  let activePath = pathname.split("/")[1]
  let value = activePath === "" ? "home" : activePath
  const history = useHistory()

  function handleChange(event, newValue) {
    newValue === "home" ? history.push('/') : history.push(`/${newValue}`)
  }
  
  function handleClick(event) {
    history.push(event.currentTarget.value)
  }

  const AddButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.neutral.lighter),
    backgroundColor: theme.palette.neutral.lighter,
    '&:hover': {
      backgroundColor: theme.palette.neutral.darker,
    },
    boxShadow: `2px 2px 4px ${theme.palette.neutral.darker}`,
    width: '45px',
    height: '45px',
    bottom: 16, 
    margin: 10
  }))

  return (
    <div className="Navigation">
      { mobileView ? (
        <BottomNavigation
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
          <AddButton
            aria-label="add"
            value="add" 
            onClick={handleClick}
          >
            <AddIcon />
          </AddButton>
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
