import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../features/users/usersSlice';
import UserHeader from '../components/UserHeader';
import ViewMode from '../components/ViewMode';
import ImageGrid from '../components/ImageGrid';
import ImageQuilt from '../components/ImageQuilt';
import ImageFeed from '../components/ImageFeed';
import SkeletonGrid from '../components/SkeletonGrid';
import { Tabs, Tab, Box } from '@mui/material';

function UserProfile({ currentUser }) {
  const { id } = useParams()
  const user = useSelector((state) => state.users.entities)
  const userStatus = useSelector((state) => state.users.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser(id))
  }, [dispatch])

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
      <UserHeader user={user} currentUser={currentUser} />

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
      {userStatus === "loading" ? (
        <SkeletonGrid />
      ) : (
        (() => {
          switch(activeViewMode) {
            case "grid": 
              return <ImageGrid user={user} photos={tabPhotos} />
            case "quilt":
              return <ImageQuilt user={user} photos={tabPhotos} />
              case "list":
                return <ImageFeed user={user} photos={tabPhotos} />
            default:
              return <SkeletonGrid />
          }
        })()
      )}
    </>
  )
}

export default UserProfile;
