import { Link } from 'react-router-dom';
import { Link as AnchorLink } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAnchor = styled(AnchorLink)(({ theme }) => ({
  color: 'inherit',
  '&:hover': {
    color: theme.palette.primary.main
  },
  cursor: 'pointer'
}))

function Anchor({ name, to }) {
  return (
    <StyledAnchor 
      component={Link} to={to}
      underline="none"
    >
      {name}
    </StyledAnchor>
  )
}

export default Anchor;
