import { Button, Avatar, Box, Stack, Typography } from '@mui/material';

function UserHeader({ user }) {
  return (
    <>
      {user !== {} ? (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="UserHeader"
            sx={{
              width: "100%"
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
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              sx={{
                width: "100%"
              }}
            >
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
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="UserHeader"
            sx={{
              width: "100%"
            }}
          >
            <Box>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                @{user.username}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {user.first_name ? user.first_name : ""}
              </Typography>
            </Box>
            <Box sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}>
              <Button variant="contained">Follow</Button>
            </Box>
          </Stack>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default UserHeader;
