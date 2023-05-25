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
import Swal from 'sweetalert2'

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
    brand,
    model,
}) => {
    const [err, setErr] = useState({
        CTA: '',
        CTB: '',
        CTC: '',
        CTD: '',
    })
    const [trayId, setTrayId] = useState({
        cta: '',
        ctb: '',
        ctc: '',
        ctd: '',
    })

    const handelTrayId = async (trayId, trayType) => {
        try {
            const user = localStorage.getItem('prexo-authentication')
            if (user) {
                const { location } = jwt_decode(user)
                let obj={
                    trayId:trayId,
                    trayType:trayType,
                    location:location,
                    brand:brand,
                    model:model
                }
                let res = await axiosWarehouseIn.post(
                    '/trayIdCheckAuditApprovePage',obj
                )
                if (res.status == 200) {
                    // Swal.fire({
                    //     position: 'top',
                    //     icon: 'success',
                    //     title: res?.data?.message,
                    //     confirmButtonText: 'Ok',
                    // })
                    alert(res?.data?.message)
                    setOtherTrayAssign((otherTrayAssign) => ({
                        ...otherTrayAssign,
                        [trayType]: res.data.trayId,
                    }))
                    setErr((err) => ({ ...err, [trayType]: '' }))
                } else {
                    setErr((err) => ({ ...err, [trayType]: res.data.message }))
                    alert(res?.data?.message)

                    // alert(res?.data?.message)
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Ok',
                text: error,
            })
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
                            cta: e.target.value,
                        }))
                    }}
                    disabled={trayIdNotChangeAble.A !== ''}
                    value={trayId.cta || otherTrayAssign.A}
                    error={err.CTA !== ''}
                    helperText={err.CTA}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    disabled={trayId.cta == ''}
                                    onClick={(e) => {
                                        handelTrayId(trayId.cta, 'A')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="CTA Tray"
                    fullWidth
                    name="cta"
                />
                <TextFieldCustOm
                    onChange={(e) => {
                        setTrayId((trayId) => ({
                            ...trayId,
                            ctb: e.target.value,
                        }))
                    }}
                    disabled={trayIdNotChangeAble.B !== ''}
                    value={trayId.ctb || otherTrayAssign.B}
                    error={err.CTB !== ''}
                    helperText={err.CTB}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    disabled={trayId.ctb == ''}
                                    onClick={(e) => {
                                        handelTrayId(trayId.ctb, 'B')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="CTB Tray"
                    fullWidth
                    name="ctb"
                />
                <TextFieldCustOm
                    onChange={(e) => {
                        setTrayId((trayId) => ({
                            ...trayId,
                            ctc: e.target.value,
                        }))
                    }}
                    disabled={trayIdNotChangeAble.C !== ''}
                    value={trayId.ctc || otherTrayAssign.C}
                    error={err.CTC !== ''}
                    helperText={err.CTC}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    disabled={trayId.ctc == ''}
                                    onClick={(e) => {
                                        handelTrayId(trayId.ctc, 'C')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="CTC Tray"
                    fullWidth
                    name="ctc"
                />
                <TextFieldCustOm
                    onChange={(e) => {
                        setTrayId((trayId) => ({
                            ...trayId,
                            ctd: e.target.value,
                        }))
                    }}
                    disabled={trayIdNotChangeAble.D !== ''}
                    value={trayId.ctd || otherTrayAssign.D}
                    error={err.CTD !== ''}
                    helperText={err.CTD}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    disabled={trayId.ctd == ''}
                                    onClick={(e) => {
                                        handelTrayId(trayId.ctd, 'D')
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="CTD Tray"
                    fullWidth
                    name="ctd"
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
