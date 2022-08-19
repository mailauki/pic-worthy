import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoginAlert from './LoginAlert';
import { useSelector, useDispatch } from 'react-redux';
import { likeAdded, likeDeleted } from '../features/photos/photosSlice';
import { IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function LikeBtn({ currentUser }) {
  const { id } = useParams()
  const photo = useSelector((state) => state.photos.entities)
  const dispatch = useDispatch()
  
  const foundLike = currentUser && currentUser.liked_photos ? currentUser.liked_photos.find((likedPhoto) => likedPhoto.id === Number(id)) : null
  const likeData = currentUser ? {user_id: currentUser.id, photo_id: Number(id)} : {}

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
      fetch(`/likes/${Number(id)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(() => {
        dispatch(likeDeleted())
        setLiked(false)
      })
    )
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", width: "fit-content" }}>
        <Typography variant="subtitle1" color={liked ? "primary" : "text.secondary"}>{photo.likes_total}</Typography>
        <IconButton onClick={handleLike}>
          {liked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
      
      <LoginAlert errors={errors} />
    </>
  )
}

export default LikeBtn;
