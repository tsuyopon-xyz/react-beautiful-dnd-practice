import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';

const App = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { draggableId, destination, source } = result;

    if (destination) {
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
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return <Column key={columnId} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
