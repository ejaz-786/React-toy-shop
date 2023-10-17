import React from "react";
import { Context } from "../../App";
import ProductCard from "../../components/commonComponents/Product Card/ProductCard";
import style from "./Wishlist.module.css";
import NoProductIMG from "../../Assets/noProduct.png";
import { useNavigate } from "react-router-dom";
import { Forward } from "@mui/icons-material";

const Wishlist = () => {
  const {
    state: { wishlist },
    dispatch,
    logged,
  } = Context();
  const navigate = useNavigate();

  return (
    <div className={style.wishlistContainer}>
      <h1>
        {" "}
        {logged.id > 0 ? `${logged.name}'s Wishlist ` : "Your Wishlist"}{" "}
      </h1>

      {wishlist.length === 0 ? (
        <div className={style.NoProduct}>
          {" "}
          <img src={NoProductIMG} alt="No Product found" />{" "}
          <h1> No Product in your WishList</h1>{" "}
          <button className={style.btn} onClick={() => navigate("/products")}>
            {" "}
            View Toys <Forward />{" "}
          </button>{" "}
        </div>
      ) : (
        <>
          <button
            className={style.btn}
            onClick={() => {
              dispatch({
                type: "clearWishlist",
              });
            }}
          >
            {" "}
            Empty Wishlist
          </button>
          <div className={style.WishList}>
            {wishlist.map((val) => (
              <ProductCard val={val} key={val.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
