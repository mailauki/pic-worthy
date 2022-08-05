import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags } from './tagsSlice';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

function Tags() {
  const tags = useSelector((state) => state.tags.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTags())
  }, [dispatch])

  return (
    <>
      <h1>Tags</h1>
      {tags.length > 0 ? (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={204}>
          {tags.map(tag => (
            <ImageListItem key={tag.id}>
              <img
                src={`${tag.photos[0].image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${tag.photos[0].image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={tag.photos[0].description}
                loading="lazy"
              />
              <ImageListItemBar position="below" title={`# ${tag.name}`} />
            </ImageListItem>
          ))}
        </ImageList>
        ) : (
          <></>
        )}
    </>
  )
}

export default Tags;