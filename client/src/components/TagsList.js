import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';

function TagsList({ tags }) {
  return (
    <>
      {tags.map((tag) => 
        <Chip 
          key={tag.id}
          label={tag.name} 
          component={Link} to={`/tags/${tag.id}`} 
          sx={{cursor: "pointer", mr: 1}}
        />
      )}
    </>
  )
}

export default TagsList;