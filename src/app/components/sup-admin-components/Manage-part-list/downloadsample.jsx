import { Box, Card, Container, Typography, Table,TableBody,TableCell,TableHead,TableRow, } from "@mui/material";
import { styled } from '@mui/system'
import { Dialog, Button, Grid, TextField, MenuItem, IconButton, Icon } from '@mui/material'


const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));


const Downloadsample = () => {
    return ( 
        <Card sx={{border:'1px solid black',marginRight:"290px", marginLeft:"50px", marginTop:"40px"}}>
        <Box sx={{p:2, display:'flex', alignItems:"center"}}>
       <Typography sx={{p:2, fontWeight:"bold"}}>Sample XLS File</Typography>
       </Box>
         <Box sx={{ border:"0.5px solid #78909c", width:"520px", marginLeft:"80px",marginRight:"50px",borderRadius:"8px",background:"white"}} overflow="auto">
            <StyledTable sx={{borderRadius:"20px", margin:"auto"}}>
      <TableHead sx={{background:"white"}}>
        <TableRow sx={{}}>
          <TableCell align="center" sx={{borderRight:"1px solid black"}}>Part No</TableCell>
          <TableCell align="center" sx={{borderRight:"1px solid black"}}>Part Name</TableCell>
          <TableCell align="center" sx={{borderRight:"1px solid black"}}>Part Description</TableCell>
          <TableCell align="center">Color</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {/* {products.map((phones, index) => ( */}
          <TableRow >
            <TableCell align="center" sx={{borderRight:"1px solid black"}}></TableCell>
            <TableCell align="center" sx={{borderRight:"1px solid black"}}></TableCell>
            <TableCell align="center" sx={{borderRight:"1px solid black"}}></TableCell>
            <TableCell align="center" ></TableCell>        
            
            {/* <TableCell align="center" sx={{borderRight:"1px solid black"}}></TableCell>
            <TableCell align="center" sx={{borderRight:"1px solid black"}}></TableCell> */}
           
            {/* <TableCell align="right">
              <IconButton>
                <Icon color="error">close</Icon>
              </IconButton>
            </TableCell> */}
          </TableRow>
     {/* ) 
        )}  */}
      </TableBody>
    </StyledTable>
        </Box>
        <br />
        <br />
       </Card>
     );
}
 
export default Downloadsample;