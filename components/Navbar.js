import Link from 'next/link';

const Navbar = () => {
  return (
      <div className="flex items-center justify-between sm:px-12 px-2 md:px-24 h-16">
        <Link href="/" className="text-white text-lg font-bold ">
          Roj Code
        </Link>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
          Sign Up
        </button>
      </div>
  );
};

export default Navbar;