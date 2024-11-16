import { useState } from "react";
import Link from "next/link";
import axios from "axios"; // axios kutubxonasini import qilish
import { useRouter } from "next/router"; // Next.js router kutubxonasini import qilish

export default function Register() {
  const [name, setName] = useState(""); // Foydalanuvchi ismi
  const [email, setEmail] = useState(""); // Foydalanuvchi emaili
  const [password, setPassword] = useState(""); // Foydalanuvchi paroli
  const [confirmPassword, setConfirmPassword] = useState(""); // Parolni tasdiqlash
  const [error, setError] = useState(""); // Xatolik
  const [success, setSuccess] = useState(""); // Muvaffaqiyat

  const router = useRouter(); // Router hookini ishlatish

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Ro'yxatdan o'tish uchun backendga so'rov yuborish
    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        name,  // Foydalanuvchi ismi
        email, // Foydalanuvchi emaili
        password, // Foydalanuvchi paroli
      });

      // Agar so'rov muvaffaqiyatli bo'lsa:
      setSuccess(response.data.message);
      setError(""); // Xatolikni tozalash

      // Muvaffaqiyatli ro'yxatdan o'tgandan so'ng login sahifasiga yo'naltirish
      setTimeout(() => {
        router.push("./Login"); // 2 soniya kutib, login sahifasiga yo'naltiradi
      }, 2000);
    } catch (err) {
      // Agar so'rovda xatolik bo'lsa:
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

        {/* Error yoki success xabarlari */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* Ism maydoni */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email maydoni */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Parol maydoni */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Parolni tasdiqlash maydoni */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}
