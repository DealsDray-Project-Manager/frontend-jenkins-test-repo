import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosAuditAgent } from '../../../../../axios'
import { Button, Typography } from '@mui/material'

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
    const navigate = useNavigate()

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

    const handelViewItem = (id) => {
        navigate('/wareshouse/tray/view-item/' + id)
    }

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontWeight:'bold', ml:2}}>Record No</Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'uic',
            label: <Typography sx={{fontWeight:'bold'}}>UIC</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: <Typography sx={{fontWeight:'bold'}}>MUIC</Typography>,
            options: {
                filter: true,
            },
        },

        {
            name: 'brand_name',
            label: <Typography sx={{fontWeight:'bold'}}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model_name',
            label: <Typography sx={{fontWeight:'bold'}}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'audit_report',
            label: <Typography sx={{fontWeight:'bold'}}>Audit Status</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.stage,
            },
        },
        {
            name: 'audit_report',
            label: <Typography sx={{fontWeight:'bold'}}>Original Grade</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.orgGrade,
            },
        },
        {
            name: 'audit_report',
            label: <Typography sx={{fontWeight:'bold'}}>Audit Recommended Grade</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.grade,
            },
        },
        {
            name: 'audit_report',
            label: <Typography sx={{fontWeight:'bold'}}>Reason</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.reason,
            },
        },
        {
            name: 'audit_report',
            label: <Typography sx={{fontWeight:'bold'}}>Description</Typography>,
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) => value?.description,
            },
        },
       
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Tray', path: '/' },
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
                    download: false,
                    print: false,
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
