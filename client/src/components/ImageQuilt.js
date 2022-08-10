import { Link } from 'react-router-dom';
import SkeletonGrid from './SkeletonGrid';
import { ImageList, ImageListItem } from '@mui/material';

function ImageQuilt({ user, photos }) {
  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    }
  }

  const quiltedPhotos = photos.map((photo, index) => {
    if (index % 6 === 0 || index % 6 === 6 -1) {
      return {...photo, rows: 2, cols: 2}
    } 
    else if (index % 6 === 6 - 4 || index % 6 === 6 - 2) {
      return {...photo, rows: 2}
    }
    else if (index % 6 === 6 - 3) {
      return {...photo, cols: 2}
    }
    else {
      return photo
    }
  })

  return (
    photos && photos.length > 0 ? (
      <ImageList
        sx={{ width: 350 }}
        cols={3}
        rowHeight={(350 / 3)}
        variant="quilted"
      >
        {quiltedPhotos.map((photo) => (
          <ImageListItem 
            key={photo.id} 
            cols={photo.cols || 1} 
            rows={photo.rows || 1} 
            component={Link} to={`/photos/${photo.id}`}
          >
            <img
              {...srcset(photo.image, 164, photo.rows, photo.cols)}
              alt={user.username}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    ) : (
      <SkeletonGrid />
    )
  )
}

export default ImageQuilt;
