import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId)); // Mahsulotni savatdan o'chirish
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Savat</h2>
      {cartItems.length > 0 ? (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:4000/files/${item.imageUrl}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">Miqdor: {item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-lg font-semibold text-gray-800 mb-2">{item.price} so'm</p>
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                >
                  O'chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">Savat bo'sh</p>
      )}
    </div>
  );
};

export default Cart;
