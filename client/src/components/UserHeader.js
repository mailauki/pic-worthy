import { Button, Avatar, Box, Stack, Typography } from '@mui/material';

function UserHeader({ user }) {
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
            {user.username ? (
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
                alt={user.username} 
                src={user.avatar} 
                sx={{ 
                  width: 60, 
                  height: 60
                }}
              />
            )}
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
            <Box>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                @{user.username}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {user.first_name ? user.first_name : " "}
              </Typography>
            </Box>
            <Button variant="contained">Follow</Button>
          </Stack>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default UserHeader;
