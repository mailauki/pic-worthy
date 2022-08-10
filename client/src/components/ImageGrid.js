import { Link } from 'react-router-dom';
import SkeletonGrid from './SkeletonGrid';
import { ImageList, ImageListItem } from '@mui/material';

function ImageGrid({ user, photos }) {
  return (
    photos && photos.length > 0 ? (
      <ImageList
        sx={{ width: 350 }}
        cols={3}
        rowHeight={(350 / 3)}
      >
        {photos.map((photo) => (
          <ImageListItem key={photo.id} component={Link} to={`/photos/${photo.id}`}>
            <img
              src={`${photo.image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${photo.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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

export default ImageGrid;