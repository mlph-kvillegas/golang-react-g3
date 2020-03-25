import React from 'react'
import ServiceBox from './serviceBox/ServiceBox'

class Timeline extends React.Component {

    render () {

        var services = [
            {
                name : 'mani/pedi',
                image : 'https://img.grouponcdn.com/deal/4PmK93ZaCPgmmXXABSTwPmoHA8Cx/4P-2048x1229/v1/c700x420.jpg',
                description : 'best mani/pedi',
                price : 750,
                id : 1
            },
            {
                name : 'drayber',
                image : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fnew-beverly-hills-hair-salon-3&psig=AOvVaw282i6_d_zyuBFoED4SUvht&ust=1585208530331000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjbhpKQtegCFQAAAAAdAAAAABAD',
                description : 'T Super',
                price : 1000,
                id : 2
            },
            {
                name : 'tubero',
                image : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fnew-beverly-hills-hair-salon-3&psig=AOvVaw282i6_d_zyuBFoED4SUvht&ust=1585208530331000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjbhpKQtegCFQAAAAAdAAAAABAD',
                description : 'tiga tubo',
                price : 500,
                id : 3
            },
            {
                name : 'third wheel',
                image : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fnew-beverly-hills-hair-salon-3&psig=AOvVaw282i6_d_zyuBFoED4SUvht&ust=1585208530331000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjbhpKQtegCFQAAAAAdAAAAABAD',
                description : '3rd wheel ng bayan. tiga picture. tiga order. tiga bitbit',
                price : 2500,
                id : 4
            },
            {
                name : 'waterboy',
                image : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fnew-beverly-hills-hair-salon-3&psig=AOvVaw282i6_d_zyuBFoED4SUvht&ust=1585208530331000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjbhpKQtegCFQAAAAAdAAAAABAD',
                description : 'di ka mauuhaw sa laro. kakababa mo lang ng baso mo, refill na agad',
                price : 200,
                id : 5
            },
            {
                name : 'pianista',
                image : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fnew-beverly-hills-hair-salon-3&psig=AOvVaw282i6_d_zyuBFoED4SUvht&ust=1585208530331000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjbhpKQtegCFQAAAAAdAAAAABAD',
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