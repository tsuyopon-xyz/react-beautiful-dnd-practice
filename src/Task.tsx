import React from 'react';
import { Task } from './Types';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

interface IProps {
  task: Task;
}

export default function Column({ task }: IProps) {
  return <Container>{task.content}</Container>;
}
