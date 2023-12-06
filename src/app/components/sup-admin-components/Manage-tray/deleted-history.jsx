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
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo } from '../../../../axios'
import EditRoadIcon from '@mui/icons-material/EditRoad'
import '../../../../app.css'

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
    const { trayId } = useParams()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setIsLoading(true)

                const res = await axiosSuperAdminPrexo.post(
                    `/getTrayDeletionHistory/${trayId}`
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

    const handelRestore = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You Want to Restore!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Restore!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let response = await axiosSuperAdminPrexo.post(
                        `restoreDeletedMaster/${id}`
                    )
                    if (response.status == 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: response.data.message,
                            confirmButtonText: 'Ok',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setIsAlive((isAlive) => !isAlive)
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.data.message,
                        })
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    })
                }
            }
        })
    }

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
    ]

    const trayData = useMemo(() => {
        return (
            <Table className="custom-table">
                <MUIDataTable
                    title={'Histories'}
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
                    routeSegments={[{ name: 'Deleted History', path: '/' }]}
                />
            </div>

            {trayData}
        </Container>
    )
}

export default SimpleMuiTable
