import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import User from '../features/users/User';
import { Tabs, Tab, Box, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

function Follows({ pathname }) {
  const { id } = useParams()
  const [tab, setTab] = useState("following")
  const user = useSelector((state) => state.users.entities)

  useEffect(() => {
    pathname ? setTab(pathname.split("/")[3]) : setTab("followees")
  }, [pathname])

  function handleTabChange(event, newValue) {
    setTab(newValue)
  }

  return (
    <div className="Follows">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', height: '48px' }}>
        <Tabs 
          value={tab} 
          onChange={handleTabChange} 
          aria-label="following-tabs" 
          variant="fullWidth" 
        >
          <Tab 
            label="Following" 
            value="followees" 
            component={Link} to={`/users/${id}/followees`} 
          />
          <Tab 
            label="Followers" 
            value="followers" 
            component={Link} to={`/users/${id}/followers`} 
          />
        </Tabs>
      </Box>

      {(() => {
          switch(pathname.split("/")[3]) {
            case "followees": 
              return (
                <List sx={{width: "100%"}}>
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
                          <Avatar sx={{width: 60, height: 60, mr: 2}} />
                        </ListItemAvatar>
                        <ListItemText primary="Nothing Here Yet" />
                      </ListItemButton>
                    </ListItem>
                  )}
                </List>
              )
            case "followers":
              return (
                <List sx={{width: "100%"}}>
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
                          <Avatar sx={{width: 60, height: 60, mr: 2}} />
                        </ListItemAvatar>
                        <ListItemText primary="Nothing Here Yet" />
                      </ListItemButton>
                    </ListItem>
                  )}
                </List>
              )
          }
        })()}
    </div>
  )
}

export default Follows;
