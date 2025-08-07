import { Link, useLocation } from 'react-router-dom';
import usePokemonStore from '../store/usePokemonStore';
import { FaSearch, FaBookOpen } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const savedPokemon = usePokemonStore((state) => state.savedPokemon);

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-[#6B46C1] text-white'
      : 'bg-[#3B82F6] text-white';

  const count = savedPokemon.length;

  return (
    <header className='w-full sticky top-0 z-50 bg-white py-6 shadow-md'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>
          🔥 <span className='text-gray-900'>Pokemon Collection App</span>
        </h1>
        <p className='text-sm text-gray-600 mt-1'>
          Discover, collect, and organize your favorite Pokemon!
        </p>

        <div className='mt-4 space-x-4'>
          <Link
            to='/'
            className={`px-4 py-2 inline-flex items-center gap-2 rounded-full font-medium border  transition-colors duration-200 ${isActive(
              '/'
            )}`}
          >
            <FaSearch />
            Discover Pokemon
          </Link>

          <Link
            to='/my-collection'
            className={`px-4 py-2 inline-flex items-center gap-2 rounded-full font-medium border  transition-colors duration-200 ${isActive(
              '/my-collection'
            )}`}
          >
            <FaBookOpen />
            My Collection {count > 0 && `(${count})`}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
