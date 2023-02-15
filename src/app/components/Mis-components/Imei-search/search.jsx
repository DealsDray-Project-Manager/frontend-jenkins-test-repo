import { Breadcrumb } from 'app/components'
import React, { useState, useEffect, useMemo } from 'react'
import { styled } from '@mui/system'
// import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography';
import { axiosMisUser } from '../../../../axios'
import {
  Button,
  MenuItem,
  TableCell,
  TableHead,
  Table,
  TableRow,
  TableBody,
  Card,
  TablePagination,
  TextField,
  Box,
} from '@mui/material'


function Search() {

  const [data, setdata] = useState('')
  const [deliveryData, setdeliveryData] = useState()
  const [orderData, setorderData] = useState()


  const searchIMEI = async (e) => {
    e.preventDefault()
    try {
      const fetchData = async () => {
        const value = data
        await axiosMisUser.post('/imeiDeliverySearch', value).then((response) => {
          console.log(response);
          console.log('response');
          if (response?.data?.error) {
            alert('invalid IMEI')
          }
          setdeliveryData(response?.data?.resultdata)
        })
        await axiosMisUser.post('/imeiOrderSearch', value).then((response) => {
          if (response?.data?.error) {
            alert('invaliid IMEI')
          }
          setorderData(response?.data?.resultdata)
        })

      }
      fetchData()
    } catch (error) {
      alert(error)
    }
  }

  const DeiveryTable = styled(Table)(() => ({
    minWidth: 750,
    width: 9000,
    height: 100,
    whiteSpace: 'pre',
    '& thead': {
      '& th:first-of-type': {
        paddingLeft: 16,
      },
    },
    '& td': {
      borderBottom: 'none',
    },
    '& td:first-of-type': {
      paddingLeft: '16px !important',
    },
  }))

  const OrderTable = styled(Table)(() => ({
    minWidth: 750,
    width: 3000,
    height: 100,
    whiteSpace: 'pre',
    '& thead': {
      '& th:first-of-type': {
        paddingLeft: 16,
      },
    },
    '& td': {
      borderBottom: 'none',
    },
    '& td:first-of-type': {
      paddingLeft: '16px !important',
    },
  }))

  const OrderSearchData = useMemo(() => {
    return (
      <OrderTable >
        <TableHead>
          <TableRow>
            <TableCell>Order id</TableCell>
            <TableCell>Order date</TableCell>
            <TableCell>Order timestamp</TableCell>
            <TableCell>Delivery status</TableCell>
            <TableCell>Order status</TableCell>
            <TableCell>Buyback category</TableCell>
            <TableCell>Partner id</TableCell>
            <TableCell>Partner email</TableCell>
            <TableCell>Partner shop</TableCell>
            <TableCell>Item id</TableCell>
            <TableCell>Old item details</TableCell>
            <TableCell>Imei</TableCell>
            <TableCell>Gep order</TableCell>
            <TableCell>Base discount</TableCell>
            <TableCell>Partner purchase price</TableCell>
            <TableCell>Gc amount redeemed</TableCell>
            <TableCell>Gc redeem time</TableCell>
            <TableCell>Vc_eligible</TableCell>
            <TableCell>Customer declaration physical defect_present</TableCell>
            <TableCell>Exchange_facilitation_fee</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {
            orderData?.length!==0?
            orderData?.map((data, index) => (
              <TableRow>
                <TableCell>{data?.order_id}</TableCell>
                <TableCell>
                  {data?.order_date != undefined
                    ? new Date(
                      data?.order_date
                    ).toLocaleDateString('en-GB')
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.order_timestamp != undefined
                    ? new Date(
                      data?.order_timestamp
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>


                <TableCell
                  style={
                    data?.delivery_status === 'Delivered'
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                  {data?.delivery_status}
                </TableCell>

                <TableCell
                  style={
                    data?.order_status === 'printed'
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                  { data?.order_status}
                </TableCell>
                <TableCell>{data?.buyback_category}</TableCell>
                <TableCell>{data?.partner_id}</TableCell>
                <TableCell>{data?.partner_email}</TableCell>
                <TableCell>{data?.partner_shop}</TableCell>
                <TableCell>{data?.item_id}</TableCell>
                <TableCell>{data?.old_item_details}</TableCell>
                <TableCell>{data?.imei}</TableCell>
                <TableCell>{data?.gep_order}</TableCell>
                <TableCell>{data?.base_discount}</TableCell>
                <TableCell>{data?.partner_purchase_price}</TableCell>
                <TableCell>
                {data?.gc_amount_redeemed}
                </TableCell>
                <TableCell>
                  {data?.gc_redeem_time != undefined
                    ? new Date(
                      data?.gc_redeem_time
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>{data?.vc_eligible}</TableCell>
                <TableCell>{data?.customer_declaration_physical_defect_present}</TableCell>
                <TableCell>{data?.exchange_facilitation_fee}</TableCell>
               
              </TableRow>
            )):
            <TableRow>
              <tableCell>Order Not Exist.</tableCell>
            </TableRow>
          }
        </TableBody>
      </OrderTable>
    )
  })


  const deliverySearchData = useMemo(() => {
    return (
      <DeiveryTable>
        <TableHead>
          <TableRow>
          <TableCell sx={{ ml: 1 }}>Uic code</TableCell>
          <TableCell>Uic status</TableCell>
            <TableCell>Tracking id</TableCell>
            <TableCell>Order id</TableCell>
            <TableCell>Order date</TableCell>
            <TableCell>Item id</TableCell>
            <TableCell>Gep order</TableCell>
            <TableCell>Imei</TableCell>
            <TableCell>Partner purchase price</TableCell>
            <TableCell>Partner shop</TableCell>
            <TableCell>Buyback category</TableCell>
            <TableCell>Delivery date</TableCell>
            
            <TableCell>Bag id</TableCell>
            <TableCell>Stock in status</TableCell>
            <TableCell>Stockin date</TableCell>
            <TableCell>Bag close date</TableCell>

           
            <TableCell sx={{ ml: 1 }}>Uic created at</TableCell>
            <TableCell sx={{ ml: 1 }}>Uic user</TableCell>

            <TableCell>Download time</TableCell>
            <TableCell>Agent name</TableCell>
            <TableCell>Assign to agent</TableCell>

            <TableCell>Tray id</TableCell>
            <TableCell>Tray location</TableCell>
            <TableCell>Tray status</TableCell>
            <TableCell>Tray type</TableCell>
            <TableCell>Tray closed by bot</TableCell>
            <TableCell>Bot done received</TableCell>
            <TableCell>Tray close wh date</TableCell>
            <TableCell>Handover sorting date</TableCell>
            <TableCell>Sorting agent name</TableCell>
            <TableCell>Wht tray</TableCell>
            <TableCell>Wht tray assigned date</TableCell>
            <TableCell>Received from sorting</TableCell>
            <TableCell>Closed from sorting</TableCell>
            <TableCell>Agent name charging</TableCell>
            <TableCell>Assign to agent charging</TableCell>
            <TableCell>Charging in date</TableCell>

            <TableCell>Charging done date</TableCell>
            <TableCell>Charging done received</TableCell>
            <TableCell>Charging done close</TableCell>
            <TableCell>Agent name bqc</TableCell>
            <TableCell>Assign to agent bqc</TableCell>
            <TableCell>Bqc out date</TableCell>

            <TableCell>Bqc done received</TableCell>
            <TableCell>Bqc done close</TableCell>
            <TableCell>Audit user name</TableCell>
            <TableCell>Issued to audit</TableCell>

            <TableCell>Audit done recieved</TableCell>
            <TableCell>Audit done date</TableCell>
            <TableCell>Audit done close</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            deliveryData?.length!==0?

            deliveryData?.map((data, index) =>
            (
              <TableRow >
                <TableCell sx={{ ml: 1 }}>{data?.uic_code?.code}</TableCell>
                <TableCell
                  style={
                    data?.uic_status == 'printed'
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                  {data?.uic_status}
                </TableCell>
                <TableCell>{data?.tracking_id}</TableCell>
                <TableCell>{data?.order_id}</TableCell>
                <TableCell>
                  {data?.order_date != undefined
                    ? new Date(
                      data?.order_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>{data?.item_id}</TableCell>
                <TableCell>{data?.gep_order}</TableCell>
                <TableCell>{data?.imei}</TableCell>
                <TableCell>{data?.partner_purchase_price}</TableCell>
                <TableCell>{data?.partner_shop}</TableCell>
                <TableCell>{data?.buyback_category}</TableCell>
                <TableCell>
                  {data?.delivery_date != undefined
                    ? new Date(
                      data?.delivery_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
               
                <TableCell>{data?.bag_id}</TableCell>
                <TableCell>{data?.stock_in_status}</TableCell>

                <TableCell>
                  {data?.stockin_date != undefined
                    ? new Date(
                      data?.stockin_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>

                <TableCell>
                  {data?.bag_close_date != undefined
                    ? new Date(
                      data?.bag_close_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>

                
                <TableCell>
                  {data?.uic_code?.created_at != undefined
                    ? new Date(
                      data?.uic_code?.created_at
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>


                <TableCell sx={{ ml: 1 }}>{data?.uic_code?.user}</TableCell>

                <TableCell>
                  {data?.download_time != undefined
                    ? new Date(
                      data?.download_time
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>

                <TableCell>{data?.agent_name}</TableCell>
                <TableCell>
                  {data?.assign_to_agent != undefined
                    ? new Date(
                      data?.assign_to_agent
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>

                <TableCell>{data?.tray_id}</TableCell>
                <TableCell>{data?.tray_location}</TableCell>
                <TableCell>{data?.tray_status}</TableCell>
                <TableCell>{data?.tray_type}</TableCell>
                <TableCell>
                  {data?.tray_closed_by_bot != undefined
                    ? new Date(
                      data?.tray_closed_by_bot
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.bot_done_received != undefined
                    ? new Date(
                      data?.bot_done_received
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.tray_close_wh_date != undefined
                    ? new Date(
                      data?.tray_close_wh_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>


                <TableCell>
                  {data?.handover_sorting_date != undefined
                    ? new Date(
                      data?.handover_sorting_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>{data?.sorting_agent_name}</TableCell>
                <TableCell>{data?.wht_tray}</TableCell>
                <TableCell>
                  {data?.wht_tray_assigned_date != undefined
                    ? new Date(
                      data?.wht_tray_assigned_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.received_from_sorting != undefined
                    ? new Date(
                      data?.received_from_sorting
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.closed_from_sorting != undefined
                    ? new Date(
                      data?.closed_from_sorting
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>{data?.agent_name_charging}</TableCell>
                <TableCell>
                  {data?.assign_to_agent_charging != undefined
                    ? new Date(
                      data?.assign_to_agent_charging
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.charging_in_date != undefined
                    ? new Date(
                      data?.charging_in_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>

                <TableCell>
                  {data?.charging_done_date != undefined
                    ? new Date(
                      data?.charging_done_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.charging_done_received != undefined
                    ? new Date(
                      data?.charging_done_received
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.charging_done_close != undefined
                    ? new Date(
                      data?.charging_done_close
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>{data?.agent_name_bqc}</TableCell>
                <TableCell>
                  {data?.assign_to_agent_bqc != undefined
                    ? new Date(
                      data?.assign_to_agent_bqc
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.bqc_out_date != undefined
                    ? new Date(
                      data?.bqc_out_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>

                <TableCell>
                  {data?.bqc_done_received != undefined
                    ? new Date(
                      data?.bqc_done_received
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.bqc_done_close != undefined
                    ? new Date(
                      data?.bqc_done_close
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>{data?.audit_user_name}</TableCell>
                <TableCell>
                  {data?.issued_to_audit != undefined
                    ? new Date(
                      data?.issued_to_audit
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>

                <TableCell>
                  {data?.audit_done_recieved != undefined
                    ? new Date(
                      data?.audit_done_recieved
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.audit_done_date != undefined
                    ? new Date(
                      data?.audit_done_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.audit_done_close != undefined
                    ? new Date(
                      data?.audit_done_close
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
              </TableRow>
            )):
            <TableRow>
              <TableCell>Delivery order Not Exist.</TableCell>
            </TableRow>
          }
        </TableBody>
      </DeiveryTable>
    )
  })
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'IMEI Search', path: '/' },
            { name: 'Search' },
          ]}
        />
      </div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >

        <Box>
          <TextField
            label="Search IMEI"
            variant="outlined"
            onChange={(e) => {
              setdata(() => ({ ...data, value: e.target.value }))
            }}
            sx={{  mb: 3, mt: 3 }}
          />
        </Box>
        <Box>
          <Button
            sx={{ mb: 2, mt: 4, ml: 3 }}
            variant="contained"
            color="primary"
            onClick={(e) => {
              searchIMEI(e)
            }}
          >
            Search
          </Button>
        </Box>
      </Box>

      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
      >
        Orders
      </Typography>
      <Card sx={{ maxHeight: '100%', overflow: 'auto' }} elevation={6}>
        {OrderSearchData}
      </Card>
      

      <Typography
        sx={{ flex: '1 1 100%', mt: 4 }}
        variant="h6"
        id="tableTitle"
      >
        Delivery
      </Typography>
      <Card sx={{ maxHeight: '100%', overflow: 'auto', mb: 4 }} >
        {deliverySearchData}
      </Card>
    </Container>
  )
}

export default Search