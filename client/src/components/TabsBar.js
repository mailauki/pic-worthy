import { Box, Tabs, Tab } from '@mui/material';
import { useSwiper } from 'swiper/react';

function TabsBar({ tabBarInfo, tab, handleChange }) {
  const swiper = useSwiper()
  
  return (
    <Box 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider', 
        width: '100%', 
        height: '48px' 
      }}
    >
      <Tabs 
        value={tab} 
        onChange={handleChange} 
        variant="fullWidth" 
      >
        {tabBarInfo.map((info, index) => (
          <Tab 
            key={info.value} 
            label={info.label} 
            value={info.value} 
            onClick={() => index > 0 ? swiper.slideNext() : swiper.slidePrev()}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default TabsBar;