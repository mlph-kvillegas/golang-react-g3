import React from 'react'
import Image from 'react-bootstrap/Image'

function ServiceImage (props) {
    return (
        <Image src={props.imagePath} fluid className="Login-logo" />
    )
}

export default ServiceImage