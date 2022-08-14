import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SkeletonGrid from '../../components/SkeletonGrid';
import { ImageList, ImageListItem } from '@mui/material';

function Tag() {
  const { id } = useParams()
  const [tag, setTag] = useState({})

  useEffect(() => {
    fetch(`/tags/${id}`)
    .then((r) => r.json())
    .then((data) => {
      setTag(data)
    })
  }, [id])

  return (
    <>
      <h1># {tag.name}</h1>
      {tag.photos && tag.photos.length > 0 ? (
        <ImageList
          sx={{ width: 350 }}
          cols={3}
          rowHeight={(350 / 3)}
        >
          {tag.photos.map((photo) => (
            <ImageListItem key={photo.id} component={Link} to={`/photos/${photo.id}`}>
              <img
                src={`${photo.image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${photo.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={tag.name}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <SkeletonGrid />
      )}
    </>
  )
}

export default Tag;