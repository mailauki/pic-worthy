import { useState, useEffect } from 'react';
import LoginAlert from './LoginAlert';
import { useSelector, useDispatch } from 'react-redux';
import { likeAdded, likeDeleted } from '../features/photos/photosSlice';
import { IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function LikeBtn({ currentUser }) {
  const photo = useSelector((state) => state.photos.entities)
  const { id, likes_total } = photo
  const dispatch = useDispatch()
  
  const foundLike = currentUser && currentUser.liked_photos ? currentUser.liked_photos.find((likedPhoto) => likedPhoto.id === id) : null
  const likeData = currentUser ? {user_id: currentUser.id, photo_id: id} : {}

  const [liked, setLiked] = useState(false)
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    setLiked(foundLike ? true : false)
  }, [foundLike])

  function handleLike(event) {
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
          r.json().then((err) => setErrors(err.errors))
        }
      })
    ) : (
      fetch(`/likes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            dispatch(likeDeleted())
            setLiked(false)
          })
        } else {
          r.json().then((err) => setErrors(err.errors))
        }
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
      
      <LoginAlert errors={errors} />
    </>
  )
}

export default LikeBtn;
