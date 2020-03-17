import React from 'react'
import TextField from '@material-ui/core/TextField'

function Input(props) {

    return (
        
        <TextField type={props.type} name={props.name} label={props.placeholder} variant="outlined" onChange={props.handleInputChange} fullWidth />
        
    )

}

export default Input