import { useState, useEffect } from 'react';
import axios from 'axios';  // Axios kutubxonasini import qilamiz

const ProductsList = () => {
  const [products, setProducts] = useState([]);  // Mahsulotlarni saqlash
  const [loading, setLoading] = useState(true);  // Loading holati
  const [error, setError] = useState(null);      // Xatolik holati

  // Mahsulotlarni fetch qilish
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');  // Axios bilan so'rov yuborish
        setProducts(response.data);  // Javobdan olingan mahsulotlarni saqlash
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);  // Xatolikni saqlash
      } finally {
        setLoading(false);  // So'rov tugagach, loading ni o'chirish
      }
    };

    fetchProducts();
  }, []);

  // Agar loading holatida bo'lsa
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
    </div>
  );

  // Agar xatolik bo'lsa
  if (error) return <p className="text-red-500 text-center">Failed to load products: {error}</p>;

  // Agar mahsulotlar topilmasa
  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  // Mahsulotlar ro'yxati
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {/* Rasmni o'zgartirish */}
            <div className="relative pb-2/3 overflow-hidden">
              <img 
                src={`http://localhost:4000/files/${product.imageUrl}`} 
                alt={product.title} 
                className="absolute inset-0 w-full h-full object-cover rounded-md"
              />
            </div>

            <h2 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h2>
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">{product.description}</p>
            
            {/* Narx va tugma */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-green-600">${product.price}</span>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => alert('Added to cart!')}
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
