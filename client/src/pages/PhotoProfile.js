import { useEffect } from 'react';
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhoto } from '../features/photos/photosSlice';
import LikeBtn from '../components/LikeBtn';
import Tags from '../components/Tags';
import Anchor from '../components/Anchor';
import Comments from '../components/Comments';
import { IconButton, Skeleton, List, ListItem, ListItemAvatar, ListItemText, Avatar, Box, InputBase, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

function PhotoProfile({ currentUser }) {
  const { id } = useParams()
  const photo = useSelector((state) => state.photos.entities)
  const photoStatus = useSelector((state) => state.photos.status)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchPhoto(id))
  }, [dispatch])

  function handleDelete() {
    fetch(`/photos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    history.push("/")
  }

  return (
    <div className="PhotoProfile">
      {photoStatus === "loading" ? (
        <Skeleton variant="rectangular" animation="wave" width="100%" height={350} />
      ) : (
        <div 
          style={{
            backgroundImage: `url(${photo.image})`, 
            backgroundSize: "cover", 
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            width: "100%", 
            height: "350px"
          }}
        >
          <img src={photo.image} className="photo" />
        </div>
      )}
      <List 
        sx={{
          width: "100%",
          mt: "-10px"
        }}
      >
        <ListItem>
          {photo.user ? (
            <>
              <ListItemAvatar>
                <Avatar 
                  alt={photo.user.username} 
                  src={photo.user.avatar} 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    mr: 2,
                    mt: "-30px"
                  }}
                >
                  {photo.user.username ? photo.user.username[0].toUpperCase() : ""}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Anchor name={`@${photo.user.username}`} to={`/users/${photo.user.id}`} />} />
            </>
          ) : (
            <>
              <ListItemAvatar>
                <Avatar 
                  sx={{width: 60, height: 60, mr: 2, mt: "-30px"}} 
                />
              </ListItemAvatar>
              <ListItemText primary={<Skeleton animation="wave" width={(350 /3)} />} />
            </>
          )}

          <LikeBtn currentUser={currentUser} photo={photo} />
        </ListItem>
      </List>

      <div
        style={{ 
          width: "100%",
          display: "flex", 
          justifyContent: "space-between", 
          paddingLeft: "20px", 
          paddingRight: "20px"
        }}
      >
        <div>
          {photo.description ? <p>{photo.description}</p> : <></>}
          {photo.tags ? <Tags tags={photo.tags} /> : <></>}
        </div>
        {currentUser && photo.user && currentUser.id === photo.user.id ? (
          <div>
            <IconButton component={Link} to={`/photos/${photo.id}/edit`}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          <></>
        )}
      </div>

      <Comments currentUser={currentUser} />

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: "center",
          padding: "10px",
          mt: "10px",
          fontSize: "14px",
          borderBottom: 1, 
          borderColor: 'divider',
          position: 'relative',
          bottom: 0
        }}
      >
        <Anchor name="Image Source" to={{ pathname: photo.image }} />
      </Box>
    </div>
  )
}

export default PhotoProfile;
