export const fetchPokemon = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=6`
  );
  const data = await res.json();

  const detailedData = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );

  //   console.log(data);
  //   console.log(detailedData);

  return {
    data: detailedData,
    nextOffset: pageParam + 6,
    hasMore: data.next !== null,
  };
};
