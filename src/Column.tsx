import React from 'react';
import Task from './Task';
import { Column as ColumnType, Task as TaskType } from './Types';
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
`;

interface IProps {
  column: ColumnType;
  tasks: TaskType[];
}

export default function Column({ column, tasks }: IProps) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <TaskList>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </TaskList>
    </Container>
  );
}
