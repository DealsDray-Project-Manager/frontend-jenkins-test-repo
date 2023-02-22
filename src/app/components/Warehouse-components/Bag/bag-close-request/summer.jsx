import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { axiosWarehouseIn } from '../../../../../axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

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
    const [bot, setBot] = useState([])
    const navigate = useNavigate()

    const { bagId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let botTray = await axiosWarehouseIn.post(
                    '/summeryBotTrayBag/' + bagId
                )
                if (botTray.status == 200) {
                    setBot(botTray.data.data)
                } else {
                
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title:botTray?.data?.message,
                        confirmButtonText: 'Ok',
                    })
                    navigate(-1)
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
    }, [])

    const columns = [
        {
            name: 'index',
            label: 'Record No',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'uic_code',
            label: 'UIC',
            options: {
                filter: true,
                customBodyRender: (value) => value.code,
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
            label: 'Tray id',
            options: {
                filter: true,
            },
        },
        {
            name: 'tray_type',
            label: 'Tray Type',
            options: {
                filter: true,
            },
        },
        {
            name: 'tray_status',
            label: 'Tray Status',
            options: {
                filter: true,
            },
        },
        {
            name: 'bot?.[0]?.description',
            label: 'Description',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return bot?.[0]?.description
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Bag', path: '/' },
                        { name: 'Bag-Close-Request' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Requests'}
                data={bot[0]?.delivery}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'simple',
                    download:false,
                    print:false,
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
                                        : 1) * (order === 'desc' ? 1 : -1)
                                )
                            }
                            return (
                                (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                                (order === 'desc' ? 1 : -1)
                            )
                        })
                    },
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </Container>
    )
}

export default SimpleMuiTable
