import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  DragDropContext,
  DropResult,
  DragStart,
  DragUpdate,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [data, setData] = useState(initialData);
  // const [homeIndex, setHomeIndex] = useState<number>(0);

  const onDragStart = (start: DragStart) => {
    // console.log(start, 'Drag Start!!!');
    // const homeIndex = data.columnOrder.indexOf(start.source.droppableId);
    // setHomeIndex(homeIndex);
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
    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';

    const { /*draggableId,*/ destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'task') {
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
        updatedData.columns[srcColumnId].taskIds = newSrcTaskIds;
        updatedData.columns[destColumnId].taskIds = newDestTaskIds;

        return updatedData;
      });
      return;
    }

    if (type === 'column') {
      const newColumnOrder = [...data.columnOrder];
      const pulledColumnId = newColumnOrder.splice(source.index, 1)[0];
      newColumnOrder.splice(destination.index, 0, pulledColumnId);

      setData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.columnOrder = newColumnOrder;

        console.log(updatedData, '@@@@@@');

        return updatedData;
      });
    }
  };

  const InnerList = React.memo(() => {
    const list = data.columnOrder.map((columnId, index) => {
      // console.log('render column index : ', index);

      const column = data.columns[columnId];
      const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

      // const isDropDisabled = index < homeIndex;

      return (
        <Column
          key={columnId}
          column={column}
          tasks={tasks}
          isDropDisabled={false}
          index={index}
        />
      );
    });

    return <>{list}</>;
  });

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided: DroppableProvided) => {
          return (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              <InnerList />
              {provided.placeholder}
            </Container>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
