import MUIDataTable from 'mui-datatables'
import { Typography, Box, TextField, MenuItem } from "@mui/material";
import { styled } from '@mui/system'
import { H1, H3, H4 } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Icon, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const NumberInput = () => {

    const { digit, onChange } = useState(1);
    const increaseNumber = () => {
      onChange(digit + 1);
    };
  
    const decreaseNumber = () => {
      if (digit > 0) {
        onChange(digit - 1);
      }
    };
  
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box
          component="span"
          sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '15px',
            margin: '0 8px',
            minWidth: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {digit}
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
        <ArrowDropUpIcon onClick={increaseNumber} style={{ cursor: 'pointer' }} />
        <ArrowDropDownIcon onClick={decreaseNumber} style={{ cursor: 'pointer' }} />
        </Box>
      </Box>
    );
  };

const Actionfunction = () => {
    const [isAlive, setIsAlive] = useState(true)
    const [isCheck, setIsCheck] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [whtTrayList, setWhtTrayList] = useState([])
    const [submitButDis, setSubmitDis] = useState(false)
    const navigate = useNavigate()


    const handleClick = (e) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    const columns = [
        {
            name: 'select',
            label: <Typography variant="subtitle1"  marginLeft='7px' marginRight=''  width= '150px'><strong>Select</strong></Typography>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, dataIndex) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                handleClick(e)
                            }}
                            id={value}
                            key={value}
                            checked={isCheck.includes(value)}
                        />
                    )
                },
            },
        },
        {
            name: 'part_no',
            label: <Typography variant="subtitle1"><strong>Part No</strong></Typography>,
            options: {
                filter: true,
                sort: false,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },
        {
            name: 'part_name', // field name in the row object
            label: <Typography variant="subtitle1"><strong>Part Name</strong></Typography>, // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'color',
            label: <Typography variant="subtitle1"><strong>Color</strong></Typography>,
            options: {
                filter: true,
            },
        },
        {
            name: 'quantity',
            label: <Typography variant="subtitle1"><strong>Quantity</strong></Typography>,
            options: {
                filter: true,
                sort: true,
                customBodyRender: (digit, tableMeta) =>{
                    const rowIndex = tableMeta.rowIndex;
                    const handleChange = (newValue) => {
                      // Update the data array with the new value
                      const updatedData = [...data];
                      updatedData[rowIndex][2] = newValue;
                      // Call any other necessary functions to handle the updated data
                      // ...
          
                      // Example: Log the updated data to the console
                      console.log(updatedData);
                    };
          
                    return <NumberInput digit={digit} onChange={handleChange} />;
                
                }
            
                },
        }
        
    ]
    const data = [
        [1, 'Item 1', 0],
        [2, 'Item 2', 0],
        [3, 'Item 3', 0],
      ];

    const values=[
        {
            'part_no':'1',
            'part_name':'Back Panel',
            'color':'Black'
        },
        {
            'part_no':'2',
            'part_name':'Back Panel',
            'color':'Red'
        }
    ]

    return ( 
        <Box sx={{p:2}}>
           
           <H3>MUIC Detail:</H3>
           <H3>UIC Detail:</H3>
           <br />
           
           <TextField
            select
            sx={{width:'180px'}}
            label='Repair required'
           >
            <MenuItem></MenuItem>
           </TextField>
           <br />
           <br />
           <TextField
            select
            sx={{width:'180px'}}
            label='Color'
           >
            <MenuItem></MenuItem>
           </TextField>

           

               <MUIDataTable
                // title={'WHT Tray'}
                // data={whtTrayList}
                columns={columns}
                data={values}
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
                    // customSort: (data, colIndex, order) => {
                    //     return data.sort((a, b) => {
                    //         if (colIndex === 1) {
                    //             return (
                    //                 (a.data[colIndex].price <
                    //                 b.data[colIndex].price
                    //                     ? -1
                    //                     : 1) * (order === 'desc' ? 1 : -1)
                    //             )
                    //         }
                    //         return (
                    //             (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                    //             (order === 'desc' ? 1 : -1)
                    //         )
                    //     })
                    // },
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
            <br />
                        <Box sx={{
        position: 'fixed',
        // bottom: '1px',
        // marginTop:'0px',
        right: '53px',
        zIndex: 1, // Optional: Use this if you want to control the stacking order
        marginBottom:'20px'
      }}>
                        <Button
                            sx={{ textAlign:'end' }}
                            // onClick={(e) => handleOpen()}
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                        </Box>
                        
        </Box>
        
     );
}
 
export default Actionfunction;