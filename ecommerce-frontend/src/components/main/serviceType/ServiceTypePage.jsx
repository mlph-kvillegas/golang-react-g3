import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { Edit, Delete, Add } from '@material-ui/icons';
import Confirmation from 'components/reusable/Confirmation';
import ServiceTypeForm from 'components/main/serviceType/ServiceTypeForm';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import ServiceTypeService from 'services/ServiceTypeService';
import ServiceTypeAction from 'actions/ServiceTypeAction';
import { useDispatch, useSelector } from 'react-redux';

const getServiceTypeList = async (dispatch) => {
    try {
        const { data } = await ServiceTypeService.getAll();
        dispatch(ServiceTypeAction.successServiceTypeList(data))
    } catch (error) {
        dispatch(ServiceTypeAction.failureServiceTypeList(error));
    }
};

const onInitialize = (dispatch) => {
    return () => {
        getServiceTypeList(dispatch);
    }
}

const useStyles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(1),
      zIndex: 1
    },
}));

export default function ServiceTypePage() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(onInitialize(dispatch), []);
    const serviceTypeList = useSelector(state => state.serviceType.serviceTypeList)
    
    const [uiState, setUiState] = useState({
        showCreateModal: false,
        showUpdateModal: false,
        showDeleteModal: false,
        isNew: true,
        targetServiceType: null
    });

    const options = {
        count: serviceTypeList.count,
        rowsPerPage: 5,
        rowsPerPageOptions: [],
        download: false,
        print: false,
        filter: false,
        searchOpen: true,
        selectableRows: false
    }
    
    const emptyServiceType = {
        serviceName: '',
        serviceKey: ''
    }

    const serviceTypeColumns = [
        {
            name: "ID",
            label: "ID",
            options: {
                sort: true,
                filter: false
            }
        },{
            name: "ServiceName",
            label: "Service Name",
            options: {
                sort: true,
                filter: false
            }
        },{
            name: "ServiceKey",
            label: "Service Key",
            options: {
                sort: true,
                filter: false
            }
        },{
            name: "actions",
            label: "Actions",
            options: {
                sort: true,
                filter: false,
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

    const onDeleteRequest = async (id) => {
        try {
            const { data } = await ServiceTypeService.getOne(id);

            setUiState({
                ...uiState,
                showDeleteModal: true,
                targetServiceType: data.result
            });
        } catch (error) {
            await getServiceTypeList(dispatch);

            setUiState({
                ...uiState,
                showDeleteModal: true,
                targetServiceType: null
            });
        }
    }

    const onDeleteCancel = () => {
        setUiState({
            ...uiState,
            showDeleteModal: false,
            targetServiceType: null
        });
    }

    const onConfirmDelete = async () => { 
        try {
            await ServiceTypeService.delete(uiState.targetServiceType.ID)
            onDeleteSuccess();
        } catch (error) {
            console.log("Error encountered upon service type deletion")
        }
    }

    const onDeleteSuccess = async () => {
        await getServiceTypeList(dispatch);
        setUiState({
            ...uiState,
            showDeleteModal: false,
            targetServiceType: null
        });
    }

    const onUpdateRequest = async (id) => {
        try {
            const { data } = await ServiceTypeService.getOne(id);

            setUiState({
                ...uiState,
                showUpdateModal: true,
                targetServiceType: data.result
              });
        } catch (error) {
            await getServiceTypeList(dispatch);

            setUiState({
                ...uiState,
                showUpdateModal: true,
                targetServiceType: null
              });
        }        
    }

    const onUpdateCancel = () => {
        setUiState({
            ...uiState,
            showUpdateModal: false,
            targetServiceType: null
        });
    }

    const onUpdateSuccess = async () => {
        await getServiceTypeList(dispatch);

        setUiState({
            ...uiState,
            showUpdateModal: false,
            targetServiceType: null
        });
    }

    const onCreateRequest = () => {
        setUiState({
          ...uiState,
          showCreateModal: true
        });
    }

    const onCreateCancel = () => {
        setUiState({
            ...uiState,
            showCreateModal: false
        });
    }

    const onCreateSuccess = async() => {
        await getServiceTypeList(dispatch);
        setUiState({
            ...uiState,
            showCreateModal: false
        });
    }
    
    return (
        <section>
            <h1 style={{color: "white"}}> SERVICE TYPES </h1>

            <Fab color="primary" aria-label="add" onClick={onCreateRequest} className={classes.fab}>
                <Add />
            </Fab>

            <MUIDataTable
                data={serviceTypeList.result != null ? serviceTypeList.result : []}
                columns={serviceTypeColumns}
                options={options}
            />

            <Confirmation
                title="Delete Service Type"
                isShown={uiState.showDeleteModal}
                onCancel={onDeleteCancel}
                onConfirm={onConfirmDelete}>
                {
                    uiState.targetServiceType ? 
                    <>
                    You are going to delete the service type with the following details: <br/><br/>
                    Service Name: {uiState.targetServiceType.ServiceName} <br/>
                    Service Key: {uiState.targetServiceType.ServiceKey} <br/><br/>
                    Are you sure you want to delete?
                    </> : ''
                }
            </Confirmation>

            <ServiceTypeForm
                isShown={uiState.showCreateModal || uiState.showUpdateModal}
                onCancel={uiState.targetServiceType ? onUpdateCancel : onCreateCancel}
                onSuccess={uiState.targetServiceType ? onUpdateSuccess : onCreateSuccess}
                isNew={uiState.targetServiceType ? false : true}
                serviceType={uiState.targetServiceType ? uiState.targetServiceType : emptyServiceType}>

            </ServiceTypeForm>
        </section>   
    )
}