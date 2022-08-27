import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags } from '../features/tags/tagsSlice';
import Anchor from '../components/Anchor';
import SkeletonGrid from '../components/SkeletonGrid';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

function Tags() {
  const tags = useSelector((state) => state.tags.entities)
  const tagsStatus = useSelector((state) => state.tags.status)
  const dispatch = useDispatch()

  console.log(tagsStatus)

  useEffect(() => {
    dispatch(fetchTags())
  }, [dispatch])

  return (
    <div className="Tags">
      {tags.length > 0 && tagsStatus === "idle" ? (
        <ImageList 
          sx={{ width: 350 }}
          cols={3}
          rowHeight={(350 / 3) + 45}
        >
          {tags.map((tag) => (
            <ImageListItem 
              key={tag.id} 
              component={Link} to={`/tags/${tag.id}`}
              sx={{
                filter: 'opacity(0.8)',
                '&:hover': {
                  filter: 'opacity(1)',
                  div: {
                    color: 'primary.main'
                  }
                }
              }}
            >
              {tag.photos && tag.photos.length > 0 ? (
                <img
                  src={`${tag.photos.at(-1).image}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${tag.photos.at(-1).image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={tag.name}
                  loading="lazy"
                />
              ) : (
                <img
                  src="https://dummyimage.com/164x164/eee/eee/?w=164&h=164&fit=crop&auto=format"
                  srcSet="https://dummyimage.com/164x164/eee/eee/?w=164&h=164&fit=crop&auto=format&dpr=2 2x"
                  alt={tag.name}
                  loading="lazy"
                />
              )}
              <ImageListItemBar 
                position="below"
                sx={{ color: "text.secondary", textAlign: "center" }}
                // title={<Anchor name={`# ${tag.name}`} to={`/tags/${tag.id}`} />} 
                title={`# ${tag.name}`}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <SkeletonGrid />
      )}
    </div>
  )
}

export default Tags;