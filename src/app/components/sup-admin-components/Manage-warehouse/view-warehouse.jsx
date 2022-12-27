import Axios from 'axios'
import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import MemberEditorDialog from './add-warehouse'

import {
    Button
} from '@mui/material'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [userList, setUserList] = useState([])
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)


    useEffect(() => {
        Axios.get('/api/user/all').then(({ data }) => {
            console.log(data)
            if (isAlive) setUserList(data)
        })
        return () => setIsAlive(false)
    }, [isAlive])
    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
        updatePageData()
    }
    const updatePageData = () => {
        // getAllUser().then(({ data }) => {
        //     setUserList(data)
        // })
    }

    useEffect(() => {
        updatePageData()
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Warehouse', path: '/pages' },
                        
                    ]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => setShouldOpenEditorDialog(true)}
            >
                Add New Warehouse
            </Button>
           
            <MUIDataTable
                title={'All Warehouse'}
                data={userList}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    selectableRows: 'none', // set checkbox for each row
                    // search: false, // set search option
                    // filter: false, // set data filter option
                    // download: false, // set download option
                    // print: false, // set print option
                    // pagination: true, //set pagination option
                    // viewColumns: false, // set column option
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
            {shouldOpenEditorDialog && (
                <MemberEditorDialog
                    handleClose={handleDialogClose}
                    open={shouldOpenEditorDialog}
                   
                />
            )}
        </Container>
    )
}

const columns = [
    {
        name: 'name', // field name in the row object
        label: 'Name', // column title that will be shown in table
        options: {
            filter: true,
        },
    },
    {
        name: 'email',
        label: 'Email',
        options: {
            filter: true,
        },
    },
    {
        name: 'company',
        label: 'Company',
        options: {
            filter: true,
        },
    },
    {
        name: 'balance',
        label: 'Balance',
        options: {
            filter: true,
        },
    },
]

export default SimpleMuiTable
