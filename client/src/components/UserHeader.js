import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FollowBtn from './FollowBtn.js';
import { Avatar, Box, Stack, Typography, Skeleton } from '@mui/material';

function UserHeader() {
  const user = useSelector((state) => state.users.entities)
  const currentUser = useSelector((state) => state.currentUser.entities)
  const userStatus = useSelector((state) => state.users.status)
  const dispatch = useDispatch()

  return (
    <>
      {user !== {} ? (
        <>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            className="UserHeader"
            sx={{
              width: "100%",
              marginTop: "20px"
            }}
          >
            {userStatus === "idle" && user.username ? (
              <Avatar 
                alt={user.username} 
                src={user.avatar} 
                sx={{ 
                  width: 60, 
                  height: 60
                }}
              >
                {user.username[0]}
              </Avatar>
            ) : (
              <Avatar  
                sx={{ 
                  width: 60, 
                  height: 60
                }}
              />
            )}
            {userStatus === "idle" ? (
              <>
                <div className="header-box">
                  <p>Photos</p>
                  <h4>{user.photos_total}</h4>
                </div>
                <div className="header-box">
                  <p>Following</p>
                  <h4>{user.followees_total}</h4>
                </div>
                <div className="header-box">
                  <p>Followers</p>
                  <h4>{user.followers_total}</h4>
                </div>
              </>
            ) : (
              <>
                <div className="header-box">
                  <Skeleton 
                    animation="wave" 
                    variant="rectangular" 
                    width="60px" height="60px"
                  />
                </div>
                <div className="header-box">
                  <Skeleton 
                    animation="wave" 
                    variant="rectangular" 
                    width="60px" height="60px"
                  />
                </div>
                <div className="header-box">
                  <Skeleton 
                    animation="wave" 
                    variant="rectangular" 
                    width="60px" height="60px"
                  />
                </div>
              </>
            )}
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="UserHeader"
            sx={{
              width: "100%",
              paddingLeft: "15%",
              paddingRight: "15%"
            }}
          >
            {userStatus === "idle" ? (
              <Box>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  @{user.username}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {user.first_name ? user.first_name : " "}
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  <Skeleton animation="wave" width={(350 /3)} />
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <Skeleton animation="wave" width={(350 /3)} />
                </Typography>
              </Box>
            )}
            {userStatus === "loading" || currentUser.id === user.id ? (
              <></>
            ) : (
              <FollowBtn />
            )}
          </Stack>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default UserHeader;
