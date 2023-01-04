import React, { useEffect, useState, useMemo } from "react";
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
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import jwt from "jsonwebtoken"
import { axiosWarehouseIn } from "../../../../../axios";
export default function DialogBox() {
  const navigate = useNavigate();
  const [trayData, setTrayData] = useState([]);
  const { trayId } = useParams();
  const [loading, setLoading] = useState(false);
  const [textDisable, setTextDisable] = useState(false);
  /**************************************************************************** */
  const [uic, setUic] = useState("");
  const [description, setDescription] = useState([]);
  const [refresh, setRefresh] = useState(false);
  /*********************************************************** */

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosWarehouseIn.post(
          "/getWhtTrayItem/" + trayId + "/" + "Send for charging"
        );
        if (response.status === 200) {
          setTrayData(response.data.data);
        } else {
          alert(response.data.message);
          navigate(-1);
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [refresh]);
 

  const handelUic = async (e) => {
    if (e.target.value.length === 11) {
      try {
        let obj = {
          uic: e.target.value,
          trayId: trayId,
        };
        setTextDisable(true);

        let res = await axiosWarehouseIn.post("/check-uic", obj);
        if (res?.status == 200) {
          addActualitem(res.data.data);
        } else {
          setTextDisable(false);
          setUic("");
          alert(res.data.message);
        }
      } catch (error) {
        alert(error);
      }
    }
  };
  /************************************************************************** */
  const addActualitem = async (obj) => {
    if (trayData.items.length < trayData?.actual_items?.length) {
      alert("All Items Scanned");
    } else {
      try {
        let objData = {
          trayId: trayId,
          item: obj,
        };
        setTextDisable(true);
        let res = await axiosWarehouseIn.post("/wht-add-actual-item", objData);
        if (res.status == 200) {
          setUic("");
          setTextDisable(false);
          setRefresh((refresh) => !refresh);
        }
      } catch (error) {
        alert(error);
      }
    }
  };
  /************************************************************************** */
  const handelIssue = async (e, sortId) => {
    try {
     if (trayData?.actual_items?.length == trayData?.items?.length) {
        setLoading(true);
        let obj = {
          trayId: trayId,
          description: description,
          sortId: trayData?.sort_id,
        };
        let res = await axiosWarehouseIn.post("/issue-to-agent-wht", obj);
        if (res.status == 200) {
          alert(res.data.message);
          if (trayData?.sort_id == "Send for BQC") {
            setLoading(false);
            navigate("/bqc-request");
          } else {
            setLoading(false);
            navigate("/wareshouse/wht/charging-request");
          }
        } else {
          alert(res.data.message);
        }
      } else {
        setLoading(false);
        alert("Please Verify Actual Data");
      }
    } catch (error) {
      alert(error);
    }
  };

  const tableExpected = useMemo(() => {
    return (
      <Paper sx={{ width: "95%", overflow: "hidden", m: 1 }}>
        <Box sx={{}}>
          <Box
            sx={{
              float: "left",
              ml: 2,
            }}
          >
            <h5>Expected</h5>
          </Box>
          <Box
            sx={{
              float: "right",
              mr: 2,
            }}
          >
            <Box sx={{}}>
              <h5>Total</h5>
              <p style={{ paddingLeft: "5px", fontSize: "22px" }}>
                {
                  trayData?.items?.filter(function (item) {
                    return item.status != "Duplicate";
                  }).length
                }
                /{trayData?.limit}
              </p>
            </Box>
          </Box>
        </Box>
        <TableContainer>
          <Table
            style={{ width: "100%" }}
            id="example"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell>S.NO</TableCell>
                <TableCell>UIC</TableCell>
                <TableCell>MUIC</TableCell>
                <TableCell>BOT Tray</TableCell>
                <TableCell>BOT Agent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trayData?.items?.map((data, index) => (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{data?.uic}</TableCell>
                  <TableCell>{data?.muic}</TableCell>
                  <TableCell>{data?.tray_id}</TableCell>
                  <TableCell>{data?.bot_agent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }, [trayData?.items]);
  const tableActual = useMemo(() => {
    return (
      <Paper sx={{ width: "98%", overflow: "hidden", m: 1 }}>
        <Box sx={{}}>
          <Box
            sx={{
              float: "left",
              ml: 2,
            }}
          >
            <h5>ACTUAL</h5>
            <TextField
              sx={{ mt: 1 }}
              id="outlined-password-input"
              type="text"
              disabled={textDisable}
              name="doorsteps_diagnostics"
              inputRef={(input) => input && input.focus()}
              label="Please Enter UIC"
              value={uic}
              onChange={(e) => {
                setUic(e.target.value);
                handelUic(e);
              }}
              inputProps={{
                style: {
                  width: "auto",
                },
              }}
            />
          </Box>
          <Box
            sx={{
              float: "right",
              mr: 2,
            }}
          >
            <Box sx={{}}>
              <h5>Total</h5>
              <p style={{ marginLeft: "5px", fontSize: "24px" }}>
                {
                  trayData.actual_items?.filter(function (item) {
                    return item.status != "Duplicate";
                  }).length
                }
                /{trayData?.limit}
              </p>
            </Box>
          </Box>
        </Box>
        <TableContainer>
          <Table
            style={{ width: "100%" }}
            id="example"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell>S.NO</TableCell>
                <TableCell>UIC</TableCell>
                <TableCell>MUIC</TableCell>
                <TableCell>BOT Tray</TableCell>
                <TableCell>BOT Agent</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {trayData?.actual_items?.map((data, index) => (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{data?.uic}</TableCell>
                  <TableCell>{data?.muic}</TableCell>
                  <TableCell>{data?.tray_id}</TableCell>
                  <TableCell>{data?.bot_agent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }, [trayData?.actual_items, textDisable,uic]);
  return (
    <>
      <Box
        sx={{
          mt: 1,
          height: 70,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            float: "left",
          }}
        >
          <h4 style={{ marginLeft: "13px" }}>TRAY ID - {trayId}</h4>
          <h4 style={{ marginLeft: "13px" }}>
            AGENT NAME - {trayData?.issued_user_name}
          </h4>
        </Box>
        <Box
          sx={{
            float: "right",
          }}
        >
          <h4 style={{ marginRight: "13px" }}>Brand -- {trayData?.brand}</h4>
          <h4 style={{ marginRight: "13px" }}>Model -- {trayData?.model}</h4>
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
      <div style={{ float: "right" }}>
        <Box sx={{ float: "right" }}>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            style={{ width: "400px" }}
            placeholder="Description"
          ></textarea>
          <Button
            sx={{ m: 3, mb: 9 }}
            variant="contained"
            disabled={loading == true  || description == "" ? true : false}
            style={{ backgroundColor: "green" }}
            onClick={(e) => {
              if (window.confirm("You Want to Issue?")) {
                handelIssue(e);
              }
            }}
          >
            Issue To Agent
          </Button>
        </Box>
      </div>
    </>
  );
}
