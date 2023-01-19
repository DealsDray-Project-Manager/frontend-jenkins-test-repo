import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { axiosBot } from '../../../../../axios'
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
                alert(error)
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

            <MUIDataTable
                title={'Tray'}
                data={trayData}
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

const columns = [
    {
        name: 'index',
        label: 'Record No',
        options: {
            filter: false,
            sort: false,
            customBodyRender: (rowIndex, dataIndex) => dataIndex.rowIndex + 1,
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
        name: 'imei',
        label: 'IMEI',
        options: {
            filter: true,
        },
    },
    {
        name: 'bag_id',
        label: 'Bag Id',
        options: {
            filter: true,
        },
    },
    {
        name: 'body_damage',
        label: 'Body Damage',
        options: {
            filter: true,
        },
    },
    {
        name: 'body_damage_des',
        label: 'Body Damage Description',
        options: {
            filter: true,
        },
    },
    {
        name: 'item_recieved',
        label: 'Item Received In Packet',
        options: {
            filter: true,
        },
    },
    {
        name: 'model_brand',
        label: 'Mismatched Model Brand Name',
        options: {
            filter: true,
        },
    },
    {
        name: 'stickerOne',
        label: 'Other Info 1',
        options: {
            filter: true,
        },
    },
    {
        name: 'stickerTwo',
        label: 'Other Info 2',
        options: {
            filter: true,
        },
    },
    {
        name: 'stickerThree',
        label: 'Other Info 3',
        options: {
            filter: true,
        },
    },
    {
        name: 'stickerFour',
        label: 'Other Info 4',
        options: {
            filter: true,
        },
    },
    {
        name: 'added_time',
        label: 'Added Date',
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
