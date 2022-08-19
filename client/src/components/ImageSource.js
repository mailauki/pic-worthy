import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

function ImageSource() {
  const photo = useSelector((state) => state.photos.entities)

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
        padding: "10px",
        mt: "10px",
        mb: "10px",
        fontSize: "14px"
      }}
    >
      <Link to={{ pathname: photo.image}} target='_blank'>
        <Typography 
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          Image Source
        </Typography>
      </Link>
    </Box>
  )
}

export default ImageSource;
