import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../features/users/usersSlice';
import UserHeader from '../components/UserHeader';
import TabsBar from '../components/TabsBar';
import ViewMode from '../components/ViewMode';
import ImageGrid from '../components/ImageGrid';
import ImageQuilt from '../components/ImageQuilt';
import ImageFeed from '../components/ImageFeed';
import SkeletonGrid from '../components/SkeletonGrid';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function UserProfile({ currentUser, mobileView }) {
  const { id } = useParams()
  const user = useSelector((state) => state.users.entities)
  const userStatus = useSelector((state) => state.users.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser(id))
  }, [dispatch])

  const [activeViewMode, setActiveViewMode] = useState("grid")
  const [tab, setTab] = useState("photos")

  function handleViewMode(event, newValue) {
    setActiveViewMode(newValue)
  }

  function handleTabChange(event, newValue) {
    setTab(newValue)
  }

  return (
    <div className="UserProfile">
      <UserHeader user={user} currentUser={currentUser} />
        {userStatus === "loading" ? (
          <>
            <TabsBar tab={tab} handleChange={handleTabChange} tabBarInfo={[{label: "Photos", value: "photos"}, {label: "Likes", value: "likes"}]} />
              
            <ViewMode active={activeViewMode} handleViewMode={handleViewMode} />

            <SkeletonGrid />
          </>
        ) : (
          <Swiper 
            slidesPerView={1}
            onSlideChange={(swiper) => {
              setTab(swiper.activeIndex === 0 ? "photos" : "likes")
            }}
            style={{ 
              width: mobileView ? '100%' : 'calc(100vw - 126px)', 
              zIndex: 0 
            }}
          >
            <div
              style={{
                width: '100%',
                position: 'absolute', 
                top: 0, 
                zIndex: 2
              }}
            >
              <TabsBar tab={tab} handleChange={handleTabChange} tabBarInfo={[{label: "Photos", value: "photos"}, {label: "Likes", value: "likes"}]} />
              
              <ViewMode active={activeViewMode} handleViewMode={handleViewMode} />
            </div>

            {[{tabPhotos: user.photos}, {tabPhotos: user.liked_photos}].map((item)=> (
              <SwiperSlide 
                style={{ 
                  paddingTop: '108px', 
                  minHeight: 'calc(100vh - 396px)'
                }}
              >
                {(() => {
                  switch(activeViewMode) {
                    case "grid": 
                      return <ImageGrid user={user} photos={item.tabPhotos} />
                    case "quilt":
                      return <ImageQuilt user={user} photos={item.tabPhotos} />
                      case "list":
                        return <ImageFeed user={user} photos={item.tabPhotos} />
                    default:
                      return <SkeletonGrid />
                  }
                })()}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
    </div>
  )
}

export default UserProfile;
