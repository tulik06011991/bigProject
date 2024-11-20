import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Cartda saqlanadigan mahsulotlar
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      // Mahsulotni tekshirib, agar mavjud bo'lsa miqdorini oshiradi
      state.cartItems.push({ ...product, quantity: 1 });

      console.log('Updated cart items:', state.cartItems); // Cart items yangilanganini ko'rasiz
    },
    removeFromCart: (state, action) => {
      // Faqat bitta mahsulotni id orqali olib tashlash
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      // Mahsulotning miqdorini yangilash
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
