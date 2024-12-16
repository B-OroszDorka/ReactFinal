import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const UserFriendlyAlert = ({ openSnackbar, message, setOpenSnackbar }) => {
    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ zIndex: 1500 }}
        >
            <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default UserFriendlyAlert;
