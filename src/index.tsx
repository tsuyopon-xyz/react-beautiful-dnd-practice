import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  DragDropContext,
  DropResult,
  DragStart,
  DragUpdate,
} from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';

const App = () => {
  const [data, setData] = useState(initialData);

  const onDragStart = (initial: DragStart) => {
    console.log(initial, 'Drag Start!!!');
    // document.body.style.color = 'orange';
    // document.body.style.transition = 'background-color 0.2s ease';
  };

  const onDragUpdate = (update: DragUpdate) => {
    // console.log(update, 'Drag Update!!!');
    // const { destination } = update;
    // const opacity = destination
    //   ? destination.index / Object.keys(data.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const onDragEnd = (result: DropResult) => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    const { draggableId, destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const srcColumnId = source.droppableId;
    const srcColumn = data.columns[srcColumnId];
    const copiedTaskIds = [...srcColumn.taskIds];
    const pulledTaskId = copiedTaskIds.splice(source.index, 1)[0];
    copiedTaskIds.splice(destination.index, 0, pulledTaskId);

    setData((prevData) => {
      const updatedData = { ...prevData };
      data.columns[srcColumnId].taskIds = copiedTaskIds;

      return updatedData;
    });
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return <Column key={columnId} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
