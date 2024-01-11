import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
// import { H1 } from "../../Typography";
  
  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  
  const subscribarList = [
    {
      ID: 1,
      date: "18 january, 2019",
      Department:"MIS",
      Type:"Merge Request Sent To Wharehouse",
      Agent:"shivani.sort@dealsdray.com",
      Description:"WHT1001 closed with 24 uints ",
      Warehouse:"DealsDray PREXO Processing Warehosue",
      status: "close",
      company: "ABC Fintech LTD.",
    },
    {
        ID: 2,
      date: "10 january, 2019",
      Department:"MIS",
      Type:"Merge Request Sent To Wharehouse",
      Agent:"shivani.sort@dealsdray.com",
      Description:"WHT1001 closed with 24 uints ",
      Warehouse:"DealsDray PREXO Processing Warehosue",
      status: "open",
      company: "My Fintech LTD.",
    },
    {
        ID: 3,
      date: "10 january, 2019",
      Department:"MIS",
      Type:"Merge Request Sent To Wharehouse",
      Agent:"shivani.sort@dealsdray.com",
      Description:"WHT1001 closed with 24 uints ",
      Warehouse:"DealsDray PREXO Processing Warehosue",
      status: "open",
      company: "My Fintech LTD.",
    },
    {
        ID: 4,
      date: "8 january, 2019",
      Department:"MIS",
      Type:"Merge Request Sent To Wharehouse",
      Agent:"shivani.sort@dealsdray.com",
      Description:"WHT1001 closed with 24 uints ",
      Warehouse:"DealsDray PREXO Processing Warehosue",
      status: "close",
      company: "Collboy Tech LTD.",
    },
    {
        ID: 5,
      date: "1 january, 2019",
      Department:"MIS",
      Type:"Merge Request Sent To Wharehouse",
      Agent:"shivani.sort@dealsdray.com",
      Description:"WHT1001 closed with 24 uints ",
      Warehouse:"DealsDray PREXO Processing Warehosue",
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
        ID: 6,
      date: "1 january, 2019",
      Department:"MIS",
      Type:"Merge Request Sent To Wharehouse",
      Agent:"shivani.sort@dealsdray.com",
      Description:"WHT1001 closed with 24 uints ",
      Warehouse:"DealsDray PREXO Processing Warehosue",
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
        ID: 7,
      date: "1 january, 2019",
      Department:"MIS",
      Type:"Merge Request Sent To Wharehouse",
      Agent:"shivani.sort@dealsdray.com",
      Description:"WHT1001 closed with 24 uints ",
      Warehouse:"DealsDray PREXO Processing Warehosue",
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
        ID: 8,
      date: "1 january, 2019",
      Department:"MIS",
      Type:"Merge Request Sent To Wharehouse",
      Agent:"shivani.sort@dealsdray.com",
      Description:"WHT1001 closed with 24 uints ",
      Warehouse:"DealsDray PREXO Processing Warehosue",
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
        ID: 9,
      date: "1 january, 2019",
      Department:"MIS",
      Type:"Merge Request Sent To Wharehouse",
      Agent:"shivani.sort@dealsdray.com",
      Description:"WHT1001 closed with 24 uints ",
      Warehouse:"DealsDray PREXO Processing Warehosue",
      company: "ABC Fintech LTD.",
    },
  ];
  
  const Trayjourneytable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
        <div>
        <h3 style={{marginTop:"30px"}}>Tray Journey</h3>
        <Box marginBottom="50px" boxShadow={1}  sx={{ border:"0.5px solid #78909c",borderRadius:"8px",background:"white"}}overflow="auto">
      
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">Sl No</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Department</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Descritption</TableCell>
              <TableCell align="center">WareHouse</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribarList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((subscriber, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{subscriber.ID}</TableCell>
                  <TableCell align="center">{subscriber.date}</TableCell>
                  <TableCell align="center">{subscriber.Department}</TableCell>
                  <TableCell align="center">{subscriber.Type}</TableCell>
                  <TableCell align="center">{subscriber.Agent}</TableCell>
                  <TableCell align="center">{subscriber.Description}</TableCell>
                  <TableCell  align="center">{subscriber.Warehouse}</TableCell>
                 
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>
  
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={subscribarList.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </Box>
      </div>
    );
  };
  
  export default Trayjourneytable;
  
