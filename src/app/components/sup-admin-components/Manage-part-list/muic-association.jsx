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

   
    return ( 
        <Card sx={{width:'920px',marginTop:"40px",marginBottom:"40px", marginLeft:"50px",border:'1px solid black'}}>
                     <Box sx={{p:2, display:'flex'}}>
                         <Box sx={{marginLeft:"50px",marginTop:"30px"}}>
                         <Box sx={{p:2, display:'flex'}}>
                                <Box>
                                    <Typography sx={{fontSize:"16px", marginBottom:"15px"}} >Part No:  </Typography>
                                    <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>Part Name: </Typography>
                                </Box>
                            <TextFieldCustOm
                                sx={{marginLeft:"510px", width:"150px"}}
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
                            <Typography sx={{fontSize:"16px", marginTop:"13px", marginBottom:"15px"}}>MUIC:</Typography>
                            <textarea
                                style={{marginLeft:"10px",width:"650px",height:"100px"}}
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
                        <Button
                variant="contained"
                color="primary"
                 sx={{ml:45,mt:1}} 
                >
                Check
            </Button>
            <br />
            <br />
           <Card sx={{border:'1px solid black',marginRight:"50px", marginLeft:"50px"}}>
            <Typography sx={{p:3, fontWeight:"bold"}}>MUIC Details</Typography>
             <Box sx={{ border:"0.5px solid #78909c", width:"520px", marginLeft:"80px",marginRight:"50px",borderRadius:"8px",background:"white"}} overflow="auto">
                <StyledTable sx={{borderRadius:"20px", margin:"auto"}}>
          <TableHead sx={{background:"white"}}>
            <TableRow sx={{}}>
              <TableCell align="center" sx={{borderRight:"1px solid black"}}>MUIC</TableCell>
              <TableCell align="center" sx={{borderRight:"1px solid black"}}>Brand</TableCell>
              <TableCell align="center" sx={{borderRight:"1px solid black"}}>Model</TableCell>
              <TableCell align="center" sx={{borderRight:"1px solid black"}}>Color</TableCell>
              <TableCell align="center" >Delete</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {products.map((phones, index) => (
              <TableRow key={index}>
                <TableCell align="center" sx={{borderRight:"1px solid black"}}>{phones.MUIC}</TableCell>
                <TableCell align="center" sx={{borderRight:"1px solid black"}}>{phones.Brand}</TableCell>
                <TableCell align="center" sx={{borderRight:"1px solid black"}}>{phones.Model}</TableCell>
                <TableCell align="center" sx={{borderRight:"1px solid black"}}>{phones.Color}</TableCell>        
                <TableCell>
                <IconButton>
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
            <Button
                variant="contained"
                color="primary"
                 sx={{ml:45,mt:1}} 
                >
                Submit
            </Button>
            <br />
            <br />
            <Card sx={{border:'1px solid black',marginRight:"50px", marginLeft:"50px"}}>
            <Typography sx={{p:3, fontWeight:"bold"}}>Old MUIC Details</Typography>
             <Box sx={{ border:"0.5px solid #78909c", width:"520px", marginLeft:"80px",marginRight:"50px",borderRadius:"8px",background:"white"}} overflow="auto">
                <StyledTable sx={{borderRadius:"20px", margin:"auto"}}>
          <TableHead sx={{background:"white"}}>
            <TableRow sx={{}}>
              <TableCell align="center" sx={{borderRight:"1px solid black"}}>MUIC</TableCell>
              <TableCell align="center" sx={{borderRight:"1px solid black"}}>Brand</TableCell>
              <TableCell align="center" sx={{borderRight:"1px solid black"}}>Model</TableCell>
              <TableCell align="center" sx={{borderRight:"1px solid black"}}>Color</TableCell>
              <TableCell align="center" >Delete</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {products.map((phones, index) => (
              <TableRow key={index}>
                <TableCell align="center" sx={{borderRight:"1px solid black"}}>{phones.MUIC}</TableCell>
                <TableCell align="center" sx={{borderRight:"1px solid black"}}>{phones.Brand}</TableCell>
                <TableCell align="center" sx={{borderRight:"1px solid black"}}>{phones.Model}</TableCell>
                <TableCell align="center" sx={{borderRight:"1px solid black"}}>{phones.Color}</TableCell>        
                <TableCell>
                <IconButton>
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

              </Card>
     );
}
 
export default Association;