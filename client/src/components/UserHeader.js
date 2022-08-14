import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FollowBtn from './FollowBtn.js';
import { Avatar, Box, Stack, Typography, Skeleton } from '@mui/material';

function UserHeader({ currentUser }) {
  const user = useSelector((state) => state.users.entities)
  const userStatus = useSelector((state) => state.users.status)

  return (
    <>
      {user ? (
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
                {user.username ? user.username[0].toUpperCase() : ""}
              </Avatar>
            ) : (
              <Avatar  
                sx={{ 
                  width: 60, 
                  height: 60
                }}
              />
            )}
            {userStatus === "idle" && user ? (
              <>
                <Box className="header-box">
                  <Typography variant="subtitle1" color="text.secondary">
                    Photos
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {user.photos_total}
                  </Typography>
                </Box>
                <Box 
                  className="header-box" 
                  component={Link} to={`/users/${user.id}/followees`}
                >
                  <Typography variant="subtitle1" color="text.secondary">
                    Following
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {user.followees_total}
                  </Typography>
                </Box>
                <Box 
                  className="header-box" 
                  component={Link} to={`/users/${user.id}/followers`}
                >
                  <Typography variant="subtitle1" color="text.secondary">
                    Followers
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {user.followers_total}
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <Box className="header-box">
                  <Skeleton 
                    animation="wave" 
                    variant="rectangular" 
                    width="60px" height="60px"
                  />
                </Box>
                <Box className="header-box">
                  <Skeleton 
                    animation="wave" 
                    variant="rectangular" 
                    width="60px" height="60px"
                  />
                </Box>
                <Box className="header-box">
                  <Skeleton 
                    animation="wave" 
                    variant="rectangular" 
                    width="60px" height="60px"
                  />
                </Box>
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
              paddingLeft: "12%",
              paddingRight: "12%"
            }}
          >
            {userStatus === "idle" && user ? (
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
            {userStatus === "loading" || currentUser && currentUser.id === user.id ? (
              <></>
            ) : (
              <FollowBtn currentUser={currentUser} />
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
