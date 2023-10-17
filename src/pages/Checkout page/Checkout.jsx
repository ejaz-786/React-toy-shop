import React from "react";
import { Context } from "../../App";
import style from "./Checkout.module.css";

const Checkout = () => {
  const {
    state: { cart, totalDiscount, total },
    logged,
  } = Context();
  return (
    <div className={style.checkoutContainer}>
      <h1>{` Congrats ${logged.name}, You have got ₹${totalDiscount} discount.`}</h1>
      <h1> {` You have ordered ${cart.length} Toys worth ₹${total}.`}</h1>
    </div>
  );
};

export default Checkout;
