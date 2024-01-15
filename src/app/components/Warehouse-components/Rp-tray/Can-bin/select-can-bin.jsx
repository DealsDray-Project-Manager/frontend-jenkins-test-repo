import React, { useState } from 'react'
import {
    Button,
    TextField,
    MenuItem,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
    IconButton,
} from '@mui/material'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'

// import jwt from "jsonwebtoken"
import { axiosWarehouseIn } from '../../../../../axios'

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

export default function DialogBox({
    dialogOne,
    setDialogOne,
    trayId,
    canBinTray,
}) {
    const { user } = useAuth()
    const [addButDis, setAddButDis] = useState(false)

    /*********************************************************** */

    const schema = Yup.object().shape({
        cbt: Yup.string().required('Required*').nullable(),
    })
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })

    /************************************************************************** */
    const onSubmit = async (value) => {
        setAddButDis(true)
        try {
            let obj = {
                username: user.username,
                can_bin_tray: value.cbt,
                trayId: trayId,
            }
            let res = await axiosWarehouseIn.post('/saveCanBinTray', obj)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
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

    const handleClose = () => {
        setDialogOne(false)
    }

    const handleOpen = () => {
        reset({})
        setDialogOne(true)
    }

    return (
        <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={dialogOne}
            fullWidth
            maxWidth="xs"
        >
            <BootstrapDialogTitle id="customized-dialog-title">
                Select Can Bin Tray
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <TextField
                    label="Select CBT"
                    fullWidth
                    name="cbt"
                    sx={{
                        mb: 2,
                    }}
                    select
                    {...register('cbt')}
                    error={errors.cbt ? true : false}
                    helperText={errors.cbt?.message}
                    type="text"
                    variant="outlined"
                >
                    {canBinTray?.map((data) => (
                        <MenuItem key={data?.code} value={data?.code}>
                            {data?.code}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ ml: 2 }}
                    disabled={addButDis}
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}
