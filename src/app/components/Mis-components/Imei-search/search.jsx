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
          // setCount(response?.data?.count())
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


  console.log(deliveryData);
  console.log('deliveryData');


  const OrderSearchData = useMemo(() => {
    return (
      <OrderTable >
        <TableHead>
          <TableRow>
            <TableCell>order_id</TableCell>
            <TableCell>order_date</TableCell>
            <TableCell>order_timestamp</TableCell>
            <TableCell>order_status</TableCell>
            <TableCell>buyback_category</TableCell>
            <TableCell>partner_id</TableCell>
            <TableCell>partner_email</TableCell>
            <TableCell>partner_shop</TableCell>
            <TableCell>item_id</TableCell>
            <TableCell>old_item_details</TableCell>
            <TableCell>imei</TableCell>
            <TableCell>gep_order</TableCell>
            <TableCell>base_discount</TableCell>
            <TableCell>partner_purchase_price</TableCell>
            <TableCell>delivery_date</TableCell>
            <TableCell>gc_amount_redeemed</TableCell>
            <TableCell>gc_redeem_time</TableCell>
            <TableCell>vc_eligible</TableCell>
            <TableCell>customer_declaration_physical_defect_present</TableCell>
            <TableCell>exchange_facilitation_fee</TableCell>
            <TableCell>delivery_status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            orderData?.map((data, index) => (
              <TableRow>
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
                <TableCell>{data?.order_timestamp}</TableCell>
                <TableCell>{data?.order_status}</TableCell>
                <TableCell>{data?.buyback_category}</TableCell>
                <TableCell>{data?.partner_id}</TableCell>
                <TableCell>{data?.partner_email}</TableCell>
                <TableCell>{data?.partner_shop}</TableCell>
                <TableCell>{data?.item_id}</TableCell>
                <TableCell>{data?.old_item_details}</TableCell>
                <TableCell>{data?.imei}</TableCell>
                <TableCell>{data?.base_discount}</TableCell>
                <TableCell>{data?.partner_purchase_price}</TableCell>
                <TableCell>
                  {data?.delivery_date != undefined
                    ? new Date(
                      data?.delivery_date
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>
                  {data?.gc_amount_redeemed != undefined
                    ? new Date(
                      data?.gc_amount_redeemed
                    ).toLocaleString('en-GB', {
                      hour12: true,
                    })
                    : ''}
                </TableCell>
                <TableCell>{data?.gc_redeem_time}</TableCell>
                <TableCell>{data?.vc_eligible}</TableCell>
                <TableCell>{data?.customer_declaration_physical_defect_present}</TableCell>
                <TableCell>{data?.delivery_fee}</TableCell>
                <TableCell>{data?.exchange_facilitation_fee}</TableCell>
                <TableCell>{data?.delivery_status}</TableCell>
              </TableRow>
            ))
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
            <TableCell>tracking_id</TableCell>
            <TableCell>order_id</TableCell>
            <TableCell>order_date</TableCell>
            <TableCell>item_id</TableCell>
            <TableCell>gep_order</TableCell>
            <TableCell>imei</TableCell>
            <TableCell>partner_purchase_price</TableCell>
            <TableCell>partner_shop</TableCell>
            <TableCell>buyback_category</TableCell>
            <TableCell>delivery_date</TableCell>
            <TableCell>uic_status</TableCell>
            <TableCell>bag_id</TableCell>
            <TableCell>stock_in_status</TableCell>
            <TableCell>stockin_date</TableCell>
            <TableCell>bag_close_date</TableCell>

            <TableCell sx={{ ml: 1 }}>uic_code</TableCell>
            <TableCell sx={{ ml: 1 }}>uic_created_at</TableCell>
            <TableCell sx={{ ml: 1 }}>uic_user</TableCell>

            <TableCell>download_time</TableCell>
            <TableCell>agent_name</TableCell>
            <TableCell>assign_to_agent</TableCell>

            <TableCell>tray_id</TableCell>
            <TableCell>tray_location</TableCell>
            <TableCell>tray_status</TableCell>
            <TableCell>tray_type</TableCell>
            <TableCell>tray_closed_by_bot</TableCell>
            <TableCell>bot_done_received</TableCell>
            <TableCell>tray_close_wh_date</TableCell>
            <TableCell>handover_sorting_date</TableCell>
            <TableCell>sorting_agent_name</TableCell>
            <TableCell>wht_tray</TableCell>
            <TableCell>wht_tray_assigned_date</TableCell>
            <TableCell>received_from_sorting</TableCell>
            <TableCell>closed_from_sorting</TableCell>
            <TableCell>agent_name_charging</TableCell>
            <TableCell>assign_to_agent_charging</TableCell>
            <TableCell>charging_in_date</TableCell>

            <TableCell>charging_done_date</TableCell>
            <TableCell>charging_done_received</TableCell>
            <TableCell>charging_done_close</TableCell>
            <TableCell>agent_name_bqc</TableCell>
            <TableCell>assign_to_agent_bqc</TableCell>
            <TableCell>bqc_out_date</TableCell>

            <TableCell>bqc_done_received</TableCell>
            <TableCell>bqc_done_close</TableCell>
            <TableCell>audit_user_name</TableCell>
            <TableCell>issued_to_audit</TableCell>

            <TableCell>audit_done_recieved</TableCell>
            <TableCell>audit_done_date</TableCell>
            <TableCell>audit_done_close</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            deliveryData?.map((data, index) =>
            (
              <TableRow >
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
                <TableCell
                  style={
                    data?.uic_status === 'printed'
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                  {data?.uic_status}
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

                <TableCell sx={{ ml: 1 }}>{data?.uic_code?.code}</TableCell>
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
                <TableCell>{data?.tray_closed_by_bot}</TableCell>
                <TableCell>{data?.bot_done_received}</TableCell>
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
                <TableCell>{data?.assign_to_agent_charging}</TableCell>
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
                <TableCell>{data?.assign_to_agent_bqc}</TableCell>
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
            ))
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
            sx={{ ml: 4, mb: 3, mt: 3 }}
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