import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { fetchPokemon } from '../utils/fetchPokemon';
import PokemonList from '../components/PokemonList';

const Home = () => {
  const observerRef = useRef();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['pokemon'],
      queryFn: fetchPokemon,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextOffset : undefined,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className='bg-indigo-300 min-h-screen py-10 px-4'>
      <div className='max-w-6xl mx-auto'>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <PokemonList pages={data?.pages} />
        )}
      </div>

      <div ref={observerRef} className='h-12'></div>

      {isFetchingNextPage && (
        <p className='text-center mt-10 text-white font-medium animate-pulse'>
          Loading more Pokémon...
        </p>
      )}
    </div>
  );
};

export default Home;
