import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import ServiceTypeService from 'services/ServiceTypeService';

export default function ServiceTypeForm ({isShown, onCancel, onSuccess, isNew, serviceType}) {

    const [form, setState] = useState({
        serviceName: serviceType.ServiceName,
        serviceKey: serviceType.ServiceKey
    });

    useEffect(() => {
        setState({
            serviceName: serviceType.ServiceName,
            serviceKey: serviceType.ServiceKey
        })
    }, [serviceType.ServiceName, serviceType.ServiceKey]);
 
    const onClose = () => {
        onReset()
        onCancel()
    }

    const onReset = () => {
        setState({
            serviceName: '',
            serviceKey: ''
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        try {

            if (isNew) {
                await ServiceTypeService.create(form.serviceName, form.serviceKey)
            } else {
                await ServiceTypeService.update(serviceType.ID, form.serviceName, form.serviceKey)
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

    return (
        <Dialog
            open={isShown}  fullWidth={true}
            onClose={onCancel}>
            <DialogTitle> {isNew ? 'Create' : 'Update'} Service Type </DialogTitle>
            <DialogContent> 
                <TextField 
                    name="serviceName"
                    label="Service Name"
                    type="text"
                    value={form.serviceName || ''}
                    onChange={updateField}
                    fullWidth/>
            
                <TextField 
                    name="serviceKey"
                    label="Service Key"
                    type="text"
                    value={form.serviceKey || ''}
                    onChange={updateField}
                    fullWidth/>
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