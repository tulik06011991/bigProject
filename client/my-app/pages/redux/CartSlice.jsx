// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Dastlabki holat
const initialState = {
  cartItems: [],  // Savatdagi mahsulotlar
};

// Slice yaratish
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Mahsulotni savatga qo'shish
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartItems.find(item => item.id === product.id);
      if (existingProduct) {
        // Agar mahsulot mavjud bo'lsa, uning miqdorini oshirish
        existingProduct.quantity += 1;
      } else {
        // Yangi mahsulotni qo'shish
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    
    
    // Mahsulotni savatdan olib tashlash
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    },
    // Mahsulot miqdorini o'zgartirish
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cartItems.find(item => item.id === id);
      if (product && quantity > 0) {
        product.quantity = quantity; // Miqdorni yangilash
      }
    },
    
    
    // Savatni tozalash
    clearCart: (state) => {
      state.cartItems = [];
    }
  },
});

// Actions va reducerlarni export qilish
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
