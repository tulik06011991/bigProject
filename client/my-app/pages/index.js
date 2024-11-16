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
        setProducts(response.data); 
         // Javobdan olingan mahsulotlarni saqlash
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);  // Xatolikni saqlash
      } finally {
        setLoading(false);  // So'rov tugagach, loading ni o'chirish
      }
    };

    fetchProducts();
  }, []);
  console.log(products)

  // Agar loading holatida bo'lsa
  if (loading) return <p>Loading products...</p>;

  // Agar xatolik bo'lsa
  if (error) return <p className="text-red-500">Failed to load products: {error}</p>;

  // Mahsulotlar ro'yxati
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src={product.imageUrl} alt={product.title} className="h-48 object-cover rounded-md mb-4" />
            <h2 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h2>
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-green-600">${product.price}</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
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
