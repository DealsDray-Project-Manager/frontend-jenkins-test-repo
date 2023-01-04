import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo, axiosWarehouseIn } from '../../../../axios'
import { Button } from '@mui/material'
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
    const [bagItemList, setBagItemList] = useState([])
    const { bagId } = useParams()

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const res = await axiosSuperAdminPrexo.post(
                    '/getBagItemInvalid/' + bagId
                )
                if (res.status === 200) {
                    setBagItemList(res.data.data.items)
                } else {
                    alert(res.data.message)
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }
        }
        fetchBrand()
        return () => setIsAlive(false)
    }, [isAlive])

    const handelDelete = async (id, awbn, state) => {
        try {
          let obj = {
            id: id,
            bagId: bagId,
            awbn: awbn,
            state: state,
          };
          let data = await axiosWarehouseIn.post("/stockin", obj);
          if (data.status == 200) {
            alert(data.data.message);
            setIsAlive((isAlive)=> !isAlive)
          }
          else{
            alert(data.data.message)
          }
        } catch (error) {
          alert(error);
        }
      };

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
            name: 'awbn_number', // field name in the row object
            label: 'Tracking Id', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: '_id', // field name in the row object
            label: 'obj id', // column title that will be shown in table
            options: {
                filter: true,
                display:false
            },
        },
        {
            name: 'order_id',
            label: 'Order Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'order_date',
            label: 'Order Date',
            options: {
                filter: true,
                customBodyRender: (value) =>
                    new Date(value).toLocaleString('en-GB', {
                        year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                    }),
            },
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
               
            },
        },
        {
            name: 'status',
            label: 'Action',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    return value == 'Invalid' ? (
                        <Button
                            sx={{
                                m: 1,
                            }}
                            variant="contained"
                            onClick={() => {
                                if (window.confirm("You want to Remove?")) {
                                  handelDelete(
                                    tableMeta.rowData[2],
                                    tableMeta.rowData[1],
                                    value,
                                  );
                                }
                              }}
                            style={{ backgroundColor: 'red' }}
                            component="span"
                        >
                            Remove
                        </Button>
                    ) : null
                },
            },
        },
    ]

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Remove Invalid Item', path: '/pages' },
                        { name: 'View-Item' },
                    ]}
                />
            </div>

            <MUIDataTable
                title={'Bag Item'}
                data={bagItemList}
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
