import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhoto, photoDeleted } from '../features/photos/photosSlice';
import PhotoUser from '../components/PhotoUser';
import LikeBtn from '../components/LikeBtn';
import Tags from '../components/Tags';
import { IconButton, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function PhotoProfile() {
  const { id } = useParams()
  const photo = useSelector((state) => state.photos.entities)
  const currentUser = useSelector((state) => state.currentUser.entities)
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
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "baseline", 
          width: "100%", 
          marginTop: "-20px", 
          paddingLeft: "20px", 
          paddingRight: "20px",
        }}
      >
        <PhotoUser user={photo.user} />
        <LikeBtn />
      </div>

      <div
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          width: "100%",
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
