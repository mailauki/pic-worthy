import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeaturedPhotos } from '../features/photos/featuredPhotosSlice';
import Anchor from './Anchor';
import CarouselBtns from './CarouselBtns';
import { MobileStepper, ImageList, ImageListItem, ImageListItemBar, Skeleton, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Carousel() {
  const featuredPhotos = useSelector((state) => state.featuredPhotos.entities)
  const featuredStatus = useSelector((state) => state.featuredPhotos.status)
  const dispatch = useDispatch()

  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = featuredPhotos.length
  const activePhoto = featuredPhotos[activeStep]

  useEffect(() => {
    dispatch(fetchFeaturedPhotos())
  }, [dispatch])

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
          <Swiper 
            slidesPerView={"auto"}
            // grabCursor={true}
            loop={true}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setActiveStep(swiper.realIndex)}
            // style={{
            //   width: "100%",
            //   // height: 350,
            //   // position: "absolute",
            //   // top: 0
            // }}
          >
            <MobileStepper
              variant="dots"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              sx={{ 
                backgroundColor: "rgba(0,0,0,0)",
                mr: 1,
                pb: 2.2,
                height: 350,
                alignItems: "end",
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
                pointerEvents: "none"
              }}
            />
            
            <CarouselBtns />

            {featuredPhotos.map((photo) => {
              return (
                <SwiperSlide>
                  {/* <ImageList 
                    sx={{ 
                      width: "100%", 
                      height: "100%",
                      margin: 0
                    }}
                    cols={1}
                    rowHeight={350}
                  >
                    <ImageListItem 
                      key={photo.id}
                      sx={{ width: "100%", height: "100%" }} 
                      component={Link} to={`/photos/${activePhoto.id}`}
                    >
                      <img
                        src={`${photo.image}?h=350&fit=crop&auto=format`}
                        srcSet={`${photo.image}?h=350&fit=crop&auto=format&dpr=2 2x`}
                        alt={photo.description}
                        loading="lazy"
                        style={{ width: "100%", height: "100%" }}
                      />
                      <ImageListItemBar
                        title={<Anchor name={`@${photo.user.username}`} to={`/users/${photo.user.id}`} />}
                        sx={{
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                          zIndex: 2
                        }}
                      />
                    </ImageListItem>
                  </ImageList> */}
                  <Link to={`/photos/${activePhoto.id}`}>
                    <img  
                      src={`${photo.image}?h=350&fit=crop&auto=format`} 
                      alt={photo.description}
                      style={{ width: "100%", height: 350, zIndex: 0 }} 
                    />
                  </Link>

                  <Box
                    sx={{
                      width: "100%",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      position: "absolute",
                      top: "310px",
                      pl: "10px",
                      color: "#fff",
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                      zIndex: 1
                    }}
                  >
                    <Anchor name={`@${photo.user.username}`} to={`/users/${photo.user.id}`} />
                  </Box>
                  
                </SwiperSlide>
              )
            })}

          </Swiper>
        </>
      ) : (
        <Skeleton 
          variant="rectangular"  
          width="100%" height="100%"
          animation="wave"
          sx={{ 
            position: "absolute",
            top: 0
          }}
        />
      )}
    </div>
  )
}

export default Carousel;