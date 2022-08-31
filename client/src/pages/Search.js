import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearch } from '../features/search/searchSlice';
import TabsBar from '../components/TabsBar';
import Results from '../components/Results';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Search({ mobileView }) {
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

      <Swiper 
        slidesPerView={1}
        onSlideChange={(swiper) => {
          (() => {
            switch(swiper.activeIndex) {
              case 0: 
                setTab("users")
                break
              case 1:
                setTab("tags")
                break
              case 2:
                setTab("description")
                break
              default:
                setTab("users")
            }
          })()
        }}
        style={{ 
          width: mobileView ? '100%' : 'calc(100vw - 126px)', 
          zIndex: 0 
        }}
      >
        <div
          style={{
            width: '100%',
            position: 'absolute', 
            top: 0, 
            zIndex: 2
          }}
        >
          <TabsBar tab={tab} handleChange={handleTabChange} tabBarInfo={[{label: "Users", value: "users"}, {label: "Tags", value: "tags"}, {label: "Description", value: "description"}]} />
        </div>

        {Array.from({ length: 3 }, (_, index) => (
          <SwiperSlide 
            key={index}
            style={{ 
              paddingTop: '48px', 
              minHeight: 'calc(100vh - 396px)'
            }}
          >
            <Results tab={tab} results={results} searchStatus={searchStatus} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Search;
