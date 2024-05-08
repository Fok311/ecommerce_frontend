
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
    TextField,
    Container,
    Grid,
    Typography,
    Box,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter,
    Paper
} from "@mui/material";
import Header from "../../components/Header";
import { getCart } from "../../utils/api_cart";
import { addNewOrder } from "../../utils/api_orders";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckoutPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addNewOrderMutation = useMutation({
    mutationFn: addNewOrder,
    onSuccess: () => {
      // temporary redirect
      navigate("/orders")
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message,{
        variant: "error"
      })
    }
  });
    
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total = total + item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    // when user click the "Pay button", check if they have filled up the required fields and also if cart is not empty
    if ( name === '' || email === '' ) {
        enqueueSnackbar("Please fill up all the fields", {
          variant: 'error'
        });
    } else if ( !( cartItems && cartItems.length > 0 ) ) {
      enqueueSnackbar("Your cart is empty", {
        variant: 'error'
      });
    } else {
      // perform the checkout process
      addNewOrderMutation.mutate({
        customerName: name,
        customerEmail: email,
        products: cartItems,
        totalPrice: calculateTotal()
      })
    }
  };


  return (
    <Container>
      <Header />
          <Grid container spacing={2} sx={{
          flexDirection: {
            xs: "column-reverse",
            sm: "column-reverse",
            md: "row",
          },
        }}>
          <Grid item xs={12} md={7} style={{ paddingRight: '20px' }}>
              <Typography variant="h5" gutterBottom align="center" style={{ fontWeight: 'bold', marginTop: '20px' }}>
                Contact Information
              </Typography>
              <Typography variant="body1" style={{ marginTop: '10px' }}>
            Name
          </Typography>
          <TextField
            required
            placeholder="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <Typography>Email</Typography>
          <TextField
            required
            placeholder="email address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)} />
          <Button variant="contained" fullWidth style={{ marginTop: '20px' }} onClick={handleCheckout}>
          Pay ${calculateTotal()} now
          </Button>
        </Grid>
        {/* Second Column: Order Summary */}
        <Grid item xs={12} md={5}style={{ paddingLeft: '20px' }}>
            <Typography variant="h6" gutterBottom style={{ marginTop: '40px' }}>
              Your order summary
            </Typography>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                <Typography variant="body1">
                  {item.name}
                </Typography>
                <Typography variant="body1">
                ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px' }}>
              <Typography variant="h6">
                Total
              </Typography>
              <Typography variant="h6">
              ${calculateTotal()}
              </Typography>
            </div>
        </Grid>
      </Grid>
    </Container>
  );
}
