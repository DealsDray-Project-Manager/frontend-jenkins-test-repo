import React, { useState, useEffect } from 'react'
import { Dialog, Button, TextField } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H4 } from 'app/components/Typography'
import Swal from 'sweetalert2'
import { axiosSuperAdminPrexo } from '../../../../axios'

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
    open,
    handleClose,
    setIsAlive,
    editFetchData,
    setEditFetchData,
}) => {
    const [productImage, setProductImage] = useState({
        preview: '',
        store: '',
    })

    useEffect(() => {
        if (Object.keys(editFetchData).length !== 0) {
            setProductImage({
                ...productImage,
                preview: editFetchData.image,
            })
            open()
        }
    }, [])

    const handelEditImage = async () => {
        try {
            let obj = {
                _id: editFetchData?._id,
            }
            let formdata = new FormData()
            formdata.append('image', productImage.store)
            for (let [key, value] of Object.entries(obj)) {
                formdata.append(key, value)
            }
            let response = await axiosSuperAdminPrexo.post(
                '/editProductImage',
                formdata
            )
            if (response.status == 200) {
                handleClose()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Update Successfully',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setEditFetchData({})
                        setIsAlive((isAlive) => !isAlive)
                    }
                })
            } else {
                handleClose()

                setEditFetchData({})
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: response.data.message,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            handleClose()
            setEditFetchData({})
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Updation Failed',
            })
        }
    }

    const handelProfile = (event) => {
        setProductImage({
            preview: URL.createObjectURL(event.target.files[0]),
            store: event.target.files[0],
        })
    }
    return (
        <Dialog open={open}>
            <Box p={3}>
                <H4 sx={{ mb: '20px' }}>Update Image</H4>
                <img
                    src={productImage.preview}
                    height="60px"
                    width="60px"
                    style={{ borderRadius: '50%', margin: 'auto' }}
                />

                <TextFieldCustOm
                    label="Image"
                    type="file"
                    onChange={(e) => {
                        handelProfile(e)
                    }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    accept=".jpg,.jpeg,.png,"
                    name="image"
                />
                <FormHandlerBox>
                    <Button
                        variant="contained"
                        disabled={productImage.store == ''}
                        onClick={(e) => {
                            handelEditImage()
                        }}
                        color="primary"
                        type="submit"
                    >
                        Update
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
