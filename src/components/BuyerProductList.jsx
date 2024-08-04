import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import Loader from "./Loader";
import SearchIcon from "@mui/icons-material/Search";
import ProductFilterDialog from "./ProductFilterDialog";
import { useDispatch, useSelector } from "react-redux";
import { openErrorSnackbar } from "../store/slices/snackbarSlice";
import { clearFilter } from "../store/slices/productSlice";
import { debounce } from "lodash";

const BuyerProductList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { category, minPrice, maxPrice, isFilterApplied } = useSelector(
    (state) => state.product
  );
  const { isPending, data } = useQuery({
    queryKey: [
      "get-buyer-products",
      currentPage,
      searchText,
      category,
      minPrice,
      maxPrice,
    ],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: currentPage,
        limit: 3,
        searchText: searchText || null,
        category: category || null,
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 0,
      });
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error.response.data.message));
      console.log(error.res.message);
    },
  });

  const productList = data?.data?.productList;
  const totalPage = data?.data?.totalPage;

  //debouncer for holding api to hit for some time while searching product

  const updateSearchText = (text) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  //===========use of lodash package for debounce==============
  //==We have delayed this function to wait for user to type complete searched text

  const delayedUpdateSearchText = debounce(updateSearchText, 1000);

  //=============================================================

  if (isPending) {
    // return <CircularProgress />;
    return <Loader />;
  }
  return (
    <>
      <Stack direction='row' spacing='3' sx={{ marginTop: "1.2rem" }}>
        {isFilterApplied && (
          <Button
            style={{ marginRight: "5px" }}
            variant='contained'
            color='error'
            onClick={() => {
              dispatch(clearFilter());
            }}
          >
            Clear Filter
          </Button>
        )}
        <ProductFilterDialog />
        <FormControl variant='standard'>
          <OutlinedInput
            sx={{ marginLeft: "5px" }}
            defaultValue={searchText || ""}
            onChange={(event) => {
              delayedUpdateSearchText(event?.target?.value);
              // setCurrentPage(1);
            }}
            placeholder='Search products here...'
            startAdornment={
              <InputAdornment position='start' sx={{ color: "purple" }}>
                <SearchIcon sx={{ fontSize: "2rem" }} />
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          margin: "1rem 0",
        }}
      >
        {productList?.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
      <Pagination
        page={currentPage}
        count={totalPage}
        color='secondary'
        onChange={(_, value) => {
          setCurrentPage(value);
        }}
      />
    </>
  );
};

export default BuyerProductList;
