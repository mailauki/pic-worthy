import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhoto } from '../features/photos/photosSlice';
import Comments from '../components/Comments';
import ImageSource from '../components/ImageSource';
import PhotoHeader from '../components/PhotoHeader';
import PhotoInfo from '../components/PhotoInfo';
import { Skeleton } from '@mui/material';

function PhotoProfile({ currentUser }) {
  const { id } = useParams()
  const photo = useSelector((state) => state.photos.entities)
  const photoStatus = useSelector((state) => state.photos.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPhoto(id))
  }, [dispatch])

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
      
      <PhotoHeader currentUser={currentUser} />

      <PhotoInfo currentUser={currentUser} />

      <Comments currentUser={currentUser} />

      <ImageSource />
    </div>
  )
}

export default PhotoProfile;
