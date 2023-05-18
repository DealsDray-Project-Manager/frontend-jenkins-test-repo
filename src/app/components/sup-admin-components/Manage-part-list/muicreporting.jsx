// import { Card, Box, Typography, Button } from "@mui/material";
// import { Breadcrumb } from 'app/components'
// import { useNavigate } from "react-router-dom";
// const MUICreporting = () => {
//     const navigate = useNavigate()

//     const Container = styled('div')(({ theme }) => ({
//         margin: '30px',
//         [theme.breakpoints.down('sm')]: {
//           margin: '16px',
//         },
//         '& .breadcrumb': {
//           marginBottom: '30px',
//           [theme.breakpoints.down('sm')]: {
//             marginBottom: '16px',
//           },
//         },
//       }))
//     return ( 
//         <Container>
//             <div className="breadcrumb">
//           <Breadcrumb

//             routeSegments={[{ name: 'MUIC-Reporting', path: '/' }]}
//             style={{ marginLeft: "20px" }}
//           />
//         </div>
//             <Card sx={{ marginRight: "", marginLeft: "" }}>
//               <Box sx={{ p: 2, alignItems: "center" }}>
//                 <Typography sx={{ p: 2, fontWeight: "bold" }}>MUIC Association Reporting</Typography>
//               </Box>
//               <Box sx={{ ml: 4 }}>
//                 <Typography sx={{ fontSize: "16px" }}>MUIC Uploaded: 25 </Typography>
//                 <Typography sx={{ fontSize: "16px" }}>Validate: 20 </Typography>
//                 <Typography sx={{ fontSize: "16px" }}>Duplicate: 3 </Typography>
//                 <Typography sx={{ fontSize: "16px" }}>Invalid: 2 </Typography>
//               </Box>
//               <br />
//               <Button
//                 sx={{ mb: 2, ml: 55 }}
//                 variant="contained"
//                 color="primary"
//                 onClick={() => navigate('/sup-admin/view-part-list')}
//               >
//                 Back to Spare Part list
//               </Button>
//             </Card>
//         </Container>
//      );
// }
 
// export default MUICreporting;