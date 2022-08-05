import { ImageList, ImageListItem } from '@mui/material';

function ImageGrid({ user }) {

  return (
    user.photos && user.photos.length > 0 ? (
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {user.photos.map((photo) => (
          <ImageListItem key={photo.id}>
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
      <></>
    )
  )
}

export default ImageGrid;