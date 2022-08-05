import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from './photosSlice';
import { ImageList, ImageListItem, ImageListItemBar, IconButton, Chip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function Photos() {
  const photos = useSelector((state) => state.photos.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPhotos())
  }, [dispatch])

  return (
    <div>
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
                title={`@${photo.user.username}`}
                subtitle={photo.tags.map( tag => <Chip label={tag.name} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.54)' }} /> )}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${photo.tags[0]}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        ) : (
          <></>
        )}
    </div>
  )
}

export default Photos;