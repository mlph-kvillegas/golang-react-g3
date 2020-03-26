import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,
    makeStyles, 
    FormControl,
    TextareaAutosize,
    Input,
    InputLabel,
    MenuItem,
    Select} from '@material-ui/core';
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

export default function ReviewForm ({isShown, bookedServiceId, closeModal}) {
    const classes = useStyles();

    const [form, setState] = useState({
        bookedService: bookedServiceId,
        rating: "",
        comment: ""
    });

    const updateField = e => {
        setState({
          ...form,
          [e.target.name]: e.target.value
        });
    };

    const submitReview = async () => {
        console.log(form)
        closeModal()
    } 

    return(
        <Dialog className={classes.modal} fullWidth={true}
            open={isShown} onClose={closeModal}>
            <DialogTitle> Rating and Review </DialogTitle>
            <DialogContent className={classes.container}> 
            <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-select-label">Rating</InputLabel>
                        <Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            name="rating"
                            value={form.rating || ""}
                            onChange={updateField}
                            input={<Input />}
                        >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <label className="demo-dialog-label">Comment</label>
                    <TextareaAutosize className={classes.textAreaStyle} name="comment" value={form.comment || ""} onChange={updateField}/>
                </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={submitReview} color="primary" autoFocus>
                Submit
            </Button>
            </DialogActions>
        </Dialog>
    )
}