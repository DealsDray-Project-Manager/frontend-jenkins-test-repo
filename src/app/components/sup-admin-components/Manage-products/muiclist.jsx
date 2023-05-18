import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
// import MemberEditorDialog from './add-category'
import React, { useState, useEffect } from 'react'
import { Box, Card,  Typography } from "@mui/material";
import { Dialog, Button, Grid, TextField, MenuItem, IconButton, Icon } from '@mui/material'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Image from 'mui-image'
import  mob  from '../../../image/mob.jpg'
import { axiosSuperAdminPrexo } from '../../../../axios'
import {
    Table,
  TableBody,
  TableCell,
  TableHead, 
  TableRow,
} from "@mui/material";



const parts = [
  {
    part_no: "DP00987",
    part_name: "Back panel",
    part_des: 'Back panel',
    color: "Black",
    validation: "Pass"
  },
 
];


const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));


const MUIClist = () => {


  const [isAlive, setIsAlive] = useState(true)
    const [ctxCategorylist, setctxCategorylist] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [editFetchData, setEditFetchData] = useState({})
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)



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

    const navigate = useNavigate()

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



      useEffect(() => {
        const fetchCtxTray = async () => {
            try {
                setIsLoading(true)
                const res = await axiosSuperAdminPrexo.post('/getCtxCategorys')
                if (res.status === 200) {
                    setIsLoading(false)
                    setctxCategorylist(res?.data)
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
        fetchCtxTray()
        return () => {
            setIsAlive(false)
            setIsLoading(false)
        }
    }, [isAlive])

    const handleDialogClose = () => {
        setEditFetchData({})
        setShouldOpenEditorDialog(false)
    }

    const handleDialogOpen = () => {
        setShouldOpenEditorDialog(true)

    }

      const columns = [
        {
            name: 'ReocrdId',
            label: 'Record Id',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (rowIndex, dataIndex) =>
                    dataIndex.rowIndex + 1,
            },
        },

        {
            name: 'code', // field name in the row object
            label: 'Code', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'float',
            label: 'Float Number',
            options: {
                filter: true,
            },
        },
        {
            name: 'sereis_start',
            label: 'Series Start',
            options: {
                filter: true,
            },
        },
        {
            name: 'series_end',
            label: 'Series End',
            options: {
                filter: true,
            },
        },
        {
            name: 'description',
            label: 'Description',
            options: {
                filter: true,
            },
        },
        {
            name: 'created_at',
            label: 'Creation Date',
            options: {
                filter: false,
                sort: false,
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
                      { name: 'Products', path: '/' },
                      { name: 'Manage Parts'}
                    ]}
                    style={{ marginLeft: "20px" }}
                />
            </div>
            <Card sx={{ p: 3 }}>
                <Box sx={{display:"flex"}}>
                <Box>
                    <Image src={mob} height={280} width={260} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', ml:4, mt:6 }}>
                    <Box>
                        <Typography>MUIC:</Typography>
                        <br />
                        <Typography>SKU ID:</Typography>
                        <Typography>Brand:</Typography>
                        <Typography>Model:</Typography>
                        <Typography>Vendor:</Typography>
                    </Box>
                    <Box sx={{ml:79}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/sup-admin/products')}
                        //   sx={{ margin: "auto", mt: 1, mb: 2 }}
                        >
                            Back to MUIC list
                        </Button>
                    </Box>
                </Box>
                </Box>
                <Box sx={{ml:123, mb: 3,mt:3}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/sup-admin/products/addparts')}
                    //   sx={{ margin: "auto", mt: 1, mb: 2 }}
                    >
                        Associate Parts
                    </Button>
                    </Box>
                

                <MUIDataTable
                title={'All Categories'}
                data={ctxCategorylist}
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
            {/* {shouldOpenEditorDialog && (
                <MemberEditorDialog
                    handleClose={handleDialogClose}
                    open={handleDialogOpen}
                    setIsAlive={setIsAlive}
                    editFetchData={editFetchData}
                    setEditFetchData={setEditFetchData}
                />
            )} */}
                    
                
            </Card>
            <br />
            {/* <Card sx={{p:3}}>
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
                //   onClick={() => navigate('/sup-admin/products/partsvalidation')}
              
                >
                  Validate MUIC
                </Button>
        </Box>
            </Card>
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
                <br /> */}
                
        </Container>
    );
}

export default MUIClist;