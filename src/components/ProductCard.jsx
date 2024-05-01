import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Chip, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fallbackImage } from "../constants/general.constants";

const ProductCard = (props) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "400px",
       
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        marginTop: "2rem",
        borderRadius:"10px",
        marginBottom:"2rem",
      }}
    >
      <CardMedia
        sx={{
          height: "20%",
          width: "100%",
          cursor: "pointer",
          padding: "0 0 0.5em 0",
          objectFit:"contain",
          
        }}
        
        component="img"
        image={props?.image || fallbackImage}
        title= {props.name}
        onClick={() => {
          navigate(`/product-detail/${props._id}`);
        }}
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>

          <Chip label={props.brand} color="secondary" variant="outlined" />
        </Stack>

        <Typography>Rs.{props.price}</Typography>

        <Typography variant="body2" color="text.secondary">
          {props.description}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => {
            navigate(`/product-detail/${props._id}`);
          }}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
