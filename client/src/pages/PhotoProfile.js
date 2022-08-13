import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhoto, photoDeleted } from '../features/photos/photosSlice';
import User from '../features/users/User';
import LikeBtn from '../components/LikeBtn';
import Tags from '../components/Tags';
import { IconButton, Skeleton, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function PhotoProfile({ currentUser }) {
  const { id } = useParams()
  const photo = useSelector((state) => state.photos.entities)
  const photoStatus = useSelector((state) => state.photos.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPhoto(id))
  }, [dispatch])

  return (
    <>
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
          mt: "-30px",
        }}
      >
        <ListItem 
          sx={{alignItems: "baseline"}}
        >
          <User user={photo.user} />
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
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default PhotoProfile;
