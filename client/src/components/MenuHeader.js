import LogoutBtn from './LogoutBtn';
import { Avatar, Box, Typography } from '@mui/material';

function MenuHeader({ currentUser, onLogout }) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: "center",
          backgroundColor: 'divider',
        }}
      >
        {currentUser.first_name ? (
          <Typography 
            variant="h3" 
            component="h3"
            sx={{ fontSize: 24 }}
          >
            Hello, {currentUser.first_name}
          </Typography>
        ) : (
          <Typography 
            variant="h3" 
            component="h3"
            sx={{ fontSize: 24 }}
          >
            Hello
          </Typography>
        )}
        {!currentUser ? (
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              postition: "absolute", 
              top: 30, 
              right: 20,
              zIndex: 1
            }}
          />
        ) : (
          <Avatar 
            alt={currentUser.username} 
            src={currentUser.avatar} 
            sx={{ 
              width: 80, 
              height: 80, 
              postition: "absolute", 
              top: 30, 
              right: 20,
              zIndex: 1
            }}
          >
            {currentUser.username ? currentUser.username[0].toUpperCase() : ""}
          </Avatar>
        )}
      </Box>
      <LogoutBtn onLogout={onLogout} />
    </>
  )
}

export default MenuHeader;
