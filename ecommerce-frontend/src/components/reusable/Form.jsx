import React from 'react'

function Form(props) {

    return (
        <form name={props.name} id={props.id} method={props.method}>
            {props.children}
        </form>
    )

}

export default Form