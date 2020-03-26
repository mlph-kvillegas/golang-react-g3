import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { ServiceService } from 'services';
import ServiceAction from 'actions/ServiceAction';
import ServiceBox from './serviceBox/ServiceBox';
import ServiceDetails from './ServiceDetails';

const onInitialize = (dispatch) => {
    return () => {
        getServiceList(dispatch);
    }
}

const getServiceList = async (dispatch) => {
    try {
        const { data } = await ServiceService.getAll();
        dispatch(ServiceAction.successServiceList(data))
    } catch (error) {
        dispatch(ServiceAction.failureServiceList(error));
    }
};

export default function Timeline() {

    const dispatch = useDispatch();

    useEffect(onInitialize(dispatch), []);
    const services = useSelector(state => state.service.serviceList)

    const [uiState, setUiState] = useState({
        showServiceDetails: false,
        targetService: null
    });

    const showDetails = async (id) => {
        try {
            const { data } = await ServiceService.getOne(id);

            setUiState({
                ...uiState,
                showServiceDetails: true,
                targetService: data.result
            });
        } catch (error) {
            await getServiceList(dispatch);

            setUiState({
                ...uiState,
                showServiceDetails: false,
                targetService: null
            });
        }
    }

    const onModalClose = () => {
        setUiState({
            ...uiState,
            showServiceDetails: false,
            targetService: null
        })
    }

    return(
        <section>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {services.result != null &&  services.result.map(service => 
                    <div key={service.ID} style={{width: '33%'}} onClick={() => showDetails(service.ID)}>
                        <ServiceBox {...service}></ServiceBox> 
                        <br />
                    </div>
                )}

            </div>

            <ServiceDetails
                isShown = {uiState.showServiceDetails}
                service = {uiState.targetService} 
                closeModal = {onModalClose}
            >

            </ServiceDetails>
        </section>
    )
}