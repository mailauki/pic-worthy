import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';

function Tags({ tags }) {
  return (
    <>
      {tags.map((tag) => 
        <Chip 
          label={tag.name} 
          component={Link} to={`/tags/${tag.id}`} 
          sx={{cursor: "pointer"}}
        />
      )}
    </>
  )
}

export default Tags;