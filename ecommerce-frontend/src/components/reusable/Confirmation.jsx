import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

export default function Confirmation ({title, isShown, onCancel, onConfirm, children}) {

    return (
        <Dialog
            open={isShown}
            onClose={onCancel}>
            <DialogTitle> {title} </DialogTitle>
            <DialogContent> {children} </DialogContent>
            <DialogActions>
            <Button onClick={onCancel} color="secondary">
                No
            </Button>
            <Button onClick={onConfirm} color="primary" autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
    )
}