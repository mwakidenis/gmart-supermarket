import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getAuth, signOut } from "firebase/auth";


const SimpleDialog3 = ({ onClose, open, setIsLogin }) => {
    const auth = getAuth();
    
    function handleOption(value) {
      if(value){
        onClose();
      }
    }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Choose:</DialogTitle>
      {/* <DialogContent>
        <Typography variant="body1" gutterBottom>
          How would you like to receive your order?
        </Typography>
        <Button variant="contained" color="primary" fullWidth onClick={() => handleOption('Delivery')}>
          Delivery
        </Button>
        <Typography variant="body2" align="center" gutterBottom style={{ marginTop: '10px' }}>
          OR
        </Typography>
        <Button variant="outlined" color="primary" fullWidth onClick={() => handleOption('Pickup')}>
          Pickup
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions> */}
    <DialogContent>
        <Typography variant="body1" gutterBottom>
            Do you want to logout or go back?
        </Typography>
        <Button variant="contained" color="primary" fullWidth onClick={()=>{
            signOut(auth).then(() => {
                console.log('User signed out');
                onClose();
              }).catch((error) => {
                console.log(error);
              });
            setIsLogin(false);
            localStorage.removeItem('user');
        }}>
            Logout
        </Button>
        <Typography variant="body2" align="center" gutterBottom style={{ marginTop: '10px' }}>
            OR
        </Typography>
        <Button variant="outlined" color="primary" fullWidth onClick={() => handleOption('GoBack')}>
            Go Back
        </Button>
    </DialogContent>
    <DialogActions>
        <Button onClick={onClose} color="secondary">
            Cancel
        </Button>
    </DialogActions>

    </Dialog>
  );
}

export default SimpleDialog3;
