import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,
    makeStyles, 
    Typography} from '@material-ui/core';
import ls from 'local-storage'
import { ServiceService } from 'services';

const useStyles = makeStyles(theme => ({
    modal: {
      width: '100%'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        minWidth: '100%',
    }
}));

export default function ServiceDetails ({isShown, service, closeModal}) {
    const classes = useStyles();

    const bookDetails = async () => {
        var booked = {
            serviceId: service.ID,
            userId: ls.get('currentUser').ID
        }

        await ServiceService.bookService(booked);
        closeModal()
    } 

    return(
        <Dialog className={classes.modal} fullWidth={true}
            open={isShown} onClose={closeModal}>
            <DialogTitle> Service Details </DialogTitle>
            <DialogContent className={classes.container}> 
                <div>
                    <Typography> <strong> Provider Name: </strong> { service != null && service.UserName } </Typography>
                    <Typography> <strong> Service Type: </strong> { service != null && service.ServiceName } </Typography> 
                    <Typography> <strong> Contact Number: </strong> { service != null && service.ContactNumber } </Typography>
                    <Typography> <strong> Price: </strong> { service != null && service.Price } </Typography>
                    <Typography> <strong> Description: </strong> { service != null && service.Description }</Typography>
                </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={bookDetails} color="primary" autoFocus>
                Book Service
            </Button>
            </DialogActions>
        </Dialog>
    )
}