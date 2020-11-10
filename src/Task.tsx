import React from 'react';
import { Task } from './Types';
import styled from 'styled-components';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

interface IProps {
  task: Task;
  index: number;
}

export default function Column({ task, index }: IProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
}
