import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePokemonStore = create(
  persist(
    (set) => ({
      savedPokemon: [],

      savePokemon: (pokemon) =>
        set((state) => {
          const alreadyAdded = state.savedPokemon.some(
            (p) => p.name === pokemon.name
          );
          if (alreadyAdded) return state;
          return { savedPokemon: [...state.savedPokemon, pokemon] };
        }),

      removePokemon: (name) =>
        set((state) => ({
          savedPokemon: state.savedPokemon.filter((p) => p.name !== name),
        })),

      updatePokemonPlace: (newOrder) => set(() => ({ savedPokemon: newOrder })),
    }),
    {
      name: 'my-pokemon-store',
    }
  )
);

export default usePokemonStore;
