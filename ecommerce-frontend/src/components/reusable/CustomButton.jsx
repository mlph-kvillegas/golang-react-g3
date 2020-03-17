import React from 'react'
import Button from '@material-ui/core/Button';

function CustomButton(props) {

    return (
        // <button type={props.type} id={props.id} onClick={props.takeAction}>{props.label}</button>
        <Button variant="contained" color={props.color} type={props.type} onClick={props.doAction} disabled={props.disabled}>
            {props.label}
        </Button>
    )

}

export default CustomButton