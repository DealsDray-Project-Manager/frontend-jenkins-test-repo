import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import MemberEditorDialog from './add-location'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { axiosSuperAdminPrexo } from '../../../../axios'

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
    const [locationList, setLocatiolList] = useState([])
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await axiosSuperAdminPrexo.post('/getLocation')
                if (res.status === 200) {
                    setLocatiolList(res.data.data)
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchLocation()
        return () => setIsAlive(false)
    }, [isAlive])
    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Location', path: '/pages' }]}
                />
            </div>
            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                onClick={() => setShouldOpenEditorDialog(true)}
            >
                Add New Location
            </Button>
            <MUIDataTable
                title={'All Location'}
                data={locationList}
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
        name: 'index',
        label: 'Record No',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (rowIndex, dataIndex) => dataIndex.rowIndex + 1,
        },
    },
    {
        name: 'name', // field name in the row object
        label: 'Name', // column title that will be shown in table
        options: {
            filter: true,
        },
    },
    {
        name: 'code',
        label: 'Code',
        options: {
            filter: true,
        },
    },
    {
        name: 'address',
        label: 'Address',
        options: {
            filter: true,
        },
    },
    {
        name: 'city',
        label: 'City',
        options: {
            filter: true,
        },
    },
    {
        name: 'state',
        label: 'State',
        options: {
            filter: true,
        },
    },
    {
        name: 'country',
        label: 'Country',
        options: {
            filter: true,
        },
    },
    {
        name: 'pincode',
        label: 'Pincode',
        options: {
            filter: true,
        },
    },
    {
        name: 'Actions',
        label: 'Actions',
        options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <>
                        <Button onClick={() => console.log(value, tableMeta)}>
                            Edit
                        </Button>
                        <Button onClick={() => console.log(value, tableMeta)}>
                            Delete
                        </Button>
                    </>
                )
            },
        },
    },
]

export default SimpleMuiTable
