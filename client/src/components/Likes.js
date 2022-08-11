import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhoto, likeAdded, likeDeleted } from '../features/photos/photosSlice';
import { IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Likes({currentUser }) {
  const photo = useSelector((state) => state.photos.entities)
  const { id, likes_total } = photo
  const dispatch = useDispatch()

  const findLike = currentUser ? currentUser.liked_photos.find((photo) => photo.id === id) : null
  const foundLike = findLike ? true : false
  const [liked, setLiked] = useState(foundLike)

  function handleLike(event) {
    const likeData = currentUser ? {user_id: currentUser.id, photo_id: id} : null
    
    !liked ? (
      fetch("/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likeData)
      })
        .then((r) => {
          if (r.ok) {
            r.json().then((data) => {
              dispatch(likeAdded())
              setLiked(true)
            })
          } else {
            r.json().then((err) => console.log(err.errors))
          }
        })
    ) : (
      fetch(`/likes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((data) => {
          dispatch(likeDeleted())
          setLiked(false)
        })
    )
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", width: "fit-content" }}>
        <Typography variant="subtitle1" color={liked ? "primary" : "text.secondary"}>{likes_total}</Typography>
        <IconButton onClick={handleLike}>
          {liked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
    </>
  )
}

export default Likes;
