import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

function Alert({ errors }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    errors && errors.length > 0 ? setOpen(true) : setOpen(false)
  }, [errors])

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {`${errors[0]}!`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleClose} component={Link} to={"/login"} autoFocus>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Alert;
