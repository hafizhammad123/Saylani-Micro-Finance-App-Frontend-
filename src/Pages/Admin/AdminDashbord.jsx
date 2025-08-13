import React, { useState, useEffect } from 'react'
import AdminLayout from '../../Components/AdminLayout/AdminLayout'
import axios from 'axios'
import { BASE_URL } from '../../../Utils'
import Cookies from 'js-cookie'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from 'react-router-dom'

const AdminDashbord = () => {
  const [loanData, setLoanData] = useState([])

  let navigate = useNavigate()

  let dataGet = async () => {
    try {
      let result = await axios.get(`${BASE_URL}/request/getloanRequets`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      })

      console.log(result.data)
      setLoanData(result.data.result || [])
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message)
      } else {
        alert(error.message)
      }
    }
  }

  useEffect(() => {
    dataGet();
  }, []);

  return (
    <AdminLayout>
      <TableContainer  component={Paper} sx={{borderRadius: 2, boxShadow: 3 }}>
        <Typography
          variant="h6"
          sx={{
            p: 2,
            backgroundColor: "#0D6EFD",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Loan Requests
        </Typography>
        <Table>
          <TableHead sx={{ backgroundColor: "#E9F1FF" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>CNIC</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Loan Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loanData.length > 0 ? (
              loanData.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell>{row.userInfo?.cnic}</TableCell>
                  <TableCell>{row.userInfo?.name}</TableCell>
                  <TableCell>{row.estimate?.initAmt}</TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#28a745",
                        "&:hover": { backgroundColor: "#218838" },
                      }}
                      onClick={() => navigate(`/admin/${row._id}`)}
                    >
                      View Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center" }}>
                  No loan requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  )
}

export default AdminDashbord
