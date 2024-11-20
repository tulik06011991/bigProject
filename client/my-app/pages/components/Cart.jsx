import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems); // Savatdagi mahsulotlar
  const dispatch = useDispatch(); // Dispatchni olish
  console.log(cartItems);

  // Savatdagi mahsulotlar bo'lsa, yoki bo'lmasa tekshirish
  if (!cartItems) {
    return <p className="text-center text-red-500">Error: Cart is not defined</p>;
  }

  const handleRemove = (product) => {
    dispatch(removeFromCart(product)); // Mahsulotni savatdan olib tashlash
  };

  const handleQuantityChange = (product, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id: product.id, quantity })); // Mahsulot miqdorini yangilash
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartItems.map((product) => (
            <div
              key={product.id} // Har bir mahsulot uchun noyob id
              className="border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative pb-2/3 overflow-hidden">
                <img
                  src={`http://localhost:4000/files/${product.imageUrl}`}
                  alt={product.title}
                  className="object-cover h-40 w-full rounded-md"
                />
              </div>

              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-4">Price: <span className="text-green-600 font-bold">${product.price}</span></p>
                
                <div className="flex items-center mb-4">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors mr-2"
                    onClick={() => handleQuantityChange(product, product.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{product.quantity}</span>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-colors ml-2"
                    onClick={() => handleQuantityChange(product, product.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full"
                  onClick={() => handleRemove(product)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
