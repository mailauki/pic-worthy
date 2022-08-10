import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Anchor from './Anchor';
import { MobileStepper, ImageList, ImageListItem, ImageListItemBar, IconButton, Skeleton } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function Carousel() {
  const [photos, setPhotos] = useState([])
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = photos.length
  const activePhoto = photos[activeStep]

  useEffect(() => {
    fetch("/feature")
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setPhotos(data)
        })
      }
    })
  }, [])

  function handleNext() {
    if(activeStep === maxSteps - 1) {
      setActiveStep(0)
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  function handleBack() {
    if(activeStep === 0) {
      setActiveStep(maxSteps - 1)
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  }

  return (
    <>
      <div 
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          top: 145,
          zIndex: 1,
          
        }}
        className="arrow-buttons"
      >
        <IconButton 
          aria-label="back"
          onClick={handleBack} 
          color="primary"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton 
          aria-label="next"
          onClick={handleNext}
          color="primary"
        >
          <KeyboardArrowRight />
        </IconButton>
      </div>
      {activePhoto ? (
        // <img src={photos[activeStep].image} />
        <ImageList 
          sx={{ 
            width: "100%", 
            height: 350, 
            // marginTop: "-35px", 
            position: "relative", 
            top: "-56px" 
          }}
          cols={1}
          rowHeight={350}
        >
          <ImageListItem 
            key={activePhoto.id}
            sx={{ width: "100%", height: 350 }} 
            component={Link} to={`/photos/${activePhoto.id}`}
          >
            <img
              src={`${activePhoto.image}?w=248&fit=crop&auto=format`}
              srcSet={`${activePhoto.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={activePhoto.description}
              loading="lazy"
              style={{ width: "100%", height: 350 }}
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
                    backgroundColor: "rgba(0,0,0,0)"
                  }}
                />
              }
            />
          </ImageListItem>
        </ImageList>
      ) : (
        <Skeleton 
          variant="rectangular" 
          width="100%" height={350} 
          sx={{ 
            position: "relative", 
            top: "-56px" 
          }}
        />
      )}
    </>
  )
}

export default Carousel;