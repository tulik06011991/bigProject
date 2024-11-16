import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Redirect uchun

export default function Login() {
  const [email, setEmail] = useState(""); // Foydalanuvchi emaili
  const [password, setPassword] = useState(""); // Foydalanuvchi paroli
  const [error, setError] = useState(""); // Xatolik
  const [loading, setLoading] = useState(false); // Loading holati
  const router = useRouter(); // Routerni ishlatish
  const [token, setToken] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Loadingni yoqish
    setError(""); // Oldingi xatoliklarni tozalash

    try {
      // Backendga login uchun so'rov yuborish
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });


      // Login muvaffaqiyatli bo'lsa, tokenni saqlash va foydalanuvchini yo'naltirish
      // Agar token obyekt bo'lsa, uni stringga aylantirish
localStorage.setItem('token', JSON.stringify(response.data.data.token));
// Foydalanuvchi tokenini saqlash (masalan, LocalStorage)
      setLoading(false); // Loadingni to'xtatish
      router.push("./Register"); // Dashboard sahifasiga yo'naltirish

    } catch (err) {
      setLoading(false); // Loadingni to'xtatish
      setError(err.response?.data?.message || "Something went wrong"); // Xatolikni ko'rsatish
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* Error xabarini ko'rsatish */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
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

          {/* Login tugmasi */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading} // Agar loading bo'lsa, tugmani o'chirish
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
}
