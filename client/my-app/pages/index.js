import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cartSlice';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Redux dispatchni oling

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
    </div>
  );

  if (error) return <p className="text-red-500 text-center">Failed to load products: {error}</p>;

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="relative pb-2/3 overflow-hidden">
              <img src={`http://localhost:4000/files/${product.imageUrl}`} alt="Mahsulot rasm" />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h2>
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-green-600">${product.price}</span>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => dispatch(addToCart(product))} // Redux actionni chaqirish
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
