import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800">
      <div className="flex items-center">
        <Link href="/" className="text-white text-xl font-bold">Hunting Coder
        </Link>
      </div>
      <div className="hidden md:flex">
        <Link href="/" className="text-gray-300 mx-4">Home
        </Link>
        <Link href="/about" className="text-gray-300 mx-4">About
        </Link>
        <Link href="/contact" className="text-gray-300 mx-4">Contact
        </Link>
      </div>
      <div className="md:hidden">
        {/* Add your mobile menu button here */}
      </div>
    </nav>
  );
};

export default Navbar;