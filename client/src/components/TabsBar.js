import { Box, Tabs, Tab } from '@mui/material';

function TabsBar({ tabBarInfo, tab, handleChange }) {
  
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', height: '48px' }}>
      <Tabs 
        value={tab} 
        onChange={handleChange} 
        variant="fullWidth" 
      >
        {tabBarInfo.map((info) => <Tab label={info.label} value={info.value} />)}
      </Tabs>
    </Box>
  )
}

export default TabsBar;