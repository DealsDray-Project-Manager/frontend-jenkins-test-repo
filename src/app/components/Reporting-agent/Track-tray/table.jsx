import { Margin } from '@mui/icons-material'
import MUIDataTable from 'mui-datatables'
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
} from '@mui/material'
// import { makeStyles } from "@mui/styles";
import shadows from '@mui/material/styles/shadows'

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}))

// const useStyles = makeStyles({
//   table:{
//     minWidth:650,
//     "&.MuiTableCell-root":{
//       border:"1px solid black"
//     }
//   }
// })

const columns = [
    {
        name: 'index',
        label: 'Record No',
        options: {
            filter: false,
            sort: false,
            customBodyRender: (rowIndex, dataIndex) => dataIndex.rowIndex + 1,
        },
    },
    {
        name: 'uic',
        label: 'UIC',
        options: {
            filter: true,
        },
    },
    {
        name: 'muic',
        label: 'MUIC',
        options: {
            filter: true,
        },
    },

    {
        name: 'brand_name',
        label: 'Brand',
        options: {
            filter: true,
        },
    },
    {
        name: 'model_name',
        label: 'Model',
        options: {
            filter: true,
        },
    },
    {
        name: 'tracking_id',
        label: 'Tracking Id',
        options: {
            filter: true,
        },
    },
    {
        name: 'tray_id',
        label: 'BOT Tray',
        options: {
            filter: true,
        },
    },
    {
        name: 'bot_agent',
        label: 'BOT Agent',
        options: {
            filter: true,
        },
    },
]

const SimpleTable = ({ Items }) => {
    // const classes = useStyles();
    return (
        <div>
            <h3 style={{ marginTop: '30px' }}>Tray Current Items</h3>
            <Box
                boxShadow={1}
                sx={{
                    border: '0.5px solid #78909c',
                    borderRadius: '8px',
                    background: 'white',
                }}
                overflow="auto"
            >
                <StyledTable sx={{ borderRadius: '20px' }}>
                    <MUIDataTable
                        title={'Tray'}
                        data={Items}
                        columns={columns}
                        options={{
                            filterType: 'textField',
                            responsive: 'simple',
                            download: false,
                            print: false,

                            selectableRows: 'none', // set checkbox for each row
                            // search: false, // set search option
                            // filter: false, // set data filter option
                            // download: false, // set download option
                            // print: false, // set print option
                            // pagination: true, //set pagination option
                            // viewColumns: false, // set column option
                            customSort: (data, colIndex, order) => {
                                return data.sort((a, b) => {
                                    if (colIndex === 1) {
                                        return (
                                            (a.data[colIndex].price <
                                            b.data[colIndex].price
                                                ? -1
                                                : 1) *
                                            (order === 'desc' ? 1 : -1)
                                        )
                                    }
                                    return (
                                        (a.data[colIndex] < b.data[colIndex]
                                            ? -1
                                            : 1) * (order === 'desc' ? 1 : -1)
                                    )
                                })
                            },
                            elevation: 0,
                            rowsPerPageOptions: [10, 20, 40, 80, 100],
                        }}
                    />
                </StyledTable>
            </Box>
        </div>
    )
}

export default SimpleTable
