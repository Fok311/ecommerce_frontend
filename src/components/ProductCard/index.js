import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography, Button, Card, CardContent, Box } from "@mui/material";
import { deleteProduct } from "../../utils/api";
import { useSnackbar } from 'notistack';
import { addToCart } from "../../utils/api_cart";

export default function ProductCard(props) {
  const { product } = props;
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
          // display success message
          enqueueSnackbar("Product is deleted", {
            variant: "success",
          });
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
        },
        onError: (error) => {
          // display error message
          enqueueSnackbar(error.response.data.message, {
            variant: "error",
          });
        },
    });
    
    const addToCartMutation = useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
          // display success message
          enqueueSnackbar("Product is Successfully Added", {
            variant: "success",
          });
          queryClient.invalidateQueries({
            queryKey: ["carts"],
          });
        },
        onError: (error) => {
          // display error message
          enqueueSnackbar(error.response.data.message, {
            variant: "error",
          });
        },
    });
    
    const handleAddToCart = (event) => {
        event.preventDefault();
        // Call the addToCartMutation to add the product to the cart
        addToCartMutation.mutate(product);
    };
    
      const handleProductDelete = (event) => {
          event.preventDefault();
          const confirm = window.confirm(
            "Are you sure you want to delete this product?"
          );
          if (confirm) {
            deleteProductMutation.mutate(product._id);
          }
      }; 

  return (
    <Card>
      <CardContent>
        <Typography fontWeight={"bold"}>{product.name}</Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <Typography
            variant="p"
            style={{ backgroundColor: "#EBFBEE", color: "#6ACF7E" }}
          >
            {product.price}
          </Typography>
          <Typography
            variant="p"
            style={{ backgroundColor: "#FFF4E6", color: "#FD882B" }}
          >
            {product.category}
          </Typography>
        </Box>
              <Button fullWidth variant="contained" color="primary" onClick={handleAddToCart}>
          Add To Cart
        </Button>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <Button
            variant="contained"
            style={{ borderRadius: "17px" }}
            color="primary"
            onClick={() => {
              navigate("/products/" + product._id);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            style={{ borderRadius: "17px" }}
            color="error"
            onClick={handleProductDelete}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
