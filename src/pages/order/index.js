import { useState } from "react";
import Header from "../../components/Header";
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
    Paper,
    MenuItem,
    Select
} from "@mui/material";
import { getOrders, updateOrder, deleteOrder } from "../../utils/api_orders";
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { useSnackbar } from 'notistack';



export default function Order() {
    const { data: orders = [] } = useQuery({ queryKey: ['orders'], queryFn: () => getOrders() });
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();


    const updateOrderMutation = useMutation({
        mutationFn: updateOrder, // Use your API function to update the order status
        onSuccess: () => {
            enqueueSnackbar("Order status updated", {
                variant: "success",
            });
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },
        onError: (error) => {
            enqueueSnackbar(error.response.data.message, {
                variant: "error",
            });
        },
    });

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderMutation.mutateAsync({
                id: orderId,
                status: newStatus
            });
        } catch (error) {
            console.error("Error updating order status:", error);
            throw error;
        }
    };

    const deleteOrderMutation = useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
          // display success message
          enqueueSnackbar("Order is Removed", {
            variant: "success",
          });
          queryClient.invalidateQueries({
            queryKey: ["orders"],
          });
        },
        onError: (error) => {
          // display error message
          enqueueSnackbar(error.response.data.message, {
            variant: "error",
          });
        },
    });

    const handleOrderDelete = (id) => {
        const confirm = window.confirm(
          "Are you sure you want to delete this order?"
        );
        if (confirm) {
            // Call deleteCartMutation to remove the product from the cart
            deleteOrderMutation.mutate(id);
        }
    }; 


    return (
        <>
            <Header />
            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell >Total Amount</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="right">Payment Date</TableCell>
                    <TableCell align="right">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
        {orders.length === 0 ? (
            <TableRow>
                <TableCell colSpan={5}>
                    <Typography variant="body1">No Orders yet</Typography>
                 </TableCell>
            </TableRow>
            ) : (
                orders.map((order) => (
                <TableRow
                    key={order._id}
                >
                    <TableCell>
                        {order.customerName}
                        <br />
                        {order.customerEmail}
                    </TableCell>
                    <TableCell>
                        {order.products.map(product => (
                            <div key={product._id}>{product.name}</div>
                        ))}
                    </TableCell>
                    <TableCell>${order.totalPrice}</TableCell>
                    <TableCell align="center">
                    <Select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        disabled={order.status === "pending"}
                      >

                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="paid">paid</MenuItem>
                        <MenuItem value="failed">failed</MenuItem>
                        <MenuItem value="comeplete">complete</MenuItem>
                            </Select>
                    </TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">
                    <Button 
                        variant="contained" 
                        style={{ 
                            backgroundColor: "red", 
                            color: "white", 
                            display: order.status === "pending" ? "" : "none" // Adjusted this line
                        }} 
                        onClick={() => handleOrderDelete(order._id)} 
                        disabled={order.status === "pending"}
                    >
                        Remove
                    </Button>
                    </TableCell>
                </TableRow>
                ))
            )}
            </TableBody>
            </Table>
            </TableContainer>
        </>
        
    )
}