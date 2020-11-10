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
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

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
    const destColumnId = destination.droppableId;

    if (srcColumnId === destColumnId) {
      const srcColumn = data.columns[srcColumnId];
      const newTaskIds = [...srcColumn.taskIds];

      const pulledTaskId = newTaskIds.splice(source.index, 1)[0];
      newTaskIds.splice(destination.index, 0, pulledTaskId);

      setData((prevData) => {
        const updatedData = { ...prevData };
        data.columns[srcColumnId].taskIds = newTaskIds;

        return updatedData;
      });

      return;
    }

    const srcColumn = data.columns[srcColumnId];
    const destColumn = data.columns[destColumnId];

    const newSrcTaskIds = [...srcColumn.taskIds];
    const newDestTaskIds = [...destColumn.taskIds];

    const pulledTaskId = newSrcTaskIds.splice(source.index, 1)[0];
    newDestTaskIds.splice(destination.index, 0, pulledTaskId);

    setData((prevData) => {
      const updatedData = { ...prevData };
      data.columns[srcColumnId].taskIds = newSrcTaskIds;
      data.columns[destColumnId].taskIds = newDestTaskIds;

      return updatedData;
    });
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Container>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return <Column key={columnId} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
