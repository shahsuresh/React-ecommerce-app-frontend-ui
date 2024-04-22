import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Stack } from "@mui/material";

const ProductCard = () => {
  return (
    <Card
      sx={{ maxWidth: "30%", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <CardMedia
        sx={{ height: 300 }}
        image="https://www.sceptre.com/image/cache/data/product_gallery/1423-X437BV-FSRD/1-750x522.jpg"
        title="Samsung"
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            Smart TV
          </Typography>

          <Chip label="Samsung" color="secondary" variant="outlined" />
        </Stack>

        <Typography>Price:$5500</Typography>

        <Typography variant="body2" color="text.secondary">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
          architecto eius eligendi cum explicabo sunt repellendus ab cumque
          voluptatem, labore deleniti, ad laboriosam nihil? Neque error enim
          labore atque modi...
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" fullWidth>
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
