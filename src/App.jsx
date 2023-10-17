import { createContext, memo, useContext, useReducer, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import Nav from "./components/commonComponents/Navbar/Nav";
import Products from "./pages/Products page/Products.jsx";
import Login from "./auth/Login/Login";
import Sign from "./auth/SignUp/SignUp";
import { cartReducer, productReducer } from "./reducer/Reducer.jsx";
import toys from "./Assets/Product.json";
import Home from "./pages/Home page/Home";
import Footer from "./components/commonComponents/Footer/Footer";
import About from "./pages/About page/About";
import Cart from "./pages/Cart page/Cart";
import Details from "./pages/Details page/Details";
import Wishlist from "./pages/Cart page/Cart";
import Checkout from "./pages/Checkout page/Checkout";

const context = createContext();
function App() {
  // Dialog Box state
  const [open, setOpen] = useState({
    open: false,
    html: "",
    type: "",
    value: null,
  });
  // Snackbar State
  const [openSnack, setOpenSnack] = useState({
    open: false,
    html: "",
    severity: "success",
    time: "800",
  });
  // State for login
  const [logged, setLogged] = useState({});

  // State for Modal
  const [openModal, setOpenModal] = useState({ val: [], open: false });

  const [state, dispatch] = useReducer(cartReducer, {
    products: toys,
    cart: [],
    wishlist: [],
    totalDiscount: 0,
    total: 0,
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    search: "",
    byPrice: "",
    byRating: "",
    byAge: "",
  });

  const confirm = () => {
    if (open.type === "trash") {
      dispatch({
        type: "removeFromCart",
        payload: {
          id: open.value.id,
          discount: state.totalDiscount - 1,
          total: state.total - open.value.price,
        },
      });
      setOpen({ ...open, open: false });
      setOpenSnack({
        open: true,
        html: `${open.value.title} removed from cart !`,
      });
    }
    if (open.type === "empty") {
      dispatch({
        type: "clearCart",
      });
      setOpen({ ...open, open: false });
      setOpenSnack({ open: true, html: ` Your cart is emptied !!` });
    }
  };

  return (
    <context.Provider
      value={{
        state,
        dispatch,
        productState,
        productDispatch,
        open,
        setOpen,
        openSnack,
        setOpenSnack,
        logged,
        setLogged,
        openModal,
        setOpenModal,
      }}
    >
      <div className="App" color="var(--white)">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Sign />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="product/:ID" element={<Details />} />
            <Route path="products/product/:ID" element={<Details />} />
          </Routes>
          <Footer />
        </Router>

        {/* Dialog component from MUI */}
        <Dialog
          open={open.open}
          onClose={() => {
            setOpen({ ...open, open: false });
          }}
        >
          <DialogTitle> {open.html} </DialogTitle>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                setOpen({ ...open, open: false });
              }}
            >
              Cancel
            </Button>
            <Button onClick={confirm}>Ok</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar Component from MUI */}

        <Snackbar
          open={openSnack.open}
          autoHideDuration={Number(openSnack.time)}
          onClose={() => {
            setOpenSnack({ ...open, open: false });
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              setOpenSnack({ ...openSnack, open: false });
            }}
            severity={openSnack.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {openSnack.html}
          </Alert>
        </Snackbar>
      </div>
    </context.Provider>
  );
}

export default memo(App);

export const Context = () => {
  return useContext(context);
};
