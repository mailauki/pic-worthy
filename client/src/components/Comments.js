import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { commentAdded, commentDeleted } from '../features/photos/photosSlice';
import { IconButton, List, ListItem, ListItemAvatar, ListItemText, Avatar, Box, InputBase } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

function Comments({ currentUser }) {
  const photo = useSelector((state) => state.photos.entities)
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")
  const [errors, setErrors] = useState([])
  const commentData = currentUser ? {text: comment, user_id: currentUser.id, photo_id: photo.id} : {}

  function handleAddComment() {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commentData)
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          dispatch(commentAdded(data))
          setComment("")
        })
      } else {
        r.json().then((err) => {
          setErrors(err.errors)
        })
      }
    })
  }

  function handleDeleteComment(event) {
    const comment_id = event.currentTarget.parentNode.id

    fetch(`/comments/${comment_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    
    dispatch(commentDeleted(comment_id))
  }

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{ width: '100%' }}
      >
      {photo.comments && photo.comments.length > 0 ? (
        photo.comments.map((comment) => (
          <ListItem
            key={comment.id}
            id={comment.id}
            sx={{
              width: '100%',
              pr: "10%",
              pl: "10%"
            }}
          >
            <ListItemAvatar>
              <Avatar 
                alt={comment.username} 
                src={comment.avatar} 
              >
                {comment.username ? comment.username[0].toUpperCase() : ""}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={comment.text} secondary={`@${comment.username}`} />
            {currentUser && comment.username === currentUser.username ? (
              <IconButton 
                edge="end" 
                aria-label="delete-comment"
                sx={{ ml: "20px" }}
                onClick={handleDeleteComment}
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </ListItem>
        ))
      ) : (
        <></>
      )}
      </Box>
      {currentUser ? (
        <ListItem 
          sx={{ 
            backgroundColor: 'divider', 
            pl: "10%",
            pr: "10%"
          }}
        >
          <ListItemAvatar>
            <Avatar 
              alt={currentUser.username} 
              src={currentUser.avatar} 
            >
              {currentUser.username ? currentUser.username[0].toUpperCase() : ""}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={
            <InputBase
              value={comment}
              placeholder="add new comment..."
              inputProps={{ 'aria-label': 'add-comment' }}
              onChange={(event) => setComment(event.target.value)}
              sx={{ 
                ml: 1,
                pl: 1, 
                flex: 1, 
                backgroundColor: 'primary.box'
              }}
              fullWidth
            />
          } />
          <IconButton 
            edge="end" 
            aria-label="submit-comment"
            sx={{ ml: "20px" }}
            onClick={handleAddComment}
          >
            <ArrowCircleUpIcon />
          </IconButton>
        </ListItem>
      ) : (
        <></>
      )}
    </List>
  )
}

export default Comments;
