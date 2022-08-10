import { useLocation } from 'react-router-dom';
import { ImageList, ImageListItem, ImageListItemBar, Skeleton, Grid, Box } from '@mui/material';

function SkeletonGrid() {
  const pathname = useLocation().pathname
  console.log(pathname)

  const SkeletonItems = Array.from({length: 9}, (_, index) => {
    return (
      // <Box>
      //   <Skeleton 
      //     variant="rectangular" 
      //     width={(350 /3)} height={(350 / 3)} 
      //     animation="wave"
      //   />
      //   <Skeleton width={(350 /3)} />
      // </Box>
      <ImageListItem key={index}>
        <Skeleton 
          variant="rectangular" 
          width={(350 / 3)} height={(350 / 3)} 
          animation="wave"
        />
        {pathname === "/tags" ? (
          <ImageListItemBar 
            position="below"
            sx={{color: "text.secondary", textAlign: "center"}}
            title={<Skeleton width={(350 / 3)} />} 
          />
        ) : (
          <></>
        )}
      </ImageListItem>
    )
  })

  return (
    // <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} width={350}>
    //   {SkeletonGrid}
    // </Box>
    <ImageList 
      width={350}
      cols={3}
      // rowHeight={(350 / 3) + 45}
      rowHeight={pathname === "/tags" ? ((350 / 3) + 45) : (350 / 3)}
    >
      {SkeletonItems}
    </ImageList>
  )
}

export default SkeletonGrid;
