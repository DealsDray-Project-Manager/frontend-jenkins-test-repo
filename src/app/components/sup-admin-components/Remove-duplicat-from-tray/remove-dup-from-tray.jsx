import { Breadcrumb } from 'app/components'
import React, { useState } from 'react'
import { styled } from '@mui/system'
import MUIDataTable from 'mui-datatables'
import { axiosSuperAdminPrexo } from '../../../../axios'
import {
    Button,
    Typography,
    Table,
    TextField,
    Box,
    Grid,
    Checkbox,
    Card,
} from '@mui/material'
import Swal from 'sweetalert2'
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

function Search() {
    const [trayId, setTrayId] = useState('')
    const [trayData, setTrayData] = useState({})
    const [isCheck1, setIsCheck1] = useState([])
    const [isCheck2, setIsCheck2] = useState([])

    const searchTrayId = async () => {
        try {
            let res = await axiosSuperAdminPrexo.post(
                '/getTrayForRemoveDuplicate/' + trayId
            )
            if (res.status == 200) {
                setTrayData(res.data.data)
            } else {
                setTrayData({})
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleClick1 = (e) => {
        const { id, checked } = e.target
        setIsCheck1([...isCheck1, id])
        if (!checked) {
            setIsCheck1(isCheck1.filter((item) => item !== id))
        }
    }

    const handleClick2 = (e) => {
        const { id, checked } = e.target
        setIsCheck2([...isCheck2, id])
        if (!checked) {
            setIsCheck2(isCheck2.filter((item) => item !== id))
        }
    }
    /*------------------------------HANDEL REMOVE UNITS FROM TRAY ---------------------------------------------------*/
    const handelRemove = async () => {
        try {
            let obj = {
                trayId: trayId,
                actualSide: isCheck2,
                expectedSide: isCheck1,
            }
            const res = await axiosSuperAdminPrexo.post(
                '/removeDuplicteFromTray',
                obj
            )
            if (res.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                    confirmButtonText: 'Ok',
                })
                searchTrayId()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: res.data.message,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
        }
    }

    const ExpectedSide = [
        {
            name: 'uic',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Select</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick1(e)
                            }}
                            disabled={tableMeta.rowData[3] !== 'Duplicate'}
                            id={value}
                            key={value}
                            checked={isCheck1.includes(value)}
                        />
                    )
                },
            },
        },
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
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'uic', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Uic</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'dup_uic_status',
            options: {
                filter: false,
                display: false,
                viewColumns: false,
                sort: false,
            },
        },
    ]

    const ActualSide = [
        {
            name: 'uic',
            label: (
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginLeft: '7px' }}
                >
                    <>Select</>
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick2(e)
                            }}
                            disabled={tableMeta.rowData[3] !== 'Duplicate'}
                            id={value}
                            key={value}
                            checked={isCheck2.includes(value)}
                        />
                    )
                },
            },
        },
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
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'uic', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Uic</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: 'dup_uic_status',
            options: {
                filter: false,
                display: false,
                viewColumns: false,
                sort: false,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Remove Duplicate Units', path: '/' },
                    ]}
                />
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
            >
                <Box>
                    <TextField
                        label="Enter Tray Id"
                        variant="outlined"
                        onChange={(e) => {
                            setTrayId(e.target.value)
                        }}
                    />
                </Box>
                <Box>
                    <Button
                        sx={{ mb: 2, mt: 1, ml: 3 }}
                        variant="contained"
                        color="primary"
                        disabled={trayId == ''}
                        onClick={(e) => {
                            searchTrayId(e)
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>
            <Card sx={{ mb: 1, mt: 1 }}>
                <Typography sx={{ m: 2 }}>Tray ID :- {trayId}</Typography>
                <Typography sx={{ m: 2 }}>
                    Tray Status :- {trayData?.sort_id}
                </Typography>
            </Card>
            <Grid container spacing={3}>
                <Grid item lg={6} md={6} xs={12}>
                    <Table className="custom-table">
                        <MUIDataTable
                            title={'Expected'}
                            data={trayData?.items}
                            columns={ExpectedSide}
                            options={{
                                filterType: 'textField',
                                responsive: 'simple',
                                download: false,
                                print: false,
                                filter: false,
                                sort: false,
                                viewColumns: false,
                                selectableRows: 'none', // set checkbox for each row
                                // search: false, // set search option
                                // filter: false, // set data filter option
                                // download: false, // set download option
                                // print: false, // set print option
                                // pagination: true, //set pagination option
                                // viewColumns: false, // set column option
                                customSort: (data, colIndex, order) => {
                                    return data.sort((a, b) => {
                                        if (colIndex === 1) {
                                            return (
                                                (a.data[colIndex].price <
                                                b.data[colIndex].price
                                                    ? -1
                                                    : 1) *
                                                (order === 'desc' ? 1 : -1)
                                            )
                                        }
                                        return (
                                            (a.data[colIndex] < b.data[colIndex]
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    })
                                },
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Table>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <Table className="custom-table">
                        <MUIDataTable
                            title={'Actual'}
                            data={trayData?.actual_items}
                            columns={ActualSide}
                            options={{
                                filterType: 'textField',
                                responsive: 'simple',
                                download: false,
                                print: false,
                                filter: false,
                                sort: false,
                                viewColumns: false,
                                selectableRows: 'none', // set checkbox for each row
                                // search: false, // set search option
                                // filter: false, // set data filter option
                                // download: false, // set download option
                                // print: false, // set print option
                                // pagination: true, //set pagination option
                                // viewColumns: false, // set column option
                                customSort: (data, colIndex, order) => {
                                    return data.sort((a, b) => {
                                        if (colIndex === 1) {
                                            return (
                                                (a.data[colIndex].price <
                                                b.data[colIndex].price
                                                    ? -1
                                                    : 1) *
                                                (order === 'desc' ? 1 : -1)
                                            )
                                        }
                                        return (
                                            (a.data[colIndex] < b.data[colIndex]
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    })
                                },
                                elevation: 0,
                                rowsPerPageOptions: [10, 20, 40, 80, 100],
                            }}
                        />
                    </Table>
                </Grid>
            </Grid>
            <Box sx={{ textAlign: 'right' }}>
                <Button
                    sx={{
                        mt: 2,
                    }}
                    variant="contained"
                    disabled={isCheck1.length == 0 && isCheck2.length == 0}
                    style={{ backgroundColor: 'red' }}
                    onClick={(e) => {
                        if (window.confirm('You Want to Remove?')) {
                            handelRemove(e)
                        }
                    }}
                >
                    Remove
                </Button>
            </Box>
        </Container>
    )
}

export default Search
