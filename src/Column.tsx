import React from 'react';
import Task from './Task';
import { Column as ColumnType, Task as TaskType } from './Types';
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.div`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props: any) =>
    props.isDraggingOver ? 'skyblue' : 'white'};
`;

interface IProps {
  column: ColumnType;
  tasks: TaskType[];
}

export default function Column({ column, tasks }: IProps) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided: DroppableProvided, snapShot: DroppableStateSnapshot) => {
          const { isDraggingOver } = snapShot;
          console.log(isDraggingOver);

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
}
