import React, { useState } from 'react'
import { Dialog, Button, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosMisUser } from '../../../../../axios'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'

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
    setIsAlive,
    curRackId,
    trayId,
    showRack,
}) => {
    const [newRack, setnewRack] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const handelSendRequestConfirm = async () => {
        try {
            setLoading(true)
            let obj = {
                trayId: trayId,
                rackId: newRack,
            }
            let res = await axiosMisUser.post('/rackChangeByMis', obj)
            if (res.status == 200) {
                handleClose()
                setLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setnewRack('')

                setIsAlive((isAlive) => !isAlive)
            } else {
                // setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res?.data?.message,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }
    return (
        <Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Select RDL-One User</H4>
                <TextFieldCustOm
                    label="Current Rack Id"
                    fullWidth
                    disabled
                    value={curRackId}
                    name="cur_rack"
                />

                <TextFieldCustOm
                    label="Select New Rack"
                    fullWidth
                    select
                    name="username"
                >
                    {showRack
                        .filter((dataRack) => dataRack.rack_id !== curRackId)
                        .map((data) => (
                            <MenuItem
                                key={data.rack_id}
                                value={data.rack_id}
                                onClick={(e) => {
                                    setnewRack(data.rack_id)
                                }}
                            >
                                {data.rack_id}
                            </MenuItem>
                        ))}
                </TextFieldCustOm>

                <FormHandlerBox>
                    <Button
                        variant="contained"
                        disabled={loading || newRack == ''}
                        onClick={(e) => {
                            handelSendRequestConfirm()
                        }}
                        color="primary"
                        type="submit"
                    >
                        Add
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
