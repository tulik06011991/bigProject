import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('Adding to cart:', action.payload); // Bu yerda yangi mahsulotni ko'rasiz
      const product = action.payload;
      const existingProduct = state.cartItems.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;  // Mahsulot miqdorini oshirish
      } else {
        state.cartItems.push({ ...product, quantity: 1 });  // Yangi mahsulot qo'shish
      }

      console.log('Updated cart items:', state.cartItems); // Cart items ni yangilangan holatda ko'rasiz
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cartItems.find(item => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
