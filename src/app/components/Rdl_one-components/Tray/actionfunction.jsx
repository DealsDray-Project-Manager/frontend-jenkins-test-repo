import MUIDataTable from 'mui-datatables';
import { Typography, Box, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { H3 } from 'app/components/Typography';
import React, { useState } from 'react';
import { Button, Checkbox, Card } from '@mui/material';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const NumberInput = ({ digit, onChange }) => {
  const increaseNumber = () => {
    onChange(digit + 1);
  };

  const decreaseNumber = () => {
    if (digit > 1) {
      onChange(digit - 1);
    }
  };

  return (
    <Box display="flex" alignItems="left" justifyContent="left">
      <Box
        component="span"
        sx={{
          border: '1px solid #ccc',
          borderRight: 0,
          padding: '15px',
          margin: '0 px',
          minWidth: '46px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {digit}
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" border="1px solid #ccc">
        <ArrowDropUpIcon onClick={increaseNumber} style={{ cursor: 'pointer' }} />
        <ArrowDropDownIcon onClick={decreaseNumber} style={{ cursor: 'pointer' }} />
      </Box>
    </Box>
  );
};

const Actionfunction = () => {
  const [isCheck, setIsCheck] = useState([]);
  const [values, setValues] = useState([
    {
      part_no: '1',
      part_name: 'Back Panel',
      color: 'Black',
      quantity: 1,
    },
    {
      part_no: '2',
      part_name: 'Back Panel',
      color: 'Red',
      quantity: 1,
    },
  ]);

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck((prevIsCheck) => {
      if (checked) {
        return [...prevIsCheck, id];
      } else {
        return prevIsCheck.filter((item) => item !== id);
      }
    });
  };

  const handleChange = (newValue, rowIndex) => {
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[rowIndex].quantity = newValue;
      return updatedValues;
    });
  };
 
  const columns = [
    {
      name: 'select',
      label: <Typography variant="subtitle1"fontWeight='bold' marginLeft="7px" marginRight="" width="150px"><>Select</></Typography>,
      
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          return (
            <Checkbox
              onClick={handleClick}
              id={value}
              key={value}
              checked={isCheck.includes(value)}
            />
          );
        },
      },
    },
    {
      name: 'part_no',
      label: <Typography variant="subtitle1"fontWeight='bold' ><>Part No</></Typography>,
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({ marginLeft:'10px' }),
        customBodyRender: (rowIndex, tableMeta) =>
          tableMeta.rowIndex + 1,
      },
    },
    {
      name: 'part_name',
      label: <Typography variant="subtitle1"fontWeight='bold'><>Part Name</></Typography>,
      options: {
        filter: true,
      },
    },
    {
      name: 'color',
      label: <Typography variant="subtitle1"fontWeight='bold'><>Color</></Typography>,
      options: {
        filter: true,
      },
    },
    {
      name: 'quantity',
      label: <Typography variant="subtitle1"fontWeight='bold'><>Quantity</></Typography>,
      options: {
        filter: true,
        sort: true,
        customBodyRender: (digit, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          return <NumberInput digit={digit} onChange={(newValue) => handleChange(newValue, rowIndex)} />;
        },
      },
    },
  ];

  const lastrow = {
    customToolbar: () => {
      return (
        <>
          <Typography>Total Parts for Repair = {values.length}</Typography>
        </>
      );
    },
  };

  return (
    <Box sx={{ p: 2 }}>
      <H3>MUIC Detail:</H3>
      <H3>UIC Detail:</H3>
      <br />

      <TextField select sx={{ width: '180px' }} label="Select an Option">
        <MenuItem>Battery Boosted</MenuItem>
        <MenuItem>Charge jack Replaced & Boosted</MenuItem>
        <MenuItem>Battery Damage</MenuItem>
        <MenuItem>Repair Required</MenuItem>
        <MenuItem>Accept Auditor Feedback</MenuItem>
        <MenuItem>Unlocked</MenuItem>
        <MenuItem>Issue Resolved Through Software</MenuItem>
        <MenuItem>Dead</MenuItem>
      </TextField>
      <br />
      <br />
      <TextField sx={{ width: '180px' }} label="Description">
        
      </TextField>

      <br />
      <Box sx={{ textAlign: 'right' }}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
       
        
        <br />
      </Box>
      <br />

      <MUIDataTable
      title={'Repair Required Parts'}
        columns={columns}
        data={values}
        options={{
          filterType: 'textField',
          responsive: 'simple',
          download: false,
          print: false,
          textLabels: {
            body: {
              noMatch: 'Sorry, there is no matching data to display',
            },
          },
          selectableRows: 'none',
          elevation: 0,
          lastrow,
          rowsPerPageOptions: [5, 10, 25, 50, 100], // Customize the rows per page options
          
        }}
        
      />
      <br />
      <Card sx={{p:2}}>
            <Typography>Total Parts for repair:</Typography>
        </Card>
        <br />
      
    </Box>
  );
};

export default Actionfunction;
