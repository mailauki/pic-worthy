import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TagsList from '../components/TagsList';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function PhotoInfo({ currentUser }) {
  const { id } = useParams()
  const photo = useSelector((state) => state.photos.entities)
  const history = useHistory()

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
        {photo.tags ? <TagsList tags={photo.tags} /> : <></>}
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
  )
}

export default PhotoInfo;
