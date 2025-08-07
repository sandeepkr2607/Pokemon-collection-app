import PokemonCard from './PokemonCard';

const PokemonList = ({ pages }) => {
  console.log(pages);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center'>
      {pages?.map((page) =>
        page.data.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            types={pokemon.types.map((t) => t.type.name)}
            image={pokemon.sprites.front_default}
            stats={pokemon.stats}
          />
        ))
      )}
    </div>
  );
};

export default PokemonList;
