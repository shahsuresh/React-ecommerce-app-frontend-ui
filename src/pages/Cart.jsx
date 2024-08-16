import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import KeepShopping from "../components/KeepShopping";
import $axios from "../lib/axios/axios.instance";
import CartItemTable from "../components/CartItemTable";
import OrderSummary from "../components/OrderSummary";

const Cart = () => {
  // api hit to get cart items
  const { isPending, data } = useQuery({
    queryKey: ["get-cart-item-list"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  });

  const cartData = data?.data?.cartData;
  const orderSummary = data?.data?.orderSummary;

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ marginTop: "2.2rem" }}>
      {cartData?.length === 0 ? (
        <KeepShopping />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            width: "100%",
          }}
        >
          <CartItemTable cartData={cartData} />
          <OrderSummary orderSummary={orderSummary} />
        </Box>
      )}
    </Box>
  );
};

export default Cart;
