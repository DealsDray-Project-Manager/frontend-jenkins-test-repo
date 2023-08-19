import React, { useEffect, useState, useMemo } from 'react'
import {
    Box,
    Button,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    IconButton,
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import { axiosMisUser, axiosWarehouseIn } from '../../../../axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}))
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
}

export default function DialogBox() {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [trayData, setTrayData] = useState([])
    const { trayId } = useParams()
    const [loading, setLoading] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    const [productData, setProductData] = useState([])
    const [stickerOne, setStickerOne] = useState('')
    /**************************************************************************** */
    const [uic, setUic] = useState('')
    const [refresh, setRefresh] = useState(false)
    /*********************************************************** */

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosMisUser.post(
                    '/whtUtility/botTray/closePage/' +
                        trayId +
                        '/' +
                        'Wht-utility-work'
                )
                if (response.status === 200) {
                    setTrayData(response.data.data)
                } else {
                    alert(response.data.message)
                    navigate(-1)
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [refresh])

    /************************************************************************************* */
    const handleClose = () => {
        setOpen(false)
        setUic('')
        setStickerOne('')
        setTextDisable(false)
    }

    const handelUic = async (e) => {
        try {
            let obj = {
                uic: uic,
                trayId: trayId,
            }
            setTextDisable(true)

            let res = await axiosMisUser.post('/whtUtility/botTray/oldUic', obj)
            if (res?.status == 200) {
                setProductData(res.data.data)
                setOpen(true)
            } else {
                setTextDisable(false)
                setUic('')
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
    /************************************************************************** */
    const addActualitem = async (e) => {
        if (e.keyCode !== 32) {
            if (trayData.items.length < trayData?.actual_items?.length) {
                alert('All Items Scanned')
            } else {
                setLoading(true)
                try {
                    let objData = {
                        trayId: trayId,
                        item: productData[0],
                    }
                    setTextDisable(true)
                    let res = await axiosWarehouseIn.post(
                        '/wht-add-actual-item',
                        objData
                    )
                    if (res.status == 200) {
                        setUic('')
                        handleClose()
                        setTextDisable(false)
                        setLoading(false)
                        setRefresh((refresh) => !refresh)
                    }
                } catch (error) {
                    alert(error)
                }
            }
        }
    }
    /************************************************************************** */
    const handelIssue = async (e) => {
        try {
            setLoading(true)

            let res = await axiosMisUser.post(
                '/whtUtility/resticker/save/' + trayId
            )
            if (res.status == 200) {
                alert(res.data.message)
                navigate('/warehouse/wht-utility/Bot-tray')
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }

    const tableExpected = useMemo(() => {
        return (
            <Paper sx={{ width: '95%', overflow: 'hidden', m: 1 }}>
                <Box sx={{}}>
                    <Box
                        sx={{
                            float: 'left',
                            ml: 2,
                        }}
                    >
                        <h5>EXPECTED</h5>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5 style={{ marginLeft: '12px' }}>Total</h5>
                            <p style={{ paddingLeft: '5px', fontSize: '22px' }}>
                                {trayData?.items?.length}/{trayData?.limit}
                            </p>
                        </Box>
                    </Box>
                </Box>
                <TableContainer> 
                    <Table
                        style={{ width: '100%' }}
                        id="example"
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{pl:2}}>S.NO</TableCell>
                                <TableCell>OLD UIC</TableCell>
                                <TableCell>NEW UIC</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trayData?.items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{pl:4}}>{index + 1}</TableCell>
                                    <TableCell>{data?.old_uic}</TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [trayData?.items])

    const tableActual = useMemo(() => {
        return (
            <Paper sx={{ width: '98%', overflow: 'hidden', m: 1 }}>
                <Box sx={{}}>
                    <Box
                        sx={{
                            float: 'left',
                            ml: 2,
                        }}
                    >
                        <h5>ACTUAL</h5>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TextField
                                sx={{ mt: 1 }}
                                id="outlined-password-input"
                                type="text"
                                disabled={textDisable}
                                name="doorsteps_diagnostics"
                                inputRef={(input) => input && input.focus()}
                                label="SCAN OLD UIC"
                                value={uic}
                                onChange={(e) => {
                                    setUic(e.target.value)
                                }}
                                inputProps={{
                                    style: {
                                        width: 'auto',
                                    },
                                }}
                            />
                            <Button
                                sx={{ ml: 3, mt: 2, mb: 2 }}
                                variant="contained"
                                disabled={uic == ''}
                                style={{ backgroundColor: 'green' }}
                                onClick={(e) => {
                                    handelUic(e)
                                }}
                            >
                                Search
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            float: 'right',
                            mr: 2,
                        }}
                    >
                        <Box sx={{}}>
                            <h5 style={{ marginLeft: '12px' }}>Total</h5>
                            <p style={{ marginLeft: '5px', fontSize: '24px' }}>
                                {trayData.actual_items?.length}/
                                {trayData?.limit}
                            </p>
                        </Box>
                    </Box>
                </Box>
                <TableContainer>
                    <Table
                        style={{ width: '100%' }}
                        id="example"
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{pl:2}}>S.NO</TableCell>
                                <TableCell>OLD UIC</TableCell>
                                <TableCell>NEW UIC</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {trayData?.actual_items?.map((data, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{pl:4}}>{index + 1}</TableCell>
                                    <TableCell>{data?.old_uic}</TableCell>
                                    <TableCell>{data?.uic}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }, [trayData?.actual_items, textDisable, uic])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Tray', path: '/' },
                        { name: 'Resticker'}
                    ]}
                />
            </div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="lg"
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    DETAILS
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <h3 style={{ marginLeft: '11px' }}>
                                    AWBN:-{productData?.[0]?.awbn_number}
                                </h3>
                                <h3 style={{ marginLeft: '11px' }}>
                                    NEW UIC :- {productData?.[0]?.uic}
                                </h3>
                                <h3 style={{ marginLeft: '11px' }}>
                                    BRAND :- {productData?.[1]?.brand_name}
                                </h3>
                                <h3 style={{ marginLeft: '11px' }}>
                                    MODEL :- {productData?.[1]?.model_name}
                                </h3>
                                <h3 style={{ marginLeft: '11px' }}>
                                    MUIC :- {productData?.[1]?.muic}
                                </h3>
                                <h3>
                                    <Checkbox
                                        onClick={(e) => {
                                            stickerOne == ''
                                                ? setStickerOne(
                                                      'UIC Pasted On Device'
                                                  )
                                                : setStickerOne('')
                                        }}
                                    />
                                    UIC Pasted On Device
                                </h3>
                            </Grid>
                            <Grid item xs={6}>
                                <img
                                    height="auto"
                                    width="400px"
                                    alt="No product image"
                                    src={
                                        productData?.[1]?.image == undefined
                                            ? 'https://prexo-v8-5-uat-api.dealsdray.com/product/image/' +
                                              productData?.[1]?.vendor_sku_id +
                                              '.jpg'
                                            : productData?.[1]?.image
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        disabled={loading == true || stickerOne == ''}
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            addActualitem(e)
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <Box
                sx={{
                    mt: 1,
                    height: 70,
                    borderRadius: 1,
                }}
            >
                <Box
                    sx={{
                        float: 'left',
                    }}
                >
                    <h4 style={{ marginLeft: '13px' }}>TRAY ID - {trayId}</h4>
                </Box>
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    {tableExpected}
                </Grid>
                <Grid item xs={6}>
                    {tableActual}
                </Grid>
            </Grid>
            <div style={{ float: 'right' }}>
                <Box sx={{ float: 'right' }}>
                    <Button
                        sx={{ m: 3, mb: 9 }}
                        variant="contained"
                        disabled={
                            loading == true ||
                            trayData?.actual_items?.length !==
                                trayData?.items?.length
                        }
                        style={{ backgroundColor: 'green' }}
                        onClick={(e) => {
                            if (window.confirm('You Want to Save?')) {
                                handelIssue(e)
                            }
                        }}
                    >
                        SAVE
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
