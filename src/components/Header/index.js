import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{
          textAlign: "center",
          marginTop: "20px",
          fontWeight: "bold",
          fontSize: "40px",
        }}
      >
        {location.pathname === "/cart" ? "Cart" : "Welcome to My Store"}
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", marginBottom:"20px" }}>
        <Button variant="contained" color="primary" sx={{ margin: "0 10px" }} component={Link} to="/">
          Home
        </Button>
        <Button variant="contained" color="primary" sx={{ margin: "0 10px" }} component={Link} to="/cart">
          Cart
        </Button>
      </div>
      <Divider />
    </>
  );
}