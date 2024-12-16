import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import React from 'react';

export default function ConfirmModal({onClose, onConfirmed, message}) {
    return (<Dialog open={true} onClose={onClose}>
        <DialogTitle>Megerősítés</DialogTitle>
        <DialogContent>
            <Typography variant={"body1"}>
                {message}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button variant={"contained"} color={"error"} onClick={() => {
                onConfirmed();
                onClose();
            }}>Igen</Button>
            <Button variant={"outlined"} onClick={onClose}>Nem</Button>
        </DialogActions>
    </Dialog>)
}