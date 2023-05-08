// import { Box, Card, Divider, Stack } from "@mui/material";

import { Button, Card, TextField, styled } from '@mui/material';
import Bagdetails from "./bagdetails";
import Botdetails from "./botdetails";
import Deliverydetails from "./deliverydetails";
import MMTdetails from "./mmtdetails";
import Orderdetails from "./orderdetails";
import PMTdetails from "./pmtdetails";
import WHTdetails from "./whtdetails";
import Mobiledetails from './mobiledetails';

const Container = styled('div')(({ theme }) => ({
  margin: '40px',
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
const Search = () => {
    return ( 
       
         <Container >
          
            <h3><b>Track Item</b></h3>
           
           {/* <input type="text" placeholder="Search by UIC/IMEI" style={{width:'340px', padding:'8px 5px', borderRadius:'5px'}} /> */}
           {/* <button style={{padding:'8px 29px', marginLeft:'20px', backgroundColor:'lightpink', borderRadius:'5px'}}>SEARCH</button> */}
         
           
           <TextField 
                type="search" 
                label="Search by UIC/IMEI"
                errorMessages={["this field is required"]}
                inputProps={{
                    style:{
                        width: "280px"
                    }
                }}
           />
           <Button
                
                variant="contained"
                color="primary"
                 sx={{ml:2,mt:1}}
                >
                Search
            </Button>

       
           
        
           <Mobiledetails/>
           <Orderdetails/>
           <Deliverydetails/>
           <Bagdetails />
           <Botdetails/>
           <PMTdetails/>
           <MMTdetails/>
           <WHTdetails/>
           
          

          
           </Container>
           
         

    
     );
}
 
export default Search;


