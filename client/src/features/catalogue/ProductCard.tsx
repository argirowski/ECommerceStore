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
import { useAddBasketItemMutation } from "../basket/basketApi";
import { currencyFormatter } from "../lib/utils";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [addItemToBasket, { isLoading }] = useAddBasketItemMutation();
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
            {currencyFormatter(product.price)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            disabled={isLoading}
            onClick={() => addItemToBasket({ product: product, quantity: 1 })}
          >
            Add to cart
          </Button>
          <Button component={Link} to={`/products/${product.id}`}>
            View Details
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default ProductCard;
