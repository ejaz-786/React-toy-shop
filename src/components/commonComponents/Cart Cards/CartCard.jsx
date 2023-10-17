import { DeleteForever } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import { Context } from "../../../App";
import style from "./CartCard.module.css";

const CartCard = ({ val }) => {
  const {
    state: { total },
    dispatch,
    setOpen,
  } = Context();
  return (
    <div className={style.cartProductContainer}>
      <div className={style.cartProductDetails}>
        <img src={val.img} alt={val.title} />
        <h3> {val.title}</h3>
      </div>
      <div className={style.cartProductPrice}>
        <p style={{ fontWeight: "500" }}> Price: ₹ {val.price}</p>
        <p>Item Price: ₹ {val.price * val.qty}</p>
      </div>
      <div className={style.cartProductQuantity}>
        <div className={style.quantity}>
          <i
            className="fa-solid fa-circle-plus"
            onClick={() => {
              dispatch({
                type: "increaseQTY",
                payload: {
                  id: val.id,
                  qty: val.qty + 1,
                  total: total + val.price,
                },
              });
            }}
          />{" "}
          {val.qty}{" "}
          <i
            className="fa-solid fa-circle-minus"
            onClick={() => {
              dispatch({
                type: "decreaseQTY",
                payload: {
                  id: val.id,
                  qty: val.qty - 1,
                  total: val.qty === 1 ? total : total - val.price,
                },
              });
            }}
          />
        </div>
        <div className={style.deleteItem}>
          <Tooltip title="delete from cart" placement="left">
            <DeleteForever
              className={style.delete}
              onClick={() => {
                setOpen({
                  open: true,
                  html: "Are you sure delete this product from cart ?",
                  type: "trash",
                  value: val,
                });
              }}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
