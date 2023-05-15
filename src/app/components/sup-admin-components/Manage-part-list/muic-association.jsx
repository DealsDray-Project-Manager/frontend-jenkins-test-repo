import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import { Box, Card, Container, Typography, Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, } from "@mui/material";
import { Dialog, Button, Grid, TextField, MenuItem, IconButton, Icon } from '@mui/material'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'


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

 const products = [
    {
      MUIC: "OF694",
      Brand: "10.or",
      Model:'10.or E',
      Color: "Black"
    },
    {
      MUIC: "YW627",
      Brand: "10.or",
      Model:'10.or G',
      Color: "White"    
    },
    {
      MUIC: "IK579",
      Brand: "Apple",
      Model:'iphone 11',
      Color: "Gold"    
    },
    {
      MUIC: "XU827",
      Brand: "Apple",
      Model:'iphone 11 pro',
      Color: "Silver"
    }
  ];



const Association = () => {
    const {
        register,
        formState: { errors },
       
    } = useForm({
        resolver: yupResolver(schema),
    })
     const schema = Yup.object().shape({
        name: Yup.string()
            .max(40, 'Please Enter Below 40')
            .matches(/^.*((?=.*[aA-zZ\s]){1}).*$/, 'Please enter valid name')
            .max(40)
            .required('Required*')
            .nullable()
     })

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
   
    return ( 
        // <Card sx={{width:'920px',marginTop:"40px",marginBottom:"40px", marginLeft:"50px",border:'1px solid black'}}>
       
        <Card>
        <Container>
         <div className="breadcrumb">
                <Breadcrumb
                
                    routeSegments={[{ name: 'MUIC-Association', path: '/' }]} 
                    style={{marginLeft:"20px"}}
                />
            </div>
       
                     <Box sx={{p:1, display:'flex'}}>
                         <Box>
                         <Card>
                         <Box sx={{p:3, display:'flex', justifyContent:"space-between"}}>
                          
                                <Box>
                                    <Typography sx={{fontSize:"16px", marginBottom:"15px"}} >Part No:  </Typography>
                                    <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Part Name: </Typography>
                                </Box>
                            <TextFieldCustOm
                                sx={{marginLeft:"820px", width:"150px"}}
                                label="Color"
                                select
                                type="text"
                                name="color"
                                {...register('name')}
                                error={errors.color ? true : false}
                                helperText={errors.color?.message}                           
                            >
                                <MenuItem value="red">Red</MenuItem>
                                <MenuItem value="blue">Blue</MenuItem>
                                <MenuItem value="green">Green</MenuItem>
                                <MenuItem value="yellow">Yellow</MenuItem>                      
                            </TextFieldCustOm>                            
                        </Box>
                         <br />
                        <Box sx={{p:2, display:'flex'}}>
                            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>MUIC:</Typography>
                            <textarea
                                style={{marginLeft:"5px",width:"100%",height:"100px"}}
                                type="text" 
                                label="MUIC No"
                                // errorMessages={["this field is required"]}
                                // inputProps={{
                                //             style:{
                                //                     width: "600px",
                                //                     marginBottom:"90px"
                                //                   }
                                //             }}
                            />
                        </Box>
                        <Box sx={{justifyContent:"center",alignItems:"center",display:"flex"}}>
                        <Button
                variant="contained"
                color="primary"
                 sx={{margin:"auto",mt:1, mb:2}} 
                >
                Check
            </Button>
                        </Box>
            </Card>
            <br />
            <br />
           <Card sx={{border:'',marginRight:"", marginLeft:""}}>
           <Box sx={{p:2, display:'flex', alignItems:"center" ,justifyContent:"space-between"}}>
           <Typography sx={{p:2, fontWeight:"bold"}}>MUIC Details</Typography>
            <Typography sx={{fontWeight:"bold", ml:80}}>You added 128 MUIC's</Typography>
           </Box>
             <Box sx={{ border:"", width:"100%", marginLeft:"",marginRight:"",borderRadius:"8px",background:"white"}} overflow="auto">
                <StyledTable sx={{borderRadius:"20px", margin:"auto"}}>
          <TableHead sx={{background:"white"}}>
            <TableRow sx={{ }}>
              <TableCell align="center">MUIC</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Model</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center" >Delete</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {products.map((phones, index) => (
              <TableRow key={index}>
                <TableCell align="center">{phones.MUIC}</TableCell>
                <TableCell align="center">{phones.Brand}</TableCell>
                <TableCell align="center">{phones.Model}</TableCell>
                <TableCell align="center">{phones.Color}</TableCell>        
                <TableCell>
                <IconButton sx={{ml:13}}>
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
                 sx={{margin:"auto",mt:1, mb:2}} 
                >
                Submit
            </Button>
                        </Box>
            </Card>
            <br />
            <br />
            <Card sx={{marginRight:"", marginLeft:""}}>
            <Box sx={{p:2, display:'flex', alignItems:"center",justifyContent:"space-between"}}>
           <Typography sx={{p:2, fontWeight:"bold"}}>Old MUIC Details</Typography>
            <Typography sx={{fontWeight:"bold", ml:80}}>120 Unique MUIC found</Typography>
           </Box>
             <Box sx={{  width:"100%", marginLeft:"",marginRight:"",borderRadius:"8px",background:"white"}} overflow="auto">
                <StyledTable sx={{borderRadius:"20px", margin:"auto"}}>
          <TableHead sx={{background:"white"}}>
            <TableRow sx={{}}>
              <TableCell align="center">MUIC</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Model</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center" >Delete</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {products.map((phones, index) => (
              <TableRow key={index}>
                <TableCell align="center">{phones.MUIC}</TableCell>
                <TableCell align="center">{phones.Color}</TableCell>        
                <TableCell align="center">{phones.Brand}</TableCell>
                <TableCell align="center">{phones.Model}</TableCell>
                <TableCell>
                <IconButton sx={{ml:13}}>
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
            <br />
           </Card>
           <br />
            <br />
                         </Box>
                         
                     </Box>
</Container>
                     </Card>
              // </Card>
     );
}
 
export default Association;