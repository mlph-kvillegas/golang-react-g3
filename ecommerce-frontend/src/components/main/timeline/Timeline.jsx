import React from 'react'
import ServiceBox from './serviceBox/ServiceBox'

class Timeline extends React.Component {

    render () {

        var services = [
            {
                name : 'mani/pedi',
                image : 'https://media.giphy.com/media/haE44GP3fL7cA/giphy.gif',
                description : 'best mani/pedi',
                price : 750,
                id : 1
            },
            {
                name : 'drayber',
                image : 'https://media2.giphy.com/media/3o6ZtcyMhpwGRVUWyI/giphy.gif',
                description : 'T Super',
                price : 1000,
                id : 2
            },
            {
                name : 'tubero',
                image : 'https://media1.giphy.com/media/kOVUnMgWHTvQQ/giphy.gif',
                description : 'tiga tubo',
                price : 500,
                id : 3
            },
            {
                name : 'third wheel',
                image : 'https://media1.tenor.com/images/87b755da71f7edb84bc890f205abf7e4/tenor.gif?itemid=4821488',
                description : '3rd wheel ng bayan. tiga picture. tiga order. tiga bitbit',
                price : 2500,
                id : 4
            },
            {
                name : 'waterboy',
                image : 'https://media1.giphy.com/media/l0Exdwlo49Kf3XEJ2/giphy.gif',
                description : 'di ka mauuhaw sa laro. kakababa mo lang ng baso mo, refill na agad',
                price : 200,
                id : 5
            },
            {
                name : 'pianista',
                image : 'https://i.pinimg.com/originals/ec/c1/e6/ecc1e6b816cedefd5b22a829df4cec39.gif',
                description : 'magbibigay ng background music sa buhay mo. may sound epeks kada kilos mo',
                price : 600,
                id : 6
            }
        ]

        var serviceList = services.map(function (service) {
            return (
                <div style={{width: '33%'}} key={service.id}>
                    <ServiceBox {...service}></ServiceBox> 
                    <br />
                </div>
            )
        })

        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {serviceList}
            </div>
        )
    }

}

export default Timeline