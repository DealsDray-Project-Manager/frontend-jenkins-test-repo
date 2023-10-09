import MUIDataTable from 'mui-datatables'
import { Breadcrumb } from 'app/components'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import Swal from 'sweetalert2'
import '../../../../app.css'
import {
    Button,
    IconButton,
    Icon,
    Typography,
    Table,
    TableContainer,
    Card,
} from '@mui/material'
import { axiosSuperAdminPrexo } from '../../../../axios'

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

const PartTable = () => {
    const handelAction = async (type) => {
        try {
            const res = await axiosSuperAdminPrexo.post(`/bqcSynAction/${type}`)
            if (res.status == 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
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
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'BQC Sync', path: '/' }]} />
            </div>
            <Card>
                <Typography sx={{ m: 2, fontSize: 'bold', fontSize: '14px' }}>
                    Click to automatically update the BQC date to today's date.
                </Typography>
                <Button
                    sx={{ m: 1, float: 'right' }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                        if (window.confirm('You want to Update?')) {
                            handelAction('XML')
                        }
                    }}
                >
                    XML Date Update
                </Button>
            </Card>
            <Card sx={{ mt: 1 }}>
                <Typography sx={{ m: 2 }}>
                    Click to update the CSV data into the database.
                </Typography>
                <Button
                    sx={{ m: 1, float: 'right' }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                        if (window.confirm('You want to Update?')) {
                            handelAction('CSV')
                        }
                    }}
                >
                    CSV Import
                </Button>
            </Card>
        </Container>
    )
}

export default PartTable
