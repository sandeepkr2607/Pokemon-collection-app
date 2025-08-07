import { FaPlus, FaTimes } from 'react-icons/fa';
import usePokemonStore from '../store/usePokemonStore';

const PokemonCard = ({ name, types = [], image, stats = [] }) => {
  const { savedPokemon, savePokemon, removePokemon } = usePokemonStore();
  const isSaved = savedPokemon.some((p) => p.name === name);

  const handleToggleSave = () => {
    if (isSaved) {
      removePokemon(name);
    } else {
      savePokemon({ name, types, image, stats });
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'fire':
        return 'bg-red-400 text-white';
      case 'flying':
        return 'bg-gray-300 text-gray-800';
      case 'water':
        return 'bg-blue-300 text-white';
      case 'grass':
        return 'bg-green-300 text-white';
      // Add more as needed
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className='relative w-72 p-4 rounded-xl shadow-md bg-white border-t-4 border-t-pink-500'>
      {/* Toggle Save Button */}
      <button
        onClick={handleToggleSave}
        className={`absolute top-3 right-3 p-2 rounded-full ${
          isSaved ? 'bg-red-500' : 'bg-green-500'
        } text-white text-xs`}
      >
        {isSaved ? <FaTimes /> : <FaPlus />}
      </button>

      {/* Image with Pink Circle */}
      <div className='w-24 h-24 mx-auto rounded-full bg-gradient-to-b from-pink-400 to-pink-300 flex items-center justify-center mb-4'>
        <img src={image} alt={name} className='w-14 h-14 object-contain' />
      </div>

      {/* Name */}
      <h2 className='text-center text-xl font-bold capitalize mb-2'>{name}</h2>

      {/* Types */}
      <div className='flex justify-center gap-2 mb-4'>
        {types.map((type) => (
          <span
            key={type}
            className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getTypeColor(
              type
            )}`}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className='flex justify-between px-2 text-sm font-semibold text-gray-700'>
        <div className='text-center'>
          <div className='text-blue-600'>{stats[0]?.base_stat || '??'}</div>
          <div className='text-gray-500 text-xs'>HP</div>
        </div>
        <div className='text-center'>
          <div className='text-blue-600'>{stats[1]?.base_stat || '??'}</div>
          <div className='text-gray-500 text-xs'>Attack</div>
        </div>
        <div className='text-center'>
          <div className='text-blue-600'>{stats[2]?.base_stat || '??'}</div>
          <div className='text-gray-500 text-xs'>Defense</div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
