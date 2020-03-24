import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,
    InputLabel, Select, Input, MenuItem, makeStyles, TextareaAutosize} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
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

export default function ServiceForm ({isShown, onCancel, onSuccess, isNew, service, userList, serviceTypeList}) {
    const classes = useStyles();

    const [form, setState] = useState({
        userId: service.UserID,
        serviceTypeId: service.ServiceTypeID,
        contactNumber: service.ContactNumber,
        price: service.Price,
        description: service.Description

    });

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            if (isNew) {
                await ServiceService.create(form)
            } else {
                await ServiceService.update(service.ID, form)
            }
            onReset()
            onSuccess()
        } catch (error) {
            console.log(error)
            onCancel()
        }
    }

    const updateField = e => {
        setState({
          ...form,
          [e.target.name]: e.target.value
        });
    };
    
    const onReset = () => {
        setState({
            userId : '',
            serviceTypeId : '',
            contactNumber : '',
            price : '',
            description : ''
        })
    }
   
    useEffect(() => {
        setState({
            userId: service.UserID,
            serviceTypeId: service.ServiceTypeID,
            contactNumber: service.ContactNumber,
            price: service.Price,
            description: service.Description,
            userList: userList, 
            serviceTypeList: serviceTypeList
        })
    }, [service.UserID, service.ServiceTypeID, service.ContactNumber, service.Price, service.Description, userList, serviceTypeList])

    const onClose = () => {
        onReset()
        onCancel()
    }
    
    return (
        <Dialog className={classes.modal} fullWidth={true}
            open={isShown}
            onClose={onCancel}>
            <DialogTitle> {isNew ? 'Create' : 'Update'} Service </DialogTitle>
            <DialogContent className={classes.container}> 
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-select-label">Service Provider</InputLabel>
                        <Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            value={form.userId || ""}
                            name="userId"
                            onChange={updateField}
                            input={<Input />}
                        >
                        { userList !=null && userList.map(user => <MenuItem key={user.ID} value={user.ID}>{user.FirstName + " " + user.LastName}</MenuItem>) }
                       
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-select-label">Service Type</InputLabel>
                        <Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            name="serviceTypeId"
                            value={form.serviceTypeId || ""}
                            onChange={updateField}
                            input={<Input />}
                        >
                        { serviceTypeList !=null && serviceTypeList.map(serviceType => <MenuItem  key={serviceType.ID} value={serviceType.ID}>{serviceType.ServiceName}</MenuItem>) }
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-label">Contact Number</InputLabel>
                    <Input type="number" name="contactNumber" value={form.contactNumber || ""} onChange={updateField}/>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-label">Price</InputLabel>
                    <Input type="number" name="price" value={form.price || ""} onChange={updateField}/>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <label id="demo-dialog-label">Description</label>
                    <TextareaAutosize className={classes.textAreaStyle} name="description" value={form.description || ""} onChange={updateField}/>
                </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} color="secondary">
                Cancel
            </Button>
            <Button onClick={onSubmit} color="primary" autoFocus>
                Submit
            </Button>
            </DialogActions>
        </Dialog>
    )
}