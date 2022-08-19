import { IconButton, Box } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useSwiper } from "swiper/react";

function CarouselBtns() {
  const swiper = useSwiper()

  function handleNext() {
    swiper.slideNext()
  }

  function handleBack() {
    swiper.slidePrev()
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: 350,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: 0,
        zIndex: 2,
        pointerEvents: "none"
      }}
    >
      <IconButton 
        aria-label="back"
        onClick={handleBack} 
        color="primary"
        size="large"
        sx={{ml: 1, zIndex: 3, pointerEvents: "auto"}}
      >
        <KeyboardArrowLeft fontSize="inherit" />
      </IconButton>
      <IconButton 
        aria-label="next"
        onClick={handleNext}
        color="primary"
        size="large"
        sx={{mr: 1, zIndex: 3, pointerEvents: "auto"}}
      >
        <KeyboardArrowRight fontSize="inherit" />
      </IconButton>
    </Box>
  )
}

export default CarouselBtns;

