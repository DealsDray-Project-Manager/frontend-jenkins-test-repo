import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import {Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Box, Card, Container, Typography} from "@mui/material";
import { Dialog, Button, Grid, TextField, MenuItem, IconButton, Icon } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';

import Swal from 'sweetalert2'


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



const Addparts = () => {

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

      const navigate=useNavigate()

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

    return ( 
        <Container>
            <div className="breadcrumb">
          <Breadcrumb

            routeSegments={[
              { name: 'Products', path: '/' },
              { name: 'Manage Parts', path: '/' },
              { name: 'MUIC to Part-Association'}
            ]}
            style={{ marginLeft: "20px" }}
          />
        </div>

            <Card sx={{p:3}}>
            <Box>
            <Typography sx={{fontWeight: "bold", fontSize: "16px" }}>Add Parts in Bulk</Typography>
            </Box>
            <br />
            <Box>
                
            <textarea name="text" placeholder="Please add Part Numbers separated by commas" id=""  rows="10" style={{width: "100%"}}></textarea>
           
        </Box>
        <Box>
            <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "auto", mt: 1, mb: 2, ml:74 }}
                  // onClick={() => navigate('/sup-admin/products/partsvalidation')}
              
                >
                  Validate MUIC
                </Button>
        </Box>
            </Card>
            <br />
            <br />
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
                  onClick={() => navigate('/sup-admin/products/partsassociation')}
              
                >
                  Associate Part
                </Button>
              </Box>
            </Card>
        </Container>
     );
}
 
export default Addparts;