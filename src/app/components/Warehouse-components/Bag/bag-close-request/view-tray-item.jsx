import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { axiosBot } from '../../../../../axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Typography, Table, TableContainer } from '@mui/material'

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

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    width: '250%',
    height: '100%',
    whiteSpace: 'pre',
    '& thead': {
        '& th:first-of-type': {
            paddingLeft: 16,
        },
    },
    '& td': {
        borderBottom: '1px solid #ddd',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const ScrollableTableContainer = styled(TableContainer)`
    overflow-x: auto;
`

const SimpleMuiTable = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isAlive, setIsAlive] = useState(true)
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let res = await axiosBot.post('/trayItem/' + trayId)
                if (res.status == 200) {
                    setIsLoading(false)
                    setTrayData(res.data.data?.items)
                }
            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonText: 'Ok',
                    text: error,
                })
            }
        }
        fetchData()
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const columns = [
        {
            name: 'index',
            label: (
                <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                    Record No
                </Typography>
            ),
            options: {
                filter: false,
                sort: false,
                // setCellProps: () => ({ align: 'center' }),
                customBodyRender: (rowIndex, dataIndex) => (
                    <Typography sx={{ pl: 4 }}>
                        {dataIndex.rowIndex + 1}
                    </Typography>
                ),
            },
        },
        {
            name: 'uic',
            label: <Typography sx={{ fontWeight: 'bold' }}>UIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'imei',
            label: <Typography sx={{ fontWeight: 'bold' }}>IMEI</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'bag_id',
            label: <Typography sx={{ fontWeight: 'bold' }}>Bag ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'body_damage',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>Body Damage</Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'body_damage_des',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Body Damage Description
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'added_time',
            label: (
                <Typography sx={{ fontWeight: 'bold' }}>
                    Added in BOT Tray
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        hour12: true,
                    }),
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Tray', path: '/' },
                        { name: 'Tray-Item', path: '/' },
                    ]}
                />
            </div>

            <ScrollableTableContainer>
                <ProductTable>
                    <MUIDataTable
                        title={'Tray'}
                        data={trayData}
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
                </ProductTable>
            </ScrollableTableContainer>
        </Container>
    )
}

export default SimpleMuiTable
