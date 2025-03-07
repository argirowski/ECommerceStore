import React, { Fragment } from "react";
import { Product } from "../../app/models/product";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Fragment>
      <Card
        elevation={3}
        sx={{
          width: 280,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          sx={{ height: 240, backgroundSize: "cover" }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            sx={{ textTransform: "uppercase" }}
            variant="subtitle2"
          >
            {product.name}
          </Typography>
          <Typography variant="h6" color="secondary.main">
            $ {(product.price / 100).toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button>Add to cart</Button>
          <Button component={Link} to={`/products/${product.id}`}>
            View Details
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default ProductCard;
