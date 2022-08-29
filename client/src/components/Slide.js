import { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useSwiper } from 'swiper/react';

function SlideTitle({ pathname }) {
  const swiper = useSwiper()

  const [tab, setTab] = useState("following")

  useEffect(() => {
    pathname ? setTab(pathname.split("/")[3]) : setTab("followees")
  }, [pathname])

  function handleTabChange(event, newValue) {
    setTab(newValue)
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', height: '48px', position: 'absolute', top: 0, zIndex: 2 }}>
      <Tabs
        value={tab} 
        onChange={handleTabChange}
        aria-label="following-tabs" 
        variant="fullWidth" 
      >
        <Tab 
          label="Following"
          value="followees" 
          onClick={() => swiper.slidePrev()}
        />
        <Tab 
          label="Followers"
          value="followers" 
          onClick={() => swiper.slideNext()}
        />
      </Tabs>
    </Box>
  )
}

export default SlideTitle;
