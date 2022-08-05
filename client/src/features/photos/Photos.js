import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from './photosSlice';

function Photos() {
  const photos = useSelector((state) => state.photos.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPhotos())
  }, [dispatch])

  return (
    <div>
      <h1>Photos</h1>
      {photos.map( photo => <><img src={photo.image} /><p>{photo.description}</p><p>@{photo.user.username}</p></> )}
    </div>
  )
}

export default Photos;