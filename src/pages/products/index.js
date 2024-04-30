import React from 'react';
import { Typography, Divider, Button, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Grid } from '@mui/material';
import Container from "@mui/material/Container";
import { getCategory } from '../../utils/api_category';
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { getProducts } from '../../utils/api';

export default function Products() {
    const [category, setCategory] = useState("all");

    const { data: categories= [] } = useQuery({ queryKey: ['category'], queryFn: getCategory })
    const { data: rows = [] } = useQuery({ queryKey: ['products', category], queryFn: () => getProducts(category) });

    return (
        <Container>
            <Typography variant="h6" component="div" sx={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', fontSize: '40px' }}>
                Welcome to My Store
            </Typography>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ marginLeft: '10px', marginTop: '10px', fontWeight: 'bold', fontSize: '24px' }}>Products</Typography>
                <Button variant="contained" sx={{ marginLeft: 'auto', marginRight: '10px', marginTop: '10px', backgroundColor: '#1BA930'  }}>Add New</Button>
            </div>
            <FormControl sx={{ marginTop: '10px', width: '200px', marginLeft: '10px' }}>
                <InputLabel id="product-select-label">Product</InputLabel>
                <Select
                    labelId="product-select-label"
                    id="product-select"
                    label="Product"
                    value={category}
                    onChange={(event) => {
                        setCategory(event.target.value)
                    }}
                >
                <MenuItem value="all">All</MenuItem>
              {categories.map(category => {
                return <MenuItem key={category} value={category}>{category}</MenuItem>
              })}
                </Select>
            </FormControl>
            <Grid container spacing={3}>
                {rows.map(row => (
                    <Grid item key={row._id} xs={12} sm={6} md={4}>
                        <Card sx={{ marginTop: '10px'}}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {row.name}
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                    <div>
                                        <Typography variant="body1" component="div" sx={{
                                            backgroundColor: '#C3FDB8', borderRadius: 3,
                                            display: 'inline-block', padding: '1px 20px', color: '#41A317'}}>
                                            {row.price}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body1" component="div" sx={{
                                            backgroundColor: '#F8B88B', borderRadius: 3,
                                            display: 'inline-block', padding: '1px 20px', color: '#F87431'}}>
                                            {row.category}
                                        </Typography>
                                    </div>
                                    
                                </div> 
                                <Button variant="contained" fullWidth color="primary" sx={{ marginTop: '20px' }}>Add to Cart</Button>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                    <div>
                                    <Button variant="contained" color="info" sx={{ borderRadius: 5 }}>Edit</Button>
                                    </div>
                                    <div>
                                    <Button variant="contained" color="error" sx={{ borderRadius: 5 }}>Delete</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
