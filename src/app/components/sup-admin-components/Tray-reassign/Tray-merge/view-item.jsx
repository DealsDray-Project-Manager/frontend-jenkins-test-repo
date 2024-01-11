import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { axiosBot } from '../../../../../axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Typography, Table } from '@mui/material'
import '../../../../../app.css'

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
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosBot.post('/trayItem/' + trayId)
                if (res.status == 200) {
                    setTrayData(res.data.data?.items)
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
        fetchData()
        return () => setIsAlive(false)
    }, [isAlive])

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
            <Table className="custom-table">
                <MUIDataTable
                    title={'Tray'}
                    data={trayData}
                    columns={columns}
                    options={{
                        filterType: 'textField',
                        responsive: 'simple',
                        download: false,
                        print: false,
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
        </Container>
    )
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
            filter: true,
            sort: true,
            customBodyRender: (rowIndex, dataIndex) => (
                <Typography sx={{ pl: 4 }}>{dataIndex.rowIndex + 1}</Typography>
            ),
        },
    },
    {
        name: 'uic',
        label: (
            <Typography variant="subtitle1" fontWeight="bold">
                <>UIC</>
            </Typography>
        ),
        options: {
            filter: true,
        },
    },
    {
        name: 'imei',
        label: (
            <Typography variant="subtitle1" fontWeight="bold">
                <>IMEI</>
            </Typography>
        ),
        options: {
            filter: true,
        },
    },
    {
        name: 'bag_id',
        label: (
            <Typography variant="subtitle1" fontWeight="bold">
                <>Bag ID</>
            </Typography>
        ),
        options: {
            filter: true,
        },
    },
    {
        name: 'body_damage',
        label: (
            <Typography variant="subtitle1" fontWeight="bold">
                <>Body Damage</>
            </Typography>
        ),
        options: {
            filter: true,
        },
    },
    {
        name: 'body_damage_des',
        label: (
            <Typography variant="subtitle1" fontWeight="bold">
                <>Body Damage Description</>
            </Typography>
        ),
        options: {
            filter: true,
        },
    },

    {
        name: 'added_time',
        label: (
            <Typography variant="subtitle1" fontWeight="bold">
                <>Added in BOT Tray</>
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

export default SimpleMuiTable
