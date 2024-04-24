import { Box, CircularProgress } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";

const BuyerProductList = () => {
  const { isPending, data } = useQuery({
    queryKey: ["get-buyer-products"],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", { page: 1, limit: 6 });
    },
  });
  console.log(data);
  const productList = data?.data?.productList;
  if (isPending) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      {productList.map((item) => {
        return <ProductCard key={item._id} {...item} />;
      })}
    </Box>
  );
};

export default BuyerProductList;
