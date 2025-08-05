import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Collection() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("collection") || "[]");
    setCollection(saved);
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(collection);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setCollection(items);
    localStorage.setItem("collection", JSON.stringify(items));
  };

  return (
    <div>
      <h1>My Collection</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="collection">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {collection.map((pokemon, index) => (
                <Draggable key={pokemon.name} draggableId={pokemon.name} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="collection-item"
                    >
                      <img src={pokemon.image} alt={pokemon.name} width="50" />
                      <span>{pokemon.name}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
