import { Chip } from '@mui/material';

function Tags({ tags }) {
  return (
    <>
      {tags.map((tag) => 
        <Chip 
          label={tag.name} 
          // sx={{ backgroundColor: 'rgba(255, 255, 255, 0.54)' }} 
        />
      )}
    </>
  )
}

export default Tags;