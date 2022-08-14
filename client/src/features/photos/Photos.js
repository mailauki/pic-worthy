import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMostRecentPhotos } from './photosSlice';
import Anchor from '../../components/Anchor';
import { ImageList, ImageListItem, ImageListItemBar, IconButton, Chip, Skeleton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function Photos() {
  const dispatch = useDispatch()
  const photos = useSelector((state) => state.photos.entities)

  useEffect(() => {
    dispatch(fetchMostRecentPhotos())
  }, [dispatch])

  return (
    <>
      <h3>Most Recent</h3>
      {photos.length > 0 ? (
        <ImageList
          sx={{ width: 350 }}
          cols={1}
          rowHeight={350}
        >
          {photos.map(photo => (
            <ImageListItem key={photo.id}>
              <img
                src={`${photo.image}?w=350&h=350&fit=crop&auto=format`}
                srcSet={`${photo.image}?w=350&h=350&fit=crop&auto=format&dpr=2 2x`}
                alt={photo.description}
                loading="lazy"
              />
              <ImageListItemBar
                title={<Anchor name={`@${photo.user.username}`} to={`/users/${photo.user.id}`} />}
                subtitle={photo.tags.map((tag) => 
                  <Chip 
                    label={tag.name} 
                    component={Link} to={`/tags/${tag.id}`}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.54)', 
                      color: 'primary.contrastText', 
                      cursor: "pointer",
                      mr: 1
                    }} 
                  />
                )}
                actionIcon={
                  <IconButton
                    sx={{color: 'rgba(255, 255, 255, 0.54)', mr: 1}}
                    aria-label={`info about ${photo.id}`}
                    component={Link} to={`/photos/${photo.id}`}
                    size="large"
                  >
                    <InfoIcon fontSize="inherit" />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Skeleton 
          variant="rectangular" 
          width={350} height={350} 
          animation="wave"
        />
      )}
    </>
  )
}

export default Photos;