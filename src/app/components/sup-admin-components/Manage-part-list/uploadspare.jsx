import { Card, Typography, Box,Button,TextField } from "@mui/material";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Uploadspare = () => {
    const [exFile, setExfile] = useState(null)
    return ( 
        <Card>
            <Typography> Upload New Spare Parts</Typography>
            <br />
            <br />
            <Box>
                <Box>
                    <Typography>Download Sample File</Typography>
                    <Button
                            sx={{ mb: 2, ml: 2 }}
                            variant="contained"
                            color="primary"
                            href={
                                process.env.PUBLIC_URL +
                                '/spare -part-sheet-sample.xlsx'
                            }
                            download
                        >
                            Download
                        </Button>
                </Box>
                <Box>
                    <Typography>Upload Parts File</Typography>
                    <TextField
                        size="small"
                        inputProps={{ accept: '.csv,.xlsx,.xls' }}
                        onChange={(e) => {
                            setExfile(e.target.files[0])
                        }}
                        variant="outlined"
                        type="file"
                    />
                </Box>
            </Box>
        </Card>
     );
}
 
export default Uploadspare;