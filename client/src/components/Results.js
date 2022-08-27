import { Link } from 'react-router-dom';
import User from '../features/users/User';
import Anchor from './Anchor';
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

function Results({tab, results, searchStatus}) {
  return (
    <List sx={{width: "100%"}}>
      {searchStatus === "loading" ? (
        <ListItem disablePadding>
          <ListItemButton disabled>
            <ListItemAvatar>
              <Avatar sx={{width: 60, height: 60, mr: 2}} />
            </ListItemAvatar>
            <ListItemText primary="Loading..." />
          </ListItemButton>
        </ListItem>
      ) : (
        results.length > 0 && !results.errors ? (
          results.map((result) => (
            (() => {
              switch(tab) {
                case "description": 
                  return (
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link} to={`/photos/${result.id}`}
                      >
                        <ListItemAvatar>
                          <Avatar 
                            alt={result.description} 
                            src={result.image} 
                            sx={{ 
                              width: 60, 
                              height: 60, 
                              mr: 2
                            }} 
                            variant="square"
                          />
                        </ListItemAvatar>
                        <ListItemText primary={<Anchor name={result.description} to={`/photos/${result.id}`} />} />
                      </ListItemButton>
                    </ListItem>
                  )
                case "tags":
                  return (
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link} to={`/tags/${result.id}`}
                      >
                        <ListItemAvatar>
                          <Avatar 
                            alt={result.name} 
                            src={result.photos && result.photos.at(-1) ? result.photos.at(-1).image : ""} 
                            sx={{ 
                              width: 60, 
                              height: 60, 
                              mr: 2
                            }} 
                            variant="square"
                          />
                        </ListItemAvatar>
                        <ListItemText primary={<Anchor name={`# ${result.name}`} to={`/tags/${result.id}`} />} />
                      </ListItemButton>
                    </ListItem>
                  )
                  case "users":
                    return (
                      <ListItem disablePadding>
                        <ListItemButton
                          component={Link} to={`/users/${result.id}`}
                        >
                          <User user={result} />
                        </ListItemButton>
                      </ListItem>
                    )
                default:
                  return (
                    <ListItem disablePadding>
                      <ListItemButton disabled>
                        <ListItemAvatar>
                          <Avatar sx={{width: 60, height: 60, mr: 2}} />
                        </ListItemAvatar>
                        <ListItemText primary="Nothing Here Yet" />
                      </ListItemButton>
                    </ListItem>
                  )
              }
            })()
          ))
        ) : (
          results.errors ? (
            <ListItem disablePadding>
              <ListItemButton disabled>
                <ListItemAvatar>
                  <Avatar sx={{width: 60, height: 60, mr: 2}} />
                </ListItemAvatar>
                <ListItemText primary={results.errors} />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <ListItemButton disabled>
                <ListItemAvatar>
                  <Avatar sx={{width: 60, height: 60, mr: 2}} />
                </ListItemAvatar>
                <ListItemText primary="Nothing Found" />
              </ListItemButton>
            </ListItem>
          )
        )
      )}
    </List>
  )
}

export default Results;