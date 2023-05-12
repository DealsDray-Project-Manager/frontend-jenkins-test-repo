import { Margin } from "@mui/icons-material";
import {
    Box,
    makeStyles,
    // Icon,
    // IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
  // import { makeStyles } from "@mui/styles";
import shadows from "@mui/material/styles/shadows";
  
  const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));

  // const useStyles = makeStyles({
  //   table:{
  //     minWidth:650,
  //     "&.MuiTableCell-root":{
  //       border:"1px solid black"
  //     }
  //   }
  // })
  
  const subscribarList = [
    {
      No: "1",
      date: "18 january, 2023",
      IMEI:'862162041523254',
      TrayId: "WHT1001",
      status: "Merge Request Sent To Wharehouse",
      UIC: 92090000007,
      Stock:"IN"
    },
    {
        No: "2",
      date: "10 january, 2023",
      IMEI:'862162041523254',
      amount: 9000,
      TrayId: "WHT1001",
      status: "Merge Request Sent To Wharehouse",
      UIC: 92090000007,
      Stock:"Out"
    },
    {
        No: "3",
      date: "08 january, 2023",
      IMEI:'862162041523254',
      amount: 5000,
      TrayId: "WHT1001",
      status: "Merge Request Sent To Wharehouse",
      UIC: 92090000007,
      Stock:"IN"
    },
    {
        No: "4",
      date: "01 january, 2023",
      IMEI:'862162041523254',
      TrayId: "WHT1001",
      status: "Merge Request Sent To Wharehouse",
      UIC:92090000007,
      Stock:"IN"
    },
    {
        No: "5",
        IMEI:'862162041523254',
      date: "01 january, 2023",
      status: "Merge Request Sent To Wharehouse",
      TrayId: "WHT1001",
      UIC: 92090000007,
      Stock:"out"
    },
    {
        No: "6",
      date: "01 january, 2023",
      IMEI:'862162041523254',
      status: "Merge Request Sent To Wharehouse",
      TrayId: "WHT1001",
      UIC:92090000007 ,
      Stock:"IN"
    },
  ];
  
  const SimpleTable = () => {
    // const classes = useStyles();
    return (
        <div >
        <h3 style={{marginTop:"30px"}}>Tray Current Details</h3>
      <Box   boxShadow={1}  sx={{ border:"0.5px solid #78909c",borderRadius:"8px",background:"white"}} overflow="auto" >
        <StyledTable sx={{borderRadius:"20px"}}>
          <TableHead sx={{background:"white"}}>
            <TableRow >
              <TableCell align="center">Sl No</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">UIC</TableCell>
              <TableCell align="center">IMEI</TableCell>
              <TableCell align="center">Tray id</TableCell>
              <TableCell align="center">Tray Status</TableCell>
              <TableCell align="center">Stock</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {subscribarList.map((subscriber, index) => (
              <TableRow key={index} >
                <TableCell align="center">{subscriber.No}</TableCell>
                <TableCell align="center">{subscriber.date}</TableCell>
                <TableCell align="center">{subscriber.UIC}</TableCell>
                <TableCell align="center">{subscriber.IMEI}</TableCell>        
                <TableCell align="center">{subscriber.TrayId}</TableCell>
                <TableCell align="center">{subscriber.status}</TableCell>
                <TableCell align="center">{subscriber.Stock}</TableCell>
               
                {/* <TableCell align="right">
                  <IconButton>
                    <Icon color="error">close</Icon>
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
        
      </Box>
      </div>
    );
  };
  
  export default SimpleTable;
  