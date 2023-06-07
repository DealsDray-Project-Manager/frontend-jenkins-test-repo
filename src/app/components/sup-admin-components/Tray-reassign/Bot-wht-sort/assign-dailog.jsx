import React, { useState } from 'react'
import { Dialog, Button, TextField, MenuItem } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { axiosMisUser } from '../../../../../axios'
import { useNavigate } from 'react-router-dom'
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
    setIsAlive,
    sortingAgent,
    isCheck,
}) => {
    const [sortingAgentName, setSortingAgentName] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handelSendRequestConfirm = async () => {
        try {
            setLoading(true)
            let obj = {
                agent_name: sortingAgentName,
                trayId: isCheck,
            }

            let res = await axiosMisUser.post('/assign-to-sorting-agent', obj)
            console.log(res)
            if (res.status === 200) {
                setLoading(false)
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            } else if (res.status == 202) {
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: res?.data?.message,
                    confirmButtonText: 'Ok',
                })
                setLoading(false)
                setSortingAgentName('')
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
        <Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Select Sorting User</H4>
                <TextFieldCustOm
                    label="Username"
                    fullWidth
                    select
                    name="username"
                >
                    {sortingAgent.map((data) => (
                        <MenuItem
                            key={data.user_name}
                            value={data.user_name}
                            onClick={(e) => {
                                setSortingAgentName(data.user_name)
                            }}
                        >
                            {data.user_name}
                        </MenuItem>
                    ))}
                </TextFieldCustOm>
                <FormHandlerBox>
                    <Button
                        variant="contained"
                        p
                        disabled={loading || sortingAgentName === ''}
                        onClick={(e) => {
                            handelSendRequestConfirm()
                        }}
                        color="primary"
                        type="submit"
                    >
                        Assign
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
