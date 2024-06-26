import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Container,
} from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../utils/api_category";
import { getProducts } from "../../utils/api";


export default function Products() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  // load the categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(),
  });

  // load the products
  const { data: products = [] } = useQuery({
    queryKey: ["products", category, perPage, page],
    queryFn: () => getProducts(category, perPage, page),
  });

  return (
    <Container>
      <Header />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            marginLeft: "10px",
            marginTop: "10px",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Products
        </Typography>
        <Button
          variant="contained"
          sx={{
            marginLeft: "auto",
            marginRight: "10px",
            marginTop: "10px",
            backgroundColor: "#1BA930",
          }}
          onClick={() => {
            navigate("/add");
          }}
        >
          Add New
        </Button>
      </div>
      <FormControl
        sx={{ marginTop: "10px", width: "200px", marginLeft: "10px" }}
      >
        <InputLabel id="product-select-label">Product</InputLabel>
        <Select
          labelId="product-select-label"
          id="product-select"
          label="Product"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            // reset the page to 1
            setPage(1);
          }}
        >
          <MenuItem value="all">All</MenuItem>
          {categories.map((category) => {
            return (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product._id} item xs={12} md={6} lg={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
        {products.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center" sx={{ padding: "10px 0" }}>
              No items found.
            </Typography>
          </Grid>
        ) : null}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
          padding: "20px 0",
        }}
      >
        <Button
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <span>Page: {page}</span>
        <Button
          disabled={products.length === 0 ? true : false}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}
