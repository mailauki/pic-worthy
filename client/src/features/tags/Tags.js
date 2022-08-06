import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags } from './tagsSlice';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { styled } from '@mui/material/styles';

function Tags() {
  const tags = useSelector((state) => state.tags.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTags())
  }, [dispatch])

  const TagName = styled(ImageListItemBar)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.neutral.lighter),
    // color: theme.palette.neutral.darker,
    '&:hover': {
      color: theme.palette.primary.main
    },
    textAlign: "center",
    textDecoration: "none"
  }))

  return (
    <>
      <h1>Tags</h1>
      {tags.length > 0 ? (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={208}>
          {tags.map(tag => (
            <ImageListItem key={tag.id} component={Link} to={`/tags/${tag.id}`}>
              {tag.photos.length > 0 ? (
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
              <TagName position="below" title={`# ${tag.name}`} />
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