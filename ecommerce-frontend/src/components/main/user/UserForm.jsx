import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,
    InputLabel, Input, makeStyles, TextareaAutosize, Select, MenuItem} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { UserService } from 'services';

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
    },
    textAreaStyle:{
        minHeight: 100
    }
}));
export default function UserForm ({isShown, onCancel, onSuccess, isNew, userData}) {
    const classes = useStyles();

    const [form, setState] = useState({
        firstName : userData.FirstName,
        lastName : userData.LastName,
        email : userData.Email,
        userName : userData.UserName,
        address : userData.Address,
        contactNumber : userData.ContactNumber,
        bio : userData.Bio,
        password: '',
        type: userData.Type
    });

    useEffect(() => {
        setState({
            firstName : userData.FirstName,
            lastName : userData.LastName,
            email : userData.Email,
            userName : userData.UserName,
            address : userData.Address,
            contactNumber : userData.ContactNumber,
            bio : userData.Bio,
            password : userData.Password,
            type: userData.Type
        })
    }, [userData.FirstName, userData.LastName,
        userData.Email,userData.UserName,
        userData.Address, userData.ContactNumber, userData.Bio, userData.Password,userData.Type
    ]);

    const onReset = () => {
        setState({
            firstName : '',
            lastName : '',
            email : '',
            userName : '',
            address : '',
            contactNumber : '',
            bio : '',
            password: '',
            type: ''
        })
    }

    const updateField = e => {
        setState({
          ...form,
          [e.target.name]: e.target.value
        });
    };
    
    const onClose = () => {
        onReset()
        onCancel()
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            if (isNew) {
                await UserService.create(form)
            } else {
                await UserService.update(userData.ID, form)
            }
            onReset()
            onSuccess()
        } catch (error) {
            console.log(error)
            onCancel()
        }
    }

    return (
        <Dialog className={classes.modal} fullWidth={true}
            open={isShown}
            onClose={onCancel}>
            <DialogTitle> {isNew ? 'Create' : 'Update'} User </DialogTitle>
            <DialogContent className={classes.container}> 
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-label">First Name</InputLabel>
                    <Input type="text" name="firstName" value={form.firstName || ""} onChange={updateField}/>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-label">Last Name</InputLabel>
                    <Input type="text" name="lastName" value={form.lastName || ""} onChange={updateField}/>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-label">Email</InputLabel>
                    <Input type="text" name="email" value={form.email || ""} onChange={updateField}/>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-label">User Name</InputLabel>
                    <Input type="text" name="userName" value={form.userName || ""} onChange={updateField}/>
                </FormControl>
                { isNew && <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-label">Password</InputLabel>
                    <Input type="password" name="password" value={form.password || ""} onChange={updateField}/>
                </FormControl> }
                

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-label">Address</InputLabel>
                    <Input type="text" name="address" value={form.address || ""} onChange={updateField}/>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-label">Contact Number</InputLabel>
                    <Input type="number" name="contactNumber" value={form.contactNumber || ""} onChange={updateField}/>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <label id="demo-dialog-label">Description</label>
                    <TextareaAutosize className={classes.textAreaStyle} name="bio" value={form.bio || ""} onChange={updateField}/>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <label id="demo-dialog-label">User Type</label>
                    <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        value={form.type || ""}
                        name="type"
                        placeholder="User Type"
                        onChange={updateField}>
                        <MenuItem value="SERVICE_PROVIDER">Service Provider</MenuItem>
                        <MenuItem value="CUSTOMER">Customer</MenuItem>
                    </Select>
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