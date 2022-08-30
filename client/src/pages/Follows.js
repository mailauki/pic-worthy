import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../features/users/usersSlice';
import User from '../features/users/User';
import SliderTabs from '../components/SliderTabs';
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Follows({ pathname }) {
  const { id } = useParams()
  const user = useSelector((state) => state.users.entities)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchUser(id))
  }, [dispatch])

  const [activeStep, setActiveStep] = useState(pathname.split("/")[3] === "followees" ? 0 : 1)

  const followLists = [
    { name: "followees", item: <List sx={{width: "100%"}}>
      {user.followees && user.followees.length > 0  ? (
        user.followees.map((follow) => (
          <ListItem disablePadding>
            <ListItemButton  
              component={Link} to={`/users/${follow.id}`}
            >
              <User user={follow} />
            </ListItemButton>
          </ListItem>
        )) 
      ) : (
        <ListItem disablePadding>
          <ListItemButton disabled>
            <ListItemAvatar>
              <Avatar sx={{ width: 60, height: 60, mr: 2 }} />
            </ListItemAvatar>
            <ListItemText primary="Nothing Here Yet" />
          </ListItemButton>
        </ListItem>
      )}
    </List> },
    { name: "followers", item: <List sx={{width: "100%"}}>
      {user.followers && user.followers.length > 0  ? (
        user.followers.map((follow) => (
          <ListItem disablePadding>
            <ListItemButton 
              component={Link} to={`/users/${follow.id}`}
            >
              <User user={follow} />
            </ListItemButton>
          </ListItem>
        )) 
      ) : (
        <ListItem disablePadding>
          <ListItemButton disabled>
            <ListItemAvatar>
              <Avatar sx={{ width: 60, height: 60, mr: 2 }} />
            </ListItemAvatar>
            <ListItemText primary="Nothing Here Yet" />
          </ListItemButton>
        </ListItem>
      )}
    </List> }
  ]

  return (
    <div className="Follows">
      <Swiper 
        slidesPerView={"auto"}
        onSlideChange={(swiper) => {
          history.push(`/users/${id}/${swiper.slides[swiper.activeIndex].id}`)
          setActiveStep(swiper.activeIndex)
        }}
        initialSlide={activeStep} 
      >
        <SliderTabs pathname={pathname} />

        {followLists.map((list) => (
          <SwiperSlide 
            key={list.name} 
            id={list.name} 
            style={{ 
              paddingTop: '48px', 
              minHeight: 'calc(100vh - 202px)'
            }}
          >
            {list.item}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Follows;
