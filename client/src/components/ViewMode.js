import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ViewDayIcon from '@mui/icons-material/ViewDay';

function ViewMode({ active, handleViewMode }) {
  return (
    <BottomNavigation 
      value={active} 
      onChange={handleViewMode}
      sx={{
        width: "100%",
      }}
    >
      <BottomNavigationAction 
        label="Grid" 
        value="grid" 
        icon={<ViewModuleIcon />}
      />
      <BottomNavigationAction 
        label="Quilt" 
        value="quilt" 
        icon={<ViewQuiltIcon />}
      />
      <BottomNavigationAction 
        label="List" 
        value="list" 
        icon={<ViewDayIcon />}
      />
    </BottomNavigation>
  )
}

export default ViewMode;
