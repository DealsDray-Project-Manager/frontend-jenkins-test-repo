import { Breadcrumb } from 'app/components'
import { Box, Card, Container, Typography, Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, } from "@mui/material";
import { Dialog, Button, Grid, TextField, MenuItem, IconButton, Icon } from '@mui/material'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';



const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))


const products = [
    {
      Part_Number: 'DP00987',
      Part_Name: "Display",
      Part_Description: "Display",
      Part_Color: "-",
      Technical_QC: "Yes",
      Validation: "Pass"
    },
    {
      Part_Number: 'DP00998',
      Part_Name: "Back Panel",
      Part_Description: "Back Panel",
      Part_Color: "Green",
      Technical_QC: "No",
      Validation: "Error"    
    }
    // {
    //   MUIC: "IK579",
    //   Brand: "Apple",
    //   Model:'iphone 11',
    //   Color: "Gold"    
    // },
    // {
    //   MUIC: "XU827",
    //   Brand: "Apple",
    //   Model:'iphone 11 pro',
    //   Color: "Silver"
    // }
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


  

const Validatespare = () => {

    const handelDelete = (id,type) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to Delete Location!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!',
        })
    }


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
    return ( 
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                
                    routeSegments={[{ name: 'Validate Spare Parts', path: '/' }]} 
                    style={{marginLeft:"20px"}}
                />
            </div>
           <Box sx={{p:1, display:'flex'}}>
            <Card sx={{border:'',marginRight:"", marginLeft:""}}>
           <Box sx={{p:2, display:'flex', alignItems:"center" }}>
           
           <Typography sx={{p:2, fontWeight:"bold"}}>Validate Spare Parts</Typography>
            </Box>
             <Box sx={{ border:"", width:"100%", marginLeft:"",marginRight:"",borderRadius:"8px",background:"white"}} overflow="auto">
                <StyledTable sx={{borderRadius:"20px", margin:"auto"}}>
          <TableHead sx={{background:"white"}}>
            <TableRow sx={{ }}>
              <TableCell align="center">Part Number</TableCell>
              <TableCell align="center">Part Name</TableCell>
              <TableCell align="center">Part Description</TableCell>
              <TableCell align="center">Part Color</TableCell>
              <TableCell align="center">Technical QC</TableCell>
              <TableCell align="center">Validation</TableCell>
              <TableCell align="center" >Action</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {products.map((phones, index) => (
              <TableRow key={index}>
                <TableCell align="center">{phones.Part_Number}</TableCell>
                <TableCell align="center">{phones.Part_Name}</TableCell>
                <TableCell align="center">{phones.Part_Description}</TableCell>
                <TableCell align="center">{phones.Part_Color}</TableCell>        
                <TableCell align="center">{phones.Technical_QC}</TableCell>        
                <TableCell align="center">{phones.Validation}</TableCell>        
                <TableCell>
                <IconButton sx={{ml:9}}>
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
                {/* <TableCell align="center" sx={{borderRight:"1px solid black"}}></TableCell>
                <TableCell align="center" sx={{borderRight:"1px solid black"}}></TableCell> */}
               
                {/* <TableCell align="right">
                  <IconButton>
                    <Icon color="error">close</Icon>
                  </IconButton>
                </TableCell> */}
              </TableRow>
         ) 
            )} 
          </TableBody>
        </StyledTable>
            </Box>
            <br />
            
            <Box sx={{justifyContent:"center",alignItems:"center",display:"flex"}}>
                        <Button
                variant="contained"
                color="primary"
                 sx={{margin:"auto",mt:1, mb:2, ml:60}} 
                 onClick={() => navigate('/sup-admin/view-list/sparereporting')}
                >
                Submit
            </Button>
            <Button
             variant="contained"
             color="primary"
              sx={{margin:"auto",mt:1, mb:2, mr:60}} 
              onClick={() => navigate('/sup-admin/view-list/uploadspare')}
            >
                Previous
            </Button>
                        </Box>
            </Card>
            </Box>
        </Container>
     );
}
 
export default Validatespare;