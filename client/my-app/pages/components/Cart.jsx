// src/Cart.js
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/CartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems); // Savatdagi mahsulotlar
  const dispatch = useDispatch(); // Dispatchni olish

  const handleRemove = (product) => {
    dispatch(removeFromCart(product)); // Mahsulotni savatdan olib tashlash
  };

  const handleQuantityChange = (product, quantity) => {
    dispatch(updateQuantity({ id: product.id, quantity })); // Mahsulot miqdorini yangilash
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((product) => (
            <li key={product.id}>
              <div>
                <h2>{product.title}</h2>
                <p>Price: ${product.price}</p>
                <p>Quantity: 
                  <button onClick={() => handleQuantityChange(product, product.quantity - 1)}>-</button>
                  {product.quantity}
                  <button onClick={() => handleQuantityChange(product, product.quantity + 1)}>+</button>
                </p>
                <button onClick={() => handleRemove(product)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
