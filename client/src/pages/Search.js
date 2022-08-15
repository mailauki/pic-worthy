import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearch } from '../features/search/searchSlice';
import Results from '../components/Results';
import { Box, InputBase, Tabs, Tab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  const [tab, setTab] = useState("users")
  const [keyword, setKeyword] = useState("")
  const results = useSelector((state) => state.results.entities)
  const searchStatus = useSelector((state) => state.results.status)
  const dispatch = useDispatch()

  function handleTabChange(event, newValue) {
    setTab(newValue)
  }

  useEffect(() => {
    dispatch(fetchSearch({tab: tab, keyword: keyword}))
  }, [dispatch, keyword, tab])

  return (
    <div className="Search">
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
          <SearchIcon sx={{ color: "text.secondary" }} />
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

      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', height: '48px' }}>
        <Tabs 
          value={tab} 
          onChange={handleTabChange} 
          aria-label="search-tabs" 
          variant="fullWidth" 
        >
          <Tab 
            label="Users" 
            value="users" 
          />
          <Tab 
            label="Tags" 
            value="tags" 
          />
          <Tab 
            label="Description" 
            value="description" 
          />
        </Tabs>
      </Box>

      <Results tab={tab} results={results} searchStatus={searchStatus} />
    </div>
  )
}

export default Search;
