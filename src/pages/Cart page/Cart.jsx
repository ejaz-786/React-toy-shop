import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import EmptyCart from "../../Assets/EmptyCart.png";
import CartCard from "../../components/commonComponents/Cart Cards/CartCard";
import style from "./Cart.module.css";

const Cart = () => {
  const navigate = useNavigate();

  const {
    state: { cart, total, totalDiscount },
    setOpen,
    open,
    logged,
    setOpenSnack,
  } = Context();

  const checkout = () => {
    if (logged.id === undefined) {
      setOpenSnack({
        open: true,
        html: `You are not logged in! Please login first.`,
        severity: "error",
        time: "1500",
      });
    } else {
      navigate("/checkout");
    }
  };
  return (
    <>
      <div className={style.cartContainer}>
        <h1> Items in your cart - ({cart.length}) </h1>
        <div className={style.cartListContainer}>
          {cart.length === 0 ? (
            <div className={style.emptyCartContainer}>
              <img src={EmptyCart} alt="Empty Cart" />
              <h1> No products in Your Cart </h1>
              <Link to="/products" className={style.continueShopping}>
                <button>
                  Continue Shopping <i className="fa-solid fa-bag-shopping" />
                </button>
              </Link>
            </div>
          ) : (
            <div className={style.cartList}>
              {" "}
              {cart.map((val) => (
                <CartCard val={val} key={val.id} />
              ))}{" "}
            </div>
          )}
        </div>
        {cart.length !== 0 && (
          <div className={style.total}>
            <div>
              {" "}
              <button
                className={style.clear}
                onClick={() => {
                  setOpen({
                    ...open,
                    open: true,
                    html: "Are you sure to empty your cart ?",
                    type: "empty",
                  });
                }}
              >
                {" "}
                Empty Cart{" "}
              </button>
              <Link to="/products" className={style.continueShopping}>
                <button>
                  Continue Shopping <i className="fa-solid fa-bag-shopping" />
                </button>
              </Link>
            </div>
            <div>
              <h1> SubTotal: ₹{Number(total) + Number(totalDiscount)} </h1>
              <h1> Discount: ₹ {totalDiscount}</h1>
              <h1>Total: ₹{total}</h1>
              <button className={style.checkout} onClick={checkout}>
                {" "}
                Checkout{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
