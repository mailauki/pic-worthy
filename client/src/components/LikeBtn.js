import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeAdded, likeDeleted } from '../features/photos/photosSlice';
import { IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function LikeBtn({ currentUser }) {
  const photo = useSelector((state) => state.photos.entities)
  const { id, likes_total } = photo
  const dispatch = useDispatch()

  const [foundLike, setFoundLike] = useState(null)
  const [likeData, setLikeData] = useState({})
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    currentUser && currentUser.liked_photos ? setFoundLike(currentUser.liked_photos.find((photo) => photo.id === id)) : setFoundLike(null)

    foundLike ? setLiked(true) : setLiked(false)

    currentUser ? setLikeData({user_id: currentUser.id, photo_id: id}) : setLikeData({})
  }, [currentUser, foundLike])

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

export default LikeBtn;
