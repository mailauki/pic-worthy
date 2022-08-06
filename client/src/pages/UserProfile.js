import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../features/users/userSlice';
import UserHeader from '../components/UserHeader';
import ViewMode from '../components/ViewMode';
import ImageGrid from '../components/ImageGrid';
import ImageQuilt from '../components/ImageQuilt';
import ImageFeed from '../components/ImageFeed';
import { Tabs, Tab, Box } from '@mui/material';

function UserProfile() {
  const { id } = useParams()
  // const [user, setUser] = useState({})
  const user = useSelector((state) => state.user.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser(id))
  }, [dispatch])

  // useEffect(() => {
  //   fetch(`/users/${id}`)
  //   .then((r) => r.json())
  //   .then((data) => setUser(data))
  // }, [id])

  const [activeViewMode, setActiveViewMode] = useState("grid")
  const [tab, setTab] = useState("photos")
  let tabPhotos = tab === "likes" ? user.liked_photos : user.photos

  function handleViewMode(event, newValue) {
    setActiveViewMode(newValue)
  }

  function handleTabChange(event, newValue) {
    setTab(newValue)
  }

  return (
    <>
      <UserHeader user={user} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs 
          value={tab} 
          onChange={handleTabChange} 
          aria-label="photos-tabs" 
          variant="fullWidth" 
        >
          <Tab label="Photos" value="photos" />
          <Tab label="Likes" value="likes" />
        </Tabs>
      </Box>

      <ViewMode active={activeViewMode} handleViewMode={handleViewMode} />
      {(() => {
          switch(activeViewMode) {
            case "grid": 
              return <ImageGrid user={user} photos={tabPhotos} />
            case "quilt":
              return <ImageQuilt user={user} photos={tabPhotos} />
              case "list":
                return <ImageFeed user={user} photos={tabPhotos} />
            default:
              return <ImageGrid user={user} photos={tabPhotos} />
          }
      })()}
    </>
  )
}

export default UserProfile;
