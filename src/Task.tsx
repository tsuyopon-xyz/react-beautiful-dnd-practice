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

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin: 8px;
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
            //@ts-ignore
            isDragging={isDragging}
          >
            <Handle {...provided.dragHandleProps} />
            {task.content}
          </Container>
        );
      }}
    </Draggable>
  );
}
