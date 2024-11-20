import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.id === product.id);
      
      if (existingProduct) {
        // Agar mahsulot mavjud bo'lsa, uning miqdorini oshirish
        existingProduct.quantity += 1;
      } else {
        // Aks holda, yangi mahsulotni qo'shish
        state.items.push({ ...product, quantity: 1 });
      }
    },
    // Agar kerak bo'lsa, boshqa actionlar (masalan, removeFromCart) qo'shishingiz mumkin
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
