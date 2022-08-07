import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from './photosSlice';
import Anchor from '../../components/Links';
import { ImageList, ImageListItem, ImageListItemBar, IconButton, Chip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function Photos() {
  const photos = useSelector((state) => state.photos.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPhotos())
  }, [dispatch])

  return (
    <>
      <h1>Photos</h1>
      {photos.length > 0 ? (
        <ImageList cols={1}>
          {photos.map(photo => (
            <ImageListItem key={photo.id}>
              <img
                src={`${photo.image}?w=248&fit=crop&auto=format`}
                srcSet={`${photo.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={photo.description}
                loading="lazy"
              />
              <ImageListItemBar
                title={<Anchor name={`@${photo.user.username}`} to={`/users/${photo.user.id}`} />}
                subtitle={photo.tags.map((tag) => 
                  <Chip 
                    label={tag.name} 
                    component={Link} to={`/tags/${tag.id}`}
                    sx={{backgroundColor: 'rgba(255, 255, 255, 0.54)', color: 'primary.contrastText', cursor: "pointer"}} 
                  />
                )}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${photo.tags[0]}`}
                    component={Link} to={`/photos/${photo.id}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <h1>Nothing Here Yet</h1>
      )}
    </>
  )
}

export default Photos;