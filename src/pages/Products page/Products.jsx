import { Search } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Context } from "../../App";
import ProductCard from "../../components/commonComponents/Product Card/ProductCard";
import style from "./Product.module.css";
import NoProductIMG from "../../Assets/noProduct.png";

const Products = () => {
  const {
    state: { products },
    productState: { search, byPrice, byRating, byAge },
    productDispatch,
  } = Context();

  // State for sorting option dialog box
  const [open, setOpen] = useState(false);

  const confirmed = () => {
    let sortedProducts = products.filter((a) => {
      return true;
    });

    if (search !== "") {
      sortedProducts = sortedProducts.filter((p) =>
        p.title.toLowerCase().trim().includes(search.toLowerCase().trim())
      );
    }
    if (byRating !== "")
      sortedProducts = sortedProducts.filter(
        (p) => p.rating === Number(byRating)
      );

    if (byPrice !== "") {
      switch (Number(byPrice)) {
        case 1:
          return (sortedProducts = sortedProducts.filter(
            (p) => p.price > 1 && p.price < 1000
          ));
        case 2:
          return (sortedProducts = sortedProducts.filter(
            (p) => p.price >= 1001 && p.price <= 2000
          ));
        case 3:
          return (sortedProducts = sortedProducts.filter(
            (p) => p.price >= 2001 && p.price <= 3000
          ));

        default:
          break;
      }
    }

    if (byAge !== "") {
      switch (Number(byAge)) {
        case 1:
          return (sortedProducts = sortedProducts.filter(
            (p) => p.minAge >= 1 && p.maxAge <= 1
          ));
        case 3:
          return (sortedProducts = sortedProducts.filter(
            (p) => p.minAge >= 18 && p.maxAge < 36
          ));
        case 5:
          return (sortedProducts = sortedProducts.filter(
            (p) => p.minAge >= 3 && p.maxAge < 5
          ));
        case 7:
          return (sortedProducts = sortedProducts.filter(
            (p) => p.minAge >= 5 && p.maxAge < 7
          ));
        case 9:
          return (sortedProducts = sortedProducts.filter(
            (p) => p.minAge >= 7 && p.maxAge < 9
          ));
        case 12:
          return (sortedProducts = sortedProducts.filter(
            (p) => p.minAge >= 9 && p.maxAge < 12
          ));
        case 13:
          return (sortedProducts = sortedProducts.filter((p) => p.minAge > 12));

        default:
          break;
      }
    }

    return sortedProducts;
  };

  return (
    <div className={style.productsContainer}>
      {/* Filter Section starts --------------------------> */}
      <div className={style.filter}>
        <h1> {confirmed().length} products </h1>

        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              {" "}
              <Search sx={{ color: "var(--black)" }} />{" "}
            </InputAdornment>
          }
          placeholder="Search products"
          style={{
            backgroundColor: "var(--white)",
            outline: "var(--black)",
            borderRadius: "1rem",
            border: "none",
            caretColor: "var(--black)",
            color: "var(--black)",
          }}
          size="small"
          margin="none"
          onChange={(e) => {
            productDispatch({
              type: "search",
              payload: e.target.value,
            });
          }}
          value={search}
        />

        <div className={style.btn}>
          <button onClick={() => setOpen(true)} className={style.button}>
            {" "}
            Filter{" "}
          </button>
          {(byAge !== "" ||
            byPrice !== "" ||
            byRating !== "" ||
            search !== "") && (
            <button
              onClick={() => {
                productDispatch({
                  type: "clearFilters",
                });
              }}
              className={style.button}
            >
              {" "}
              Clear Filter{" "}
            </button>
          )}
        </div>
        {/* Dialog for Filter ---------------------> */}
        <Dialog disableEscapeKeyDown open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Filters</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
                <Select
                  native
                  onChange={(e) => {
                    productDispatch({
                      type: "byAge",
                      payload: e.target.value,
                    });
                  }}
                  name="age"
                  input={<OutlinedInput label="Category" />}
                >
                  <option aria-label="None" value="" />
                  <option value={1}> 0 - 18 Months</option>
                  <option value={3}> 18 - 36 Months</option>
                  <option value={5}> 3 - 5 Years</option>
                  <option value={7}>5 - 7 Years</option>
                  <option value={9}>7 - 9 Years</option>
                  <option value={12}>9 - 12 Years</option>
                  <option value={13}>12+ Years</option>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Rating</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  name="rating"
                  onChange={(e) => {
                    productDispatch({
                      type: "byRating",
                      payload: e.target.value,
                    });
                  }}
                  input={<OutlinedInput label="Rating" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>
                  <MenuItem value={5}>Five</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Price</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  name="price"
                  onChange={(e) => {
                    productDispatch({
                      type: "byPrice",
                      payload: e.target.value,
                    });
                  }}
                  input={<OutlinedInput label="Price" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>₹ 1-1000</MenuItem>
                  <MenuItem value={2}>₹ 1001-2000</MenuItem>
                  <MenuItem value={3}>₹ 2001-3000</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Ok</Button>
          </DialogActions>
        </Dialog>
        {/* Dialog for Filter ---------------------> */}
      </div>
      {/* Filter Section Ends --------------------------> */}

      {/* Products Lists Starts -------------------------> */}

      <div className={style.producting}>
        {confirmed().length === 0 ? (
          <div className={style.NoProduct}>
            {" "}
            <img src={NoProductIMG} alt="No Product found" />{" "}
            <h1> No Result found</h1>
          </div>
        ) : (
          <div className={style.products}>
            {confirmed().map((val) => (
              <ProductCard val={val} key={val.id} />
            ))}
          </div>
        )}
      </div>

      {/* Products Lists Ends -------------------------> */}
    </div>
  );
};

export default Products;
