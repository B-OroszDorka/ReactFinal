import {Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import React from 'react';

export default function ErrorModal({onClose, message}) {
    return (<Dialog open={true} onClose={onClose}>
        <DialogTitle>Hiba</DialogTitle>
        <DialogContent>
            <Typography variant={"body1"}>
                {message}
            </Typography>
        </DialogContent>
    </Dialog>)
}