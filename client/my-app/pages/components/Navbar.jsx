// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">MySite</div>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link href="/components/Register" className="text-gray-300 hover:text-white">Register</Link>
          <Link href="/components/Login" className="text-gray-300 hover:text-white">Login</Link>
           <Link href="/components/Products" className="text-gray-300 hover:text-white">Mahsulot qo'shish</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
