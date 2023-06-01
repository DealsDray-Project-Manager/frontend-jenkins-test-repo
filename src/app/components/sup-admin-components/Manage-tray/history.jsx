import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import { axiosSuperAdminPrexo } from '../../../../axios'
import Swal from 'sweetalert2'
import { Typography } from '@mui/material'

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
    const [mastersEditHistory, setMastersEditHistory] = useState([])

    const { trayId } = useParams()

    useEffect(() => {
        try {
          const fetchData = async () => {
            let response = await axiosSuperAdminPrexo.post(
              "/mastersEditHistory/" + trayId
            );
            if (response.status === 200) {
              setMastersEditHistory(response.data.data);
            }
          };
          fetchData();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
      }, []);

    const columns = [
        {
            name: 'index',
            label: <Typography sx={{fontWeight:'bold', ml:2}}>Record No</Typography>,
            options: {
                filter: true,
                sort: true,
                customBodyRender: (rowIndex, dataIndex) =>
                <Typography sx={{pl:4}}>{dataIndex.rowIndex + 1}</Typography>
            },
        },
        {
            name: 'code',
            label: <Typography sx={{fontWeight:'bold'}}>Tray ID</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'cpc',
            label: <Typography sx={{fontWeight:'bold'}}>Location</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'warehouse',
            label: <Typography sx={{fontWeight:'bold'}}>Warehouse</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: <Typography sx={{fontWeight:'bold'}}>Tray Display Name</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'limit',
            label: <Typography sx={{fontWeight:'bold'}}>Tray Limit</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'brand',
            label: <Typography sx={{fontWeight:'bold'}}>Brand</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'model',
            label: <Typography sx={{fontWeight:'bold'}}>Model</Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'display',
            label: <Typography sx={{fontWeight:'bold'}}>Tray Display</Typography>,
            options: {
                filter: true,
            },
        },
      
        {
            name: 'created_at',
            label: <Typography sx={{fontWeight:'bold'}}>Edited Date</Typography>,
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
                        { name: 'Tray-History' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Tray Edit History'}
                data={mastersEditHistory}
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
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </Container>
    )
}

export default SimpleMuiTable
