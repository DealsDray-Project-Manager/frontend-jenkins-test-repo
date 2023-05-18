import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import {
  Box, Card, Container, Typography, Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Dialog, Button, Grid, TextField, MenuItem, IconButton, Icon } from '@mui/material'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';


const parts = [
    {
        part_no: "DP00987",
        part_name: 'Back Panel',
        part_des: "Back Panel",
        part_color: 'Red',
        validation: 'Pass'
    },
    {
        part_no: "DP00957",
        part_name: 'Headphone Jack',
        part_des: "Headphone Jack",
        part_color: 'Red',
        validation: 'Fail'
    },
];


const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));

const Partsvalid = () => {

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


      const handelDelete = (id, type) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You want to Delete Part?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it!',
        })
      }

      const navigate=useNavigate()

    return ( 
        <Container>
            <div className="breadcrumb">
          <Breadcrumb

            routeSegments={[{ name: 'Part Validation', path: '/' }]}
            style={{ marginLeft: "20px" }}
          />
        </div>

        <Card sx={{ border: '', marginRight: "", marginLeft: "" }}>
              <Box sx={{ p: 2, display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ p: 2, fontWeight: "bold" }}>Parts Validation</Typography>
                <Typography sx={{ fontWeight: "bold", ml: 80 }}>Total Added - 25 | Valid - 20 | Duplicates - 3 | Invalid - 2</Typography>
              </Box>
              <Box sx={{ border: "", width: "100%", marginLeft: "", marginRight: "", borderRadius: "8px", background: "white" }} overflow="auto">
                <StyledTable sx={{ borderRadius: "20px", margin: "auto" }}>
                  <TableHead sx={{ background: "white" }}>
                    <TableRow sx={{}}>
                      <TableCell align="center">Part No</TableCell>
                      <TableCell align="center">Part Name</TableCell>
                      <TableCell align="center">Part Date</TableCell>
                      <TableCell align="center">Part Description</TableCell>
                      <TableCell align="center">Validation</TableCell>
                      <TableCell align="center" >Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {parts.map((part, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{part.part_no}</TableCell>
                        <TableCell align="center">{part.part_name}</TableCell>
                        <TableCell align="center">{part.part_des}</TableCell>
                        <TableCell align="center">{part.color}</TableCell>
                        <TableCell align="center">{part.validation}</TableCell>
                        <TableCell>
                          <IconButton sx={{ ml: 13 }}>
                            <Icon

                              onClick={(e) => {
                                handelDelete()
                              }}
                              color="error"
                            >
                              delete
                            </Icon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                    )}
                  </TableBody>
                </StyledTable>
              </Box>
              <br />

              <Box sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "auto", mt: 1, mb: 2 }}
                //   onClick={() => navigate('/sup-admin/products/partsassociation')}
              
                >
                  Associate Part
                </Button>
              </Box>
            </Card>
        </Container>
     );
}
 
export default Partsvalid;