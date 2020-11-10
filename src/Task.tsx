import React from 'react';
import { Task } from './Types';
import styled from 'styled-components';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props: any) =>
    props.isDragging ? 'lightgreen' : 'white'};

  display: flex;
`;

interface IProps {
  task: Task;
  index: number;
}

export default function Column({ task, index }: IProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        const { isDragging } = snapshot;
        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            //@ts-ignore
            isDragging={isDragging}
          >
            {task.content}
          </Container>
        );
      }}
    </Draggable>
  );
}
