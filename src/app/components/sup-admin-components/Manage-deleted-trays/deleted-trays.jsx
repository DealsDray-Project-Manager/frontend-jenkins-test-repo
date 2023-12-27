import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
import {
    Button,
    Box,
    IconButton,
    Icon,
    Typography,
    Table,
    TableContainer,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo } from '../../../../axios'
import EditRoadIcon from '@mui/icons-material/EditRoad'
import '../../../../app.css'
import useAuth from 'app/hooks/useAuth'

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
    const [trayList, setTrayList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setIsLoading(true)

                const res = await axiosSuperAdminPrexo.post(
                    `/getDeletedMaster/${'tray-master'}`
                )
                if (res.status === 200) {
                    setIsLoading(false)
                    setTrayList(res.data.data)
                }
            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchBrand()
        return () => setIsAlive(false)
    }, [isAlive])

    const handelRestore = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You Want to Restore!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Restore!',
            input: 'text', // Specify the input type as text
            inputPlaceholder: 'Enter your reason here', // Placeholder text for the textbox
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to enter a reason!';
                }
            },
        });
    
        // Check if the user confirmed the action and entered a reason
        if (result.isConfirmed) {
            const reason = result.value; // Access the value property
    
            try {
                let obj = {
                    actionUser: user.username,
                    reason: reason,
                    id: id,
                };
    
                let response = await axiosSuperAdminPrexo.post(
                    '/restoreDeletedMaster',
                    obj
                );
    
                if (response.status === 200) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: response.data.message,
                        confirmButtonText: 'Ok',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setIsAlive((isAlive) => !isAlive);
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.data.message,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                });
            }
        }
    };
    

    const columns = [
        {
            name: 'index',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Record No</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 2 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray ID</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'cpc',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Location</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'warehouse',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Warehouse</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray Display Name</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray Limit</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Brand</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Model</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'display',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray Display</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'type_taxanomy',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Tray Type</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },

        {
            name: 'tray_grade',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Grade</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'reason',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Reason</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'deleted_by',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Deleted By</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'created_at',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Created Date</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'createdAt',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Deleted Date</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
        {
            name: 'code',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Actions</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e) => handelRestore(value)}
                            >
                                Restore
                            </Button>
                        </Box>
                    )
                },
            },
        },
    ]

    const trayData = useMemo(() => {
        return (
            <Table className="custom-table">
                <MUIDataTable
                    title={'Manage Deleted Trays'}
                    data={trayList}
                    columns={columns}
                    options={{
                        filterType: 'textField',
                        responsive: 'simple',
                        download: false,
                        print: false,
                        textLabels: {
                            body: {
                                noMatch: isLoading
                                    ? 'Loading...'
                                    : 'Sorry, there is no matching data to display',
                            },
                        },
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
            </Table>
        )
    }, [trayList, isLoading])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'Deleted Trays', path: '/' }]}
                />
            </div>

            {trayData}
        </Container>
    )
}

export default SimpleMuiTable
