import { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // Rasmi uchun o'zgaruvchi
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Faylni tanlashda o'zgarishni amalga oshiramiz
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image); // Faylni formaga qo'shamiz

    try {
      const response = await axios.post('http://localhost:3001/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Mahsulot muvaffaqiyatli qo\'shildi!');
      setName('');
      setDescription('');
      setPrice('');
      setImage(null); // Faylni tozalash
    } catch (error) {
      setMessage('Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Mahsulot Qo'shish</h1>

      {message && (
        <div className={`mb-4 p-4 text-center ${message.includes('muvaffaqiyatli') ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Mahsulot Nomi</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Mahsulot nomini kiriting"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Tavsifi</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Mahsulot tavsifini kiriting"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Narxi</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Mahsulot narxini kiriting"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Rasm Yuklash</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Yuklanmoqda...' : 'Mahsulotni Qo\'shish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
