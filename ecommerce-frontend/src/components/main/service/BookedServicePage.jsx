import React, { useState, useEffect } from 'react';
import { ServiceService } from 'services';
import ServiceAction from 'actions/ServiceAction';
import { useDispatch, useSelector } from 'react-redux';
import { Edit } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import ReviewForm from './ReviewForm';


const onInitialize = (dispatch) => {
    return () => {
        getBookedServiceList(dispatch);
    }
}

const getBookedServiceList = async (dispatch) => {
    try {
        const { data } = await ServiceService.getAllBookService();
        dispatch(ServiceAction.successBookedServiceList(data))
    } catch (error) {
        dispatch(ServiceAction.failureBookedServiceList(error));
    }
};

export default function BookedServicePage() {
    const dispatch = useDispatch();

    useEffect(onInitialize(dispatch), []);
    const bookedServices = useSelector(state => state.service.bookedServiceList)

    const columns = [
        {
            name: "ID",
            label: "ID",
            options: { sort: true, filter: false }
        },
        {
            name: "Customer",
            label: "Customer",
            options: { sort: true, filter: false }
        },
        {
            name: "Service",
            label: "Service",
            options: { sort: true, filter: false }
        },
        {
            name: "actions",
            label: "Actions",
            options: { sort: true, filter: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <section>
                            <Edit onClick={() => reviewService(tableMeta.rowData[0])}/>
                        </section>
                    )                
                }
            }
        }
    ]

    const reviewService = (id) => {
        setUiState({
            ...uiState,
            showRatingModal: true,
            bookedServiceId: id
        });
    }

    const onModalClose = () => {
        setUiState({
            ...uiState,
            showRatingModal: false,
            bookedServiceId: null
        })
    }

    const [uiState, setUiState] = useState({
        showRatingModal: false,
        bookedServiceId: null
    });

    const options = {
        count: bookedServices.length,
        rowsPerPage: 5,
        rowsPerPageOptions: [],
        download: false,
        print: false,
        filter: false,
        searchOpen: true,
        selectableRows: false
    }

    return (
        <section>
            <h1 style={{color: "white"}}> BOOKED SERVICES </h1>

            <MUIDataTable
                data={bookedServices.result != null ? bookedServices.result : []}
                columns={columns}
                options={options}
            />

            <ReviewForm
                isShown={uiState.showRatingModal}
                closeModal={onModalClose}
                bookedServiceId={uiState.bookedServiceId}
            >

            </ReviewForm>
        </section>
    )

}