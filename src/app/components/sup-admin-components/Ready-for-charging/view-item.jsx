import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import { axiosWarehouseIn } from '../../../../axios'
import { useParams } from 'react-router-dom'

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
    const [isCheck, setIsCheck] = useState([])
    const [whtTrayItem, setWhtTrayItem] = useState([])
    const { trayId } = useParams()

    useEffect(() => {
        const fetchWht = async () => {
            try {
                const res = await axiosWarehouseIn.post(
                    '/getWhtTrayItem/' + trayId + '/' + 'all-wht-tray'
                )
                if (res.status === 200) {
                    setWhtTrayItem(res.data?.data?.items)
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchWht()
        return () => setIsAlive(false)
    }, [isAlive])

    const handleClick = (e) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'uic', // field name in the row object
            label: 'UIC', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: 'MUIC',
            options: {
                filter: true,
            },
        },
        {
            name: 'brand_name',
            label: 'Brand',
            options: {
                filter: true,
            },
        },
        {
            name: 'model_name',
            label: 'Model',
            options: {
                filter: true,
            },
        },
        {
            name: 'tracking_id',
            label: 'Tracking Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'tray_id',
            label: 'Bot Tray',
            options: {
                filter: true,
            },
        },
        {
            name: 'bot_agent',
            label: 'Bot Agent',
            options: {
                filter: true,
                display: false,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Ready For Charging', path: '/' },
                        { name: 'View-Item' },
                    ]}
                />
            </div>
            <MUIDataTable
                title={'WHT Tray Item'}
                data={whtTrayItem}
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
        </Container>
    )
}

export default SimpleMuiTable
