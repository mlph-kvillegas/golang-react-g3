import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { Edit, Delete, Add } from '@material-ui/icons';
import Confirmation from 'components/reusable/Confirmation';
import UserForm from 'components/main/user/UserForm';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { UserService } from 'services';
import { useSelector, useDispatch } from 'react-redux';
import UserAction from 'actions/UserAction';

const useStyles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(1),
      zIndex: 1
    },
}));

const getUserList = async (dispatch) => {
    try {
        const { data } = await UserService.getAll();
        dispatch(UserAction.successUserList(data))
    } catch (error) {
        dispatch(UserAction.failureUserList(error));
    }
};

const onInitialize = (dispatch) => {
    return () => {
        getUserList(dispatch);
    }
}


export default function UserPage() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [uiState, setUiState] = useState({
        showCreateModal: false,
        showUpdateModal: false,
        showDeleteModal: false,
        isNew: true,
        targetUserData: null,
    });

    useEffect(onInitialize(dispatch), []);
    const userList = useSelector(state => state.user.userList)

    const userColumns = [{
        name: "ID",
        label: "ID",
        options: {
            sort: true,
            filter: false
        }
    },{
        name: "FirstName",
        label: "First Name",
        options: {
            sort: true,
            filter: false
        }
    },
    {
        name: "LastName",
        label: "Last Name",
        options: {
            sort: true,
            filter: false
        }
    },{
        name: "Email",
        label: "Email",
        options: {
            sort: true,
            filter: false
        }
    },
    {
        name: "UserName",
        label: "User Name",
        options: {
            sort: true,
            filter: false
        }
    },
    {
        name: "Type",
        label: "Type",
        options: {
            sort: true,
            filter: false
        }
    },{
        name: "Address",
        label: "Address",
        options: {
            filter: false,
            sort: true
        }
    },
    {
        name: "ContactNumber",
        label: "Contact Number",
        options: {
            filter: false,
            sort: true
        }
    },{
        name: "Bio",
        label: "Bio",
        options: {
            filter: false,
            sort: true
        }
    },
    {
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
    }];

    const options = {
        count: userList.length,
        rowsPerPage: 5,
        rowsPerPageOptions: [],
        download: false,
        print: false,
        filter: false,
        searchOpen: true,
        selectableRows: false
    }

    const emptyUser = {
        firstName : '',
        lastName : '',
        email : '',
        userName : '',
        address : '',
        contactNumber : '',
        bio : '',
        password: '',
        type: ''
    }

    const onDeleteRequest = async(id) => {
        try {
            const { data } = await UserService.getOne(id);
            setUiState({
                ...uiState,
                showDeleteModal: true,
                targetUserData: data.result
            });
        } catch (error) {
            await getUserList(dispatch);

            setUiState({
                ...uiState,
                showDeleteModal: true,
                targetUserData: null
            });
        }
    }

    const onConfirmDelete = async () => { 
        try {
            await UserService.delete(uiState.targetUserData.ID)
            onDeleteSuccess();
        } catch (error) {
            console.log("Error encountered upon user deletion")
        }
    }

    const onDeleteCancel = () => {
        setUiState({
            ...uiState,
            showDeleteModal: false,
            targetUserData: null
        });
    }

    const onDeleteSuccess = async () => {
        await getUserList(dispatch);
        setUiState({
            ...uiState,
            showDeleteModal: false,
            targetUserData: null
        });
    }

    const onUpdateRequest = async(id) => {
        try {
            const { data } = await UserService.getOne(id);
            setUiState({
                ...uiState,
                showUpdateModal: true,
                targetUserData: data.result
            });
        } catch (error) {
            await getUserList(dispatch);

            setUiState({
                ...uiState,
                showUpdateModal: true,
                targetUserData: null
            });
        }
    }

    const onUpdateCancel = () => {
        setUiState({
            ...uiState,
            showUpdateModal: false,
            targetUserData: null
        });
    }

    const onUpdateSuccess = async () => {
        await getUserList(dispatch);
        
        setUiState({
            ...uiState,
            showUpdateModal: false,
            targetUserData: null
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
        await getUserList(dispatch)
        setUiState({
            ...uiState,
            showCreateModal: false
        });
    }
    
    return (
        <section>
            <h1 style={{color: "white"}}> USERS </h1>

            <Fab color="primary" aria-label="add" onClick={onCreateRequest} className={classes.fab}>
                <Add />
            </Fab>

            <MUIDataTable
                data={userList.result}
                columns={userColumns}
                options={options}
            />

            <Confirmation
                title="Delete User"
                isShown={uiState.showDeleteModal}
                onCancel={onDeleteCancel}
                onConfirm={onConfirmDelete}>
                {
                    uiState.targetUserData ? 
                    <>
                    You are going to delete the user with the following details: <br/><br/>
                    First Name: {uiState.targetUserData.FirstName} <br/>
                    Last Name: {uiState.targetUserData.LastName} <br/>
                    Email: {uiState.targetUserData.Email} <br/>
                    Address: {uiState.targetUserData.Address} <br/>
                    Contact Number Key: {uiState.targetUserData.ContactNumber} <br/>
                    Description: {uiState.targetUserData.Bio} <br/>
                    <br/>
                    Are you sure you want to delete?
                    </> : ''
                }
            </Confirmation>

            <UserForm
                isShown={uiState.showCreateModal || uiState.showUpdateModal}
                onCancel={uiState.targetUserData ? onUpdateCancel : onCreateCancel}
                onSuccess={uiState.targetUserData ? onUpdateSuccess : onCreateSuccess}
                isNew={uiState.targetUserData ? false : true}
                userData={uiState.targetUserData? uiState.targetUserData:emptyUser}>
            </UserForm>
        </section>   
    )
}