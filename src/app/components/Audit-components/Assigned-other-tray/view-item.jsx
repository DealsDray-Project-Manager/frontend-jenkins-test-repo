import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import { axiosAuditAgent } from '../../../../axios'

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
    const [trayItem, setTrayItem] = useState([])
    const { trayId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosAuditAgent.post(
                    '/view-items/' + trayId
                )
                if (response.status === 200) {
                    setTrayItem(response.data.data.items)
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

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
            name: 'uic',
            label: 'UIC',
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
            label: 'BOT Tray',
            options: {
                filter: true,
            },
        },
        {
            name: 'bot_agent',
            label: 'BOT Agent',
            options: {
                filter: true,
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Assigned Tray', path: '/pages' },
                        { name: 'Tray-Item' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Tray'}
                data={trayItem}
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
