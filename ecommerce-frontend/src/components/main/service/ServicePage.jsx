import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { Edit, Delete, Add } from '@material-ui/icons';
import Confirmation from 'components/reusable/Confirmation';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ServiceForm from 'components/main/service/ServiceForm';
import { useDispatch, useSelector } from 'react-redux';
import ServiceAction from 'actions/ServiceAction';
import ServiceTypeAction from 'actions/ServiceTypeAction';
import { UserService, ServiceService, ServiceTypeService } from 'services';
import UserAction from 'actions/UserAction';

const onInitialize = (dispatch) => {
    return () => {
        getServiceTypeList(dispatch);
        getServiceList(dispatch);
        getUserList(dispatch);
    }
}

const getServiceTypeList = async (dispatch) => {
    try {
        const { data } = await ServiceTypeService.getAll();
        dispatch(ServiceTypeAction.successServiceTypeList(data))
    } catch (error) {
        dispatch(ServiceTypeAction.failureServiceTypeList(error));
    }
};

const getServiceList = async (dispatch) => {
    try {
        const { data } = await ServiceService.getAll();
        dispatch(ServiceAction.successServiceList(data))
    } catch (error) {
        dispatch(ServiceAction.failureServiceList(error));
    }
};

const getUserList = async (dispatch) => {
    try {
        const { data } = await UserService.getAllServiceProviders();
        dispatch(UserAction.successServiceProviderList(data))
    } catch (error) {
        dispatch(UserAction.failureServiceProviderList(error));
    }
};

const useStyles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(1),
      zIndex: 1
    },
}));


export default function ServicePage() {
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(onInitialize(dispatch), []);
    const serviceTypeList = useSelector(state => state.serviceType.serviceTypeList)
    const serviceList = useSelector(state => state.service.serviceList)
    const serviceProviderList = useSelector(state => state.user.serviceProviderList)

    const emptyService = {
        userId: '',
        serviceTypeId: '',
        contactNumber: '',
        description: '',
        price: '',
        image: ''
    }

    const [uiState, setUiState] = useState({
        showCreateModal: false,
        showUpdateModal: false,
        showDeleteModal: false,
        isNew: true,
        targetService: null
    });

    const columns = [
        {
            name: "ID",
            label: "ID",
            options: { sort: true, filter: false }
        },
        {
            name: "UserName",
            label: "User",
            options: { sort: true, filter: false
            }
        },
        {
            name: "ServiceName",
            label: "Service Type",
            options: { sort: true, filter: false }
        },
        {
            name: "ContactNumber",
            label: "Contact Number",
            options: { sort: true, filter: false }
        },
        {
            name: "Price",
            label: "Price",
            options: { sort: true, filter: false }
        },
        {
            name: "Description",
            label: "Description",
            options: { sort: true, filter: false }
        },
        {
            name: "actions",
            label: "Actions",
            options: { sort: true, filter: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <section>
                            <Edit onClick={() => onUpdateRequest(tableMeta.rowData[0])}/>
                            <Delete onClick={() => onDeleteRequest(tableMeta.rowData[0])}/>
                        </section>
                    )                
                }
            }
        }
    ]

    const options = {
        count: serviceList.length,
        rowsPerPage: 5,
        rowsPerPageOptions: [],
        download: false,
        print: false,
        filter: false,
        searchOpen: true,
        selectableRows: false
    }

    const onDeleteRequest = async (id) => {
        try {
            const { data } = await ServiceService.getOne(id);

            setUiState({
                ...uiState,
                showDeleteModal: true,
                targetService: data.result
            });
        } catch (error) {
            await getServiceList(dispatch);

            setUiState({
                ...uiState,
                showDeleteModal: true,
                targetService: null
            });
        }
    }

    const onUpdateRequest = async (id) => {
        try {
            const { data } = await ServiceService.getOne(id);

            setUiState({
                ...uiState,
                showUpdateModal: true,
                targetService: data.result
            });
        } catch (error) {
            await getServiceList(dispatch);

            setUiState({
                ...uiState,
                showUpdateModal: true,
                targetService: null
            });
        }
    }

    const onCreateRequest = () => {
        setUiState({
          ...uiState,
          showCreateModal: true
        });
    }

    const onDeleteCancel = () => {
        setUiState({
            ...uiState,
            showDeleteModal: false,
            targetService: null
        });
    }

    const onUpdateCancel = () => {
        setUiState({
            ...uiState,
            showUpdateModal: false,
            targetService: null
        });
    }

    const onCreateCancel = () => {
        setUiState({
            ...uiState,
            showCreateModal: false
        });
    }

    const onDeleteSuccess = async () => {
        await getServiceList(dispatch);
        
        setUiState({
            ...uiState,
            showDeleteModal: false,
            targetService: null
        });
    }

    const onUpdateSuccess = async () => {
        await getServiceList(dispatch);

        setUiState({
            ...uiState,
            showUpdateModal: false,
            targetService: null
        });
    } 
    
    const onCreateSuccess = async () => {
        await getServiceList(dispatch);

        setUiState({
            ...uiState,
            showCreateModal: false
        });
    }

    const onConfirmDelete = async () => { 
        try {
            await ServiceService.delete(uiState.targetService.ID)
            onDeleteSuccess();
        } catch (error) {
            console.log("Error encountered upon service deletion")
        }
    }
    
    return (
        <section>
            <h1 style={{color: "white"}}> SERVICES </h1>

            <Fab color="primary" aria-label="add" onClick={onCreateRequest} className={classes.fab}>
                <Add />
            </Fab>

            <MUIDataTable
                data={serviceList.result != null ? serviceList.result : []}
                columns={columns}
                options={options}
            />

            <Confirmation
                title="Delete Service"
                isShown={uiState.showDeleteModal}
                onCancel={onDeleteCancel}
                onConfirm={onConfirmDelete}>
                {
                    uiState.targetService ? 
                    <>
                    You are going to delete the service with the following details: <br/><br/>
                    User: {uiState.targetService.UserName} <br/>
                    Service Type: {uiState.targetService.ServiceName} <br/><br/>
                    Are you sure you want to delete?
                    </> : ''
                }
            </Confirmation>

            <ServiceForm
                isShown={uiState.showCreateModal || uiState.showUpdateModal}
                onCancel={uiState.targetService ? onUpdateCancel : onCreateCancel}
                onSuccess={uiState.targetService ? onUpdateSuccess : onCreateSuccess}
                isNew={uiState.targetService ? false : true}
                service={uiState.targetService ? uiState.targetService : emptyService}
                userList={serviceProviderList.result}
                serviceTypeList={serviceTypeList.result}>

            </ServiceForm>
        </section>   
    )
}