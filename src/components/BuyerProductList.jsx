import { Box, CircularProgress, FormControl, InputAdornment, OutlinedInput, Pagination, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import Loader from "./Loader";
import SearchIcon from '@mui/icons-material/Search';

const BuyerProductList = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { isPending, data } = useQuery({
    queryKey: ["get-buyer-products",currentPage , searchText],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", { page: currentPage, limit: 3 , searchText:searchText || null});
    },
  });

  const productList = data?.data?.productList;
  const totalPage = data?.data?.totalPage;
  if (isPending) {
    // return <CircularProgress />;
    return <Loader/>
  }
  return (
    <>
<FormControl variant="standard" sx={{marginTop:"1.2rem"}}>
          <OutlinedInput
            defaultValue={searchText || ''}
            onChange={(event) => {
              setSearchText(event?.target?.value);
              setCurrentPage(1);
            }}
            placeholder="Search products here..."
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'purple' }}>
                <SearchIcon sx={{ fontSize: '2rem' }} />
              </InputAdornment>
            }
          />
        </FormControl>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
        margin:"1rem 0"
       
      }}
    >
      {productList.map((item) => {
        return <ProductCard key={item._id} {...item} />;
      })}
    </Box>
    <Pagination
    page={currentPage}
    count={totalPage}
    color="secondary"
    
    onChange={(_, value) => {
      setCurrentPage(value);
    }}
  />
    </>
  );
};

export default BuyerProductList;
