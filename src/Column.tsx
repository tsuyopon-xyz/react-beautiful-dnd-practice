import React from 'react';
import Task from './Task';
import { Column as ColumnType, Task as TaskType } from './Types';
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;

  background-color: ${(props: any) =>
    props.isDraggingColumn ? 'lightgreen' : 'white'};
`;
const Title = styled.div`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props: any) =>
    props.isDraggingOver ? 'skyblue' : 'white'};
  flex-grow: 1;
  min-height: 100px;
`;

interface IProps {
  column: ColumnType;
  tasks: TaskType[];
  isDropDisabled: boolean;
  index: number;
}

export default function Column({
  column,
  tasks,
  isDropDisabled,
  index,
}: IProps) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        const isDraggingColumn = snapshot.isDragging;

        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            //@ts-ignore
            isDraggingColumn={isDraggingColumn}
          >
            <Title {...provided.dragHandleProps}>{column.title}</Title>
            <Droppable droppableId={column.id} type="task">
              {(
                provided: DroppableProvided,
                snapShot: DroppableStateSnapshot
              ) => {
                const { isDraggingOver } = snapShot;

                return (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    //@ts-ignore
                    isDraggingOver={isDraggingOver}
                  >
                    {tasks.map((task, index) => (
                      <Task key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                );
              }}
            </Droppable>
          </Container>
        );
      }}
    </Draggable>
  );
}
