export const cartReducer = (state, action) => {
  switch (action.type) {
    case "addToCart":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload.val, qty: 1 }],
        totalDiscount: action.payload.discount,
        total: action.payload.total,
      };

    case "removeFromCart":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
        totalDiscount: action.payload.discount,
        total: action.payload.total,
      };

    case "addToWishlist":
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case "removeFromWishlist":
      return {
        ...state,
        wishlist: state.wishlist.filter((c) => c.id !== action.payload),
      };

    case "increaseQTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
        total: action.payload.total,
      };

    case "decreaseQTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id
            ? c.qty === 1
              ? (c.qty = 1)
              : (c.qty = action.payload.qty)
            : c.qty
        ),
        total: action.payload.total,
      };

    case "clearCart":
      return { ...state, cart: [], totalDiscount: 0, total: 0 };

    case "clearWishlist":
      return { ...state, wishlist: [] };
    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "byPrice":
      return { ...state, byPrice: action.payload };

    case "byRating":
      return { ...state, byRating: action.payload };

    case "byAge":
      return { ...state, byAge: action.payload };

    case "search":
      return { ...state, search: action.payload };

    case "clearFilters":
      return {
        search: "",
        byAge: "",
        byPrice: "",
        byRating: "",
      };

    default:
      return state;
  }
};
