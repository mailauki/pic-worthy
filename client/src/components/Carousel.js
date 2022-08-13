import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeaturedPhotos } from '../features/photos/featuredPhotosSlice';
import Anchor from './Anchor';
import { MobileStepper, ImageList, ImageListItem, ImageListItemBar, IconButton, Skeleton, Box } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function Carousel() {
  const featuredPhotos = useSelector((state) => state.featuredPhotos.entities)
  const featuredStatus = useSelector((state) => state.featuredPhotos.status)
  const dispatch = useDispatch()

  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = featuredPhotos.length
  const activePhoto = featuredPhotos[activeStep]

  const [slide, setSlide] = useState("slide-left")

  useEffect(() => {
    dispatch(fetchFeaturedPhotos())
  }, [dispatch])

  function handleNext() {
    if(activeStep === maxSteps - 1) {
      setActiveStep(0)
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    setSlide("slide-left")
  }

  function handleBack() {
    if(activeStep === 0) {
      setActiveStep(maxSteps - 1)
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
    setSlide("slide-right")
  }

  return (
    <div 
      style={{
        width: "100%",
        height: 350,
        position: "relative",
        top: 0
      }}
    >
      {featuredStatus === "idle" && activePhoto ? (
        <>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              top: 0,
              zIndex: 1,
              pointerEvents: "none"
            }}
          >
            <IconButton 
              aria-label="back"
              onClick={handleBack} 
              color="primary"
              size="large"
              sx={{ml: 1, zIndex: 2, pointerEvents: "auto"}}
            >
              <KeyboardArrowLeft fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="next"
              onClick={handleNext}
              color="primary"
              size="large"
              sx={{mr: 1, zIndex: 2, pointerEvents: "auto"}}
            >
              <KeyboardArrowRight fontSize="inherit" />
            </IconButton>
          </Box>

          <ImageList 
            sx={{ 
              width: "100%", 
              height: "100%", 
              position: "absolute",
              top: 0,
              margin: 0
            }}
            cols={1}
            rowHeight={350}
          >
            <ImageListItem 
              key={activePhoto.id}
              sx={{ width: "100%", height: "100%" }} 
              component={Link} to={`/photos/${activePhoto.id}`}
            >
              <img
                src={`${activePhoto.image}?w=350&fit=crop&auto=format`}
                srcSet={`${activePhoto.image}?w=350&fit=crop&auto=format&dpr=2 2x`}
                alt={activePhoto.description}
                loading="lazy"
                style={{ width: "100%", height: "100%" }}
                className={slide}
              />
              <ImageListItemBar
                title={<Anchor name={`@${activePhoto.user.username}`} to={`/users/${activePhoto.user.id}`} />}
                actionIcon={
                  <MobileStepper
                    variant="dots"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    sx={{ 
                      backgroundColor: "rgba(0,0,0,0)",
                      mr: 1
                    }}
                  />
                }
                sx={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  zIndex: 2
                }}
              />
            </ImageListItem>
          </ImageList>
        </>
      ) : (
        <Skeleton 
          variant="rectangular" 
          // width="100%" height={350} 
          width="100%" height="100%"
          animation="wave"
          sx={{ 
            // position: "relative", 
            // top: "-56px", 
            position: "absolute",
            top: 0
          }}
        />
      )}
    </div>
  )
}

export default Carousel;