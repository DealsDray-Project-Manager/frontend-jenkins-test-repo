import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Button, Box, TextField, Checkbox, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosMisUser } from '../../../../../axios'
import moment from 'moment'
import jwt_decode from 'jwt-decode'
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
    const [isAlive, setIsAlive] = useState(true)
    const [item, setItem] = useState([])
    const navigate = useNavigate()
    const [sortDate, setSortDate] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [sortData, setSortData] = useState(false)
    const [yesterdayDate, setYesterDayDate] = useState('')
    const [isCheck, setIsCheck] = useState([])

    
const handelViewItem = (id) => {
    navigate('/mis/sorting/wht-to-rp/process')
}

    useEffect(() => {
        let date = new Date() // Today!
        setYesterDayDate(date.setDate(date.getDate() - 1))
        let admin = localStorage.getItem('prexo-authentication')
        if (admin) {
            setIsLoading(true)
            const { location } = jwt_decode(admin)
            const fetchData = async () => {
                try {
                    let res = await axiosMisUser.post(
                        '/wh-closed-bot-tray/' + location
                    )
                    if (res.status === 200) {
                        setIsLoading(false)
                        setItem(res.data.data)
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
        } else {
            navigate('/')
        }
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const handelSort = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            let admin = localStorage.getItem('prexo-authentication')
            if (admin) {
                const { location } = jwt_decode(admin)
                let obj = {
                    date: sortDate,
                    location: location,
                }
                let res = await axiosMisUser.post('/wht-bot-sort', obj)
                if (res.status === 200) {
                    setIsLoading(false)
                    setSortData(true)
                    setItem(res.data.data)
                }
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
    const handleClick = (e) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    /*-----------------------------------------------------------------------------*/
    // NAVIGATE TO ASSIGN FOR SORTING PAGE
    const handelAssignForSorting = (e, code) => {
        e.preventDefault()
        navigate('/mis/sorting/bot-to-wht/assign-for-sorting', {
            state: { isCheck: isCheck, type: 'Not From Request' },
        })
    }

    const columns = [
        {
            name: 'index',
            label: <Typography variant="subtitle1" fontWeight='bold' marginLeft="7px"><>Record No</></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'muic',
            label: <Typography variant="subtitle1" fontWeight='bold'><>MUIC</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Brand</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Model</></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'items',
            label: <Typography variant="subtitle1" fontWeight='bold'><>Units to Repair</></Typography>,
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) =>
                    value.length + '/' + tableMeta.rowData[4],
            },
        },
        {
            name: 'code',
            label: <Typography variant="subtitle1" fontWeight='bold' marginLeft="8px"><>Action</></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={() => handelViewItem(value)}
                            style={{ backgroundColor: 'green' }}
                            component="span"
                        >
                            Process
                        </Button>
                    )
                },
            },
        },
    ]

    const columns1 = [
        {
           index:'1',
           muic:'OF593',
           brand:'Samsung',
           model:'S7',
           items:'2'
        },
        {
            index:'2',
            muic:'PF593',
            brand:'Oppo',
            model:'S7',
            items:'3'
        },
        {
            index:'3',
            muic:'OF503',
            brand:'Vivo',
            model:'S7',
            items:'6'
        },
        {
            index:'4',
           muic:'AL593',
           brand:'Redmi',
           model:'S7',
           items:'2'
        },
        {
            index:'5',
            muic:'MF533',
            brand:'Realme',
            model:'S7',
            items:'2'
        },
        {
            index:'6',
            muic:'WF803',
            brand:'One Plus',
            model:'S7',
            items:'2'
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Sorting', path: '/' },
                        { name: 'Wht-to-Rp' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Wht Tray'}
                data={columns1}
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
