import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearch } from '../features/search/searchSlice';
import User from '../features/users/User';
import Results from '../components/Results';
import Anchor from '../components/Anchor';
import { Box, InputBase, Tabs, Tab, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  const [tab, setTab] = useState("users")
  const [keyword, setKeyword] = useState("")
  // const [results, setResults] = useState([])
  // const [errors, setErrors] = useState([])
  const results = useSelector((state) => state.results.entities)
  const searchStatus = useSelector((state) => state.results.status)
  const dispatch = useDispatch()

  function handleTabChange(event, newValue) {
    setTab(newValue)
  }

  useEffect(() => {
    dispatch(fetchSearch({tab: tab, keyword: keyword}))
  }, [dispatch, keyword, tab])

  // useEffect(() => {
  //   setErrors([])

  //   fetch(`/${tab}/search/${keyword}`)
  //   // .then((r) => r.json())
  //   // .then((data) => setResults(data))
  //   .then((r) => {
  //     if (r.ok) {
  //       r.json().then((data) => setResults(data))
  //     } else {
  //       r.json().then((err) => setErrors(err.errors))
  //     }
  //   })
  // }, [keyword])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          backgroundColor: 'divider',
          padding: 2
        }}
      >
        <Box 
          sx={{
            display: "flex",
            alignItems: "center",
            width: '100%'
          }}
        >
          <SearchIcon sx={{color: "text.secondary"}} />
          <InputBase
            placeholder="Search here..."
            inputProps={{ 'aria-label': 'search' }}
            onChange={(event) => setKeyword(event.target.value)}
            sx={{ 
              ml: 1,
              pl: 1, 
              flex: 1, 
              backgroundColor: 'primary.box'
            }}
            fullWidth
          />
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs 
          value={tab} 
          onChange={handleTabChange} 
          aria-label="search-tabs" 
          variant="fullWidth" 
        >
          <Tab 
            label="Description" 
            value="description" 
          />
          <Tab 
            label="Tags" 
            value="tags" 
          />
          <Tab 
            label="Users" 
            value="users" 
          />
        </Tabs>
      </Box>

      <Results tab={tab} results={results} searchStatus={searchStatus} />
    </>
  )
}

export default Search;
