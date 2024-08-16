import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";

const OrderSummary = ({ orderSummary }) => {
  const userName = localStorage.getItem("firstName");
  const handleKhalti = async () => {
    console.log("khalti payment");

    const payload = {
      return_url: "http://localhost:5173/payment-success",
      website_url: "http://localhost:5173/",
      amount: parseInt(orderSummary.grandTotal) * 100,
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: userName,
        email: "example@gmail.com",
        phone: "9800000123",
      },
    };
    const response = await axios.post("http://localhost:5000/khalti-api");
    console.log(response);
    if (response) {
      window.location.href = `${response?.data?.data?.payment_url}`;
    }
  };
  return (
    <Box sx={{ width: "30%" }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant='h6'>Order Summary</Typography>
        </Toolbar>
        <Table
          sx={{
            width: "300px",
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>Sub total</Typography>
              </TableCell>
              <TableCell>
                <Typography>Rs. {orderSummary?.allProductSubTotal}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Discount</Typography>
              </TableCell>
              <TableCell>
                <Typography>Rs. {orderSummary?.discountAmount}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Grand total</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "bold" }}>
                  Rs. {orderSummary?.grandTotal}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant='contained'
          color='success'
          fullWidth
          sx={{ borderRadius: 0 }}
          onClick={handleKhalti}
        >
          proceed to checkout
        </Button>
      </TableContainer>
    </Box>
  );
};

export default OrderSummary;
