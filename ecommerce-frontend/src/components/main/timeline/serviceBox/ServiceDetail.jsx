import React from 'react'

function ServiceDetail (props) {
    return (
        <div>
            Name : {props.name}
            Price : {props.price}
            Description : {props.description}
        </div>
    )
}

export default ServiceDetail