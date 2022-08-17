import { useHistory } from 'react-router';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function LogoutBtn({ onLogout }) {
  const history = useHistory()

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => {
      if(r.ok) {
        onLogout(null)
        history.push("/")
      }
    })
  }

  return (
    <Button 
      variant="contained" 
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      size="large"
    >
      Logout
    </Button>
  )
}

export default LogoutBtn;
