import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

function DeleteAlert({ open, handleClose, handleDelete }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-delete-title"
      aria-describedby="alert-delete-description"
    >
      <DialogTitle id="alert-delete-title">
        {"Are you sure you want to delete your account?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-description">
          Deleting your account will permanently delete your profile and everything accociated with it, including all photos and comments.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleDelete} autoFocus color="error">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAlert;
