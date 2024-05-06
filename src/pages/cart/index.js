
import Header from "../../components/Header"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { getCart } from "../../utils/api_cart";
import { Button } from "@mui/material";
import { removeItemFromCart } from "../../utils/api_cart";
import { useSnackbar } from 'notistack';
import { Typography } from "@mui/material";

export default function Carts(props) {
    const { data: rows = [] } = useQuery({ queryKey: ['cart'], queryFn: () => getCart() });
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    
    const deleteCartMutation = useMutation({
        mutationFn: removeItemFromCart,
        onSuccess: () => {
          // display success message
          enqueueSnackbar("Product is Removed", {
            variant: "success",
          });
          queryClient.invalidateQueries({
            queryKey: ["cart"],
          });
        },
        onError: (error) => {
          // display error message
          enqueueSnackbar(error.response.data.message, {
            variant: "error",
          });
        },
    });

    const handleCartDelete = (id) => {
        const confirm = window.confirm(
          "Are you sure you want to delete this product?"
        );
        if (confirm) {
            // Call deleteCartMutation to remove the product from the cart
            deleteCartMutation.mutate(id);
        }
    }; 
    
    return (
        <>
        <Header />
           <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {rows.length === 0 ? (
            <TableRow>
                <TableCell colSpan={5}>
                    <Typography variant="body1">No Cart Added yet</Typography>
                 </TableCell>
            </TableRow>
            ) : (
            rows.map((row) => (
                <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="right">${row.price * row.quantity}</TableCell>
                    <TableCell align="right">
                        <Button variant="contained" style={{ backgroundColor: "red", color: "white" }} onClick={() => handleCartDelete(row._id)}>
                            Remove
                        </Button>
                    </TableCell>
                </TableRow>
                ))
            )}
            <TableRow>
                <TableCell colSpan={3} />
                <TableCell align="right">
                    <Typography variant="body1" fontWeight="bold">
                        ${rows.reduce((total, row) => total + (row.price * row.quantity), 0)}
                    </Typography>
                </TableCell>
            </TableRow>
            </TableBody>
            </Table>
            </TableContainer>
            <Button variant="contained" color="primary" style={{ position: "absolute",marginTop: "30px", right: "20px" }}>
                Checkout
            </Button>
        </>
    )
}