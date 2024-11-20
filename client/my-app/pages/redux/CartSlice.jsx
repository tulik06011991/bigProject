import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Cartda saqlanadigan mahsulotlar
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('Adding to cart:', action.payload); // Bu yerda yangi mahsulotni ko'rasiz
      const product = action.payload;
      // cartItems ichida id bo'yicha mavjud bo'lgan mahsulotni tekshirish
      const existingProduct = state.cartItems.find(item => item.id === product.id);

      if (existingProduct) {
        // Agar mahsulot mavjud bo'lsa, miqdorini oshirish
        existingProduct.quantity += 1;
      } else {
        // Yangi mahsulot qo'shish
        state.cartItems.push({ ...product, quantity: 1 });
      }

      console.log('Updated cart items:', state.cartItems); // Cart items yangilanganini ko'rasiz
    },
    removeFromCart: (state, action) => {
      // Mahsulotni cartdan olib tashlash
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
