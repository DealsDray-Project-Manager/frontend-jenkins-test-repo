import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { useNavigate,useLocation } from 'react-router-dom'
import { axiosMisUser } from '../../../../../axios'

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
    const [item, setItem] = useState({})
    const navigate = useNavigate()
    const { state } = useLocation();
    const { isCheck,muic } = state;

    useEffect(() => {
        let admin = localStorage.getItem("prexo-authentication");
        if (admin) {
          const fetchData = async () => {
            try {
              let obj={
                tray:isCheck,
                muic:muic
              }
              let res = await axiosMisUser.post(
                "/view-bot-clubed-data-model" ,obj
              );
              if (res.status === 200) {
                setItem(res.data.data);
              }
              else{
                alert(res.data.message)
              }
            } catch (error) {
              alert(error);
            }
          };
          fetchData();
        } else {
          navigate("/");
        }
      }, []);

   

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
            name: 'imei',
            label: 'IMEI',
            options: {
                filter: true,
            },
        },
        {
            name: 'muic',
            label: 'MUIC',
            options: {
                filter: true,
                customBodyRender: (value) =>
               {
                return (
                    item.muic
                )
               }
            },
        },
        {
            name: 'brand',
            label: 'Brand',
            options: {
                filter: true,
                customBodyRender: (value) =>
               {
                return (
                    item.brand
                )
               }

            },
        },
       
        {
            name: 'model',
            label: 'Model',
            options: {
                filter: true,
                customBodyRender: (value) =>
               {
                return (
                    item.model
                )
               }
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
            name: 'user_name',
            label: 'Bot Agent',
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
            name: 'added_time',
            label: 'Added Time',
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
                        { name: 'Sorting', path: '/pages' },
                        { name: 'Bot-to-wht' },
                    ]}
                />
            </div>
          
            

            <MUIDataTable
                title={'Wht Tray'}
                data={item?.temp_array}
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
