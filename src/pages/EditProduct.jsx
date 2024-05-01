import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productCategories } from "../constants/general.constants";
import $axios from "../lib/axios/axios.instance";
import addProductValidationSchema from "../validationSchema/add.product.validation.schema";

const EditProduct = () => {
  let productDetail;
  const params = useParams();

  const productId = params?.id;
  const navigate = useNavigate();

  //?=========get product information in form field when page load =======
  const { isPending, data } = useQuery({
    queryKey: ["edit-product-by-id"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${productId}`);
    },
  });

  productDetail = data?.data?.productDetails;
  // console.log(productDetail);

  
  //?=====update product details on button click======

  const { isPending:editProductPending, mutate } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (values) => {
      // console.log(values)
      return await $axios.put(`/product/update/${productId}`, values);
    },
    onSuccess: () => {
      navigate(`/product-detail/${productId}`);
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box sx={{marginTop:"2rem"}}>
      {editProductPending && <LinearProgress color="success" />}
        <Formik
        enableReinitialize
          initialValues={{
            image: productDetail?.image || null,
            name: productDetail?.name || "",
            brand: productDetail.brand || "",
            price: productDetail.price || 0,
            availableQuantity: productDetail.availableQuantity || 1,
            freeShipping: productDetail.freeShipping || false,
            category: productDetail.category || "",
            description: productDetail.description || "",
          }}
          validationSchema={addProductValidationSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "1rem",
                gap: "1rem",
                width: "450px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Typography variant="h5">Edit Product</Typography>

              <FormControl fullWidth>
                <TextField
                  label="Name"
                  {...formik.getFieldProps("name")}
                  required
                />

                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText error>{formik.errors.name}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Brand"
                  {...formik.getFieldProps("brand")}
                  required
                />

                {formik.touched.brand && formik.errors.brand ? (
                  <FormHelperText error>{formik.errors.brand}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Price"
                  {...formik.getFieldProps("price")}
                  type="number"
                  required
                />

                {formik.touched.price && formik.errors.price ? (
                  <FormHelperText error>{formik.errors.price}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Quantity"
                  {...formik.getFieldProps("availableQuantity")}
                  type="number"
                  required
                />

                {formik.touched.availableQuantity &&
                formik.errors.availableQuantity ? (
                  <FormHelperText error>
                    {formik.errors.availableQuantity}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.freeShipping}
                    onChange={(event, value) => {
                      formik.setFieldValue("freeShipping", value);
                    }}
                  />
                }
                label="Free Shipping"
              />
              {console.log(formik.values)}
            </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select label="Category" {...formik.getFieldProps("category")}>
                  {productCategories.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item.toUpperCase()}
                      </MenuItem>
                    );
                  })}
                </Select>

                {formik.touched.category && formik.errors.category ? (
                  <FormHelperText error>
                    {formik.errors.category}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  required
                  multiline
                  rows={7}
                  label="Description"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
                // onClick={(values)=>{mutate(values)}}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default EditProduct;
