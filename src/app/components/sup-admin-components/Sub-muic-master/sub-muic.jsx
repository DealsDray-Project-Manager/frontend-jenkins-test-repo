import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import '../../../../app.css'
import {
    Button,
    IconButton,
    Icon,
    Typography,
    Table,
    TableContainer,
} from '@mui/material'
import { axiosSuperAdminPrexo } from '../../../../axios'

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

const PartTable = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [subMuicList, setSubMuic] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchSubMuic = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post('/subMuic/view')
                if (res.status === 200) {
                    setSubMuic(res.data.data)
                    setIsLoading(false)
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
        fetchSubMuic()
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

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
            name: 'muic', // field name in the row object
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Muic</>
                </Typography>
            ), // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'sub_muic',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Sub Muic</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'product',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Brand</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.[0]?.brand_name || '',
            },
        },
        {
            name: 'product',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Model</>
                </Typography>
            ),
            options: {
                filter: true,
                customBodyRender: (value, dataIndex) =>
                    value?.[0]?.model_name || '',
            },
        },
        {
            name: 'color',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Color</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'ram',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>RAM</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        {
            name: 'storage',
            label: (
                <Typography variant="subtitle1" fontWeight="bold">
                    <>Storage</>
                </Typography>
            ),
            options: {
                filter: true,
            },
        },
        // {
        //     name: 'created_at',
        //     label: (
        //         <Typography variant="subtitle1" fontWeight="bold">
        //             <>Creation Date</>
        //         </Typography>
        //     ),
        //     options: {
        //         filter: false,
        //         sort: true,
        //         customBodyRender: (value) =>
        //             new Date(value).toLocaleString('en-GB', {
        //                 hour12: true,
        //             }),
        //     },
        // },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Sub-muic', path: '/' }]} />
            </div>

            <Table className="custom-table">
                <MUIDataTable
                    title={'Sub Muic'}
                    data={subMuicList}
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
        </Container>
    )
}

export default PartTable
