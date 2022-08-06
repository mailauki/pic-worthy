import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Likes({ likes_total, likes }) {
  const [liked, setLiked] = useState(false)

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", width: "fit-content" }}>
        <h4>{likes_total}</h4>
        <IconButton onClick={() => setLiked((prev) => !prev)}>
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
    </>
  )
}

export default Likes;
