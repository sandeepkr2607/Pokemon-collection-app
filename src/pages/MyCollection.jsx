import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import PokemonCard from '../components/PokemonCard';
import usePokemonStore from '../store/usePokemonStore';

const SortablePokemonCard = ({ pokemon }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: pokemon.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <PokemonCard
        name={pokemon.name}
        types={pokemon.types}
        image={pokemon.image}
        stats={pokemon.stats}
      />
    </div>
  );
};

const MyCollection = () => {
  const { savedPokemon, updatePokemonPlace } = usePokemonStore();
  const [items, setItems] = useState(savedPokemon);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((p) => p.name === active.id);
      const newIndex = items.findIndex((p) => p.name === over.id);

      const newOrder = arrayMove(items, oldIndex, newIndex);
      setItems(newOrder);
      updatePokemonPlace(newOrder);
    }
  };

  return (
    <div className='bg-indigo-300 min-h-screen py-10 px-4'>
      <h1 className='text-white text-3xl font-bold text-center mb-6'>
        My Pokémon Collection
      </h1>

      {items.length === 0 ? (
        <p className='text-center text-white'>No Pokémon saved yet.</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((p) => p.name)}
            strategy={verticalListSortingStrategy}
          >
            <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center'>
              {items.map((pokemon) => (
                <SortablePokemonCard key={pokemon.name} pokemon={pokemon} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default MyCollection;
