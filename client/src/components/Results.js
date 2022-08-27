import { Link } from 'react-router-dom';
import User from '../features/users/User';
import ResultItem from './ResultItem';
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

function Results({ tab, results, searchStatus }) {
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
                  <ResultItem 
                    id={result.id} 
                    image={result.image} 
                    text={result.description} 
                  />
                )
                case "tags":
                  return (
                    <ResultItem 
                      id={result.id} 
                      image={result.photos && result.photos.at(-1) ? result.photos.at(-1).image : ""} 
                      text={`# ${result.name}`} 
                    />
                  )
                  case "users":
                    return (
                      <ListItem disablePadding key={result.id}>
                        <ListItemButton
                          component={Link} to={`/users/${result.id}`}
                          sx={{
                            '&:hover': {
                              div: {
                                color: 'primary.main'
                              }
                            }
                          }}
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