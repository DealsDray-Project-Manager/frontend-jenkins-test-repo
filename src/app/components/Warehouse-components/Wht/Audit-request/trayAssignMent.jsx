import React, { useState } from 'react'
import {
    Dialog,
    Button,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosMisUser, axiosWarehouseIn } from '../../../../../axios'
import SearchIcon from '@mui/icons-material/Search'
import jwt_decode from 'jwt-decode'

const TextFieldCustOm = styled(TextField)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const FormHandlerBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const MemberEditorDialog = ({
    handleClose,
    open,
    setOtherTrayAssign,
    otherTrayAssign,
    trayIdNotChangeAble,
}) => {
    const [auditUserName, setAuditUsername] = useState('')
    const [err, setErr] = useState({
        LUT: '',
        DUT: '',
        RBQ: '',
        CFT: '',
        STA: '',
        STB: '',
        STC: '',
        STD: '',
    })
    const [trayId, setTrayId] = useState({
        lut: '',
        dut: '',
        rbq: '',
        cft: '',
        sta: '',
        stb: '',
        stc: '',
        std: '',
    })

    const handelTrayId = async (trayId, trayType) => {
        try {
            const user = localStorage.getItem('prexo-authentication')
            if (user) {
                const { location } = jwt_decode(user)
                let res = await axiosWarehouseIn.post(
                    '/trayIdCheckAuditApprovePage/' +
                        trayId +
                        '/' +
                        trayType +
                        '/' +
                        location
                )
                if (res.status == 200) {
                    alert(res.data.message)
                    setOtherTrayAssign((otherTrayAssign) => ({
                        ...otherTrayAssign,
                        [trayType]: res.data.trayId,
                    }))
                    setErr((err) => ({ ...err, [trayType]: '' }))
                } else {
                    setErr((err) => ({ ...err, [trayType]: res.data.message }))
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Dialog fullWidth maxWidth="xs" open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Assign Tray</H4>
                <TextFieldCustOm
                    onChange={(e) => {
                        setTrayId((trayId) => ({
                            ...trayId,
                            lut: e.target.value,
                        }))
                    }}
                    disabled={trayIdNotChangeAble.LUT !== ''}
                    value={trayId.lut || otherTrayAssign.LUT}
                    error={err.LUT !== ''}
                    helperText={err.LUT}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick={(e) => {
                                        handelTrayId(trayId.lut, 'LUT')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="LUT Tray"
                    fullWidth
                    name="lut"
                />
                <TextFieldCustOm
                    onChange={(e) => {
                        setTrayId((trayId) => ({
                            ...trayId,
                            dut: e.target.value,
                        }))
                    }}
                    value={trayId.dut || otherTrayAssign.DUT}
                    error={err.DUT !== ''}
                    helperText={err.DUT}
                    disabled={trayIdNotChangeAble.DUT !== ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick={(e) => {
                                        handelTrayId(trayId.dut, 'DUT')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="DUT Tray"
                    fullWidth
                    name="dut"
                />
                <TextFieldCustOm
                    onChange={(e) => {
                        setTrayId((trayId) => ({
                            ...trayId,
                            rbq: e.target.value,
                        }))
                    }}
                    value={trayId.rbq || otherTrayAssign.RBQ}
                    error={err.RBQ !== ''}
                    helperText={err.RBQ}
                    disabled={trayIdNotChangeAble.RBQ !== ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick={(e) => {
                                        handelTrayId(trayId.rbq, 'RBQ')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="RBQ Tray"
                    fullWidth
                    name="rbq"
                />
                <TextFieldCustOm
                    onChange={(e) => {
                        setTrayId((trayId) => ({
                            ...trayId,
                            cft: e.target.value,
                        }))
                    }}
                    value={trayId.cft || otherTrayAssign.CFT}
                    disabled={trayIdNotChangeAble.CFT !== ''}
                    error={err.CFT !== ''}
                    helperText={err.CFT}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick={(e) => {
                                        handelTrayId(trayId.cft, 'CFT')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="CFT Tray"
                    fullWidth
                    name="cft"
                />
                <TextFieldCustOm
                    onChange={(e) => {
                        setTrayId((trayId) => ({
                            ...trayId,
                            sta: e.target.value,
                        }))
                    }}
                    disabled={trayIdNotChangeAble.STA !== ''}
                    value={trayId.sta || otherTrayAssign.STA}
                    error={err.STA !== ''}
                    helperText={err.STA}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick={(e) => {
                                        handelTrayId(trayId.sta, 'STA')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="STA Tray"
                    fullWidth
                    name="sta"
                />
                <TextFieldCustOm
                    onChange={(e) => {
                        setTrayId((trayId) => ({
                            ...trayId,
                            stb: e.target.value,
                        }))
                    }}
                    disabled={trayIdNotChangeAble.STB !== ''}
                    value={trayId.stb || otherTrayAssign.STB}
                    error={err.STB !== ''}
                    helperText={err.STB}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick={(e) => {
                                        handelTrayId(trayId.stb, 'STB')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="STB Tray"
                    fullWidth
                    name="stb"
                />
                <TextFieldCustOm
                    onChange={(e) => {
                        setTrayId((trayId) => ({
                            ...trayId,
                            stc: e.target.value,
                        }))
                    }}
                    disabled={trayIdNotChangeAble.STC !== ''}
                    value={trayId.stc || otherTrayAssign.STC}
                    error={err.STC !== ''}
                    helperText={err.STC}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick={(e) => {
                                        handelTrayId(trayId.stc, 'STC')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="STC Tray"
                    fullWidth
                    name="stc"
                />
                <TextFieldCustOm
                    onChange={(e) => {
                        setTrayId((trayId) => ({
                            ...trayId,
                            std: e.target.value,
                        }))
                    }}
                    disabled={trayIdNotChangeAble.STD !== ''}
                    value={trayId.std || otherTrayAssign.STD}
                    error={err.STD !== ''}
                    helperText={err.STD}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick={(e) => {
                                        handelTrayId(trayId.std, 'STD')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="STD Tray"
                    fullWidth
                    name="std"
                />
                <FormHandlerBox>
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            handleClose()
                        }}
                        color="primary"
                        type="submit"
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleClose()}
                    >
                        Cancel
                    </Button>
                </FormHandlerBox>
            </Box>
        </Dialog>
    )
}

export default MemberEditorDialog
