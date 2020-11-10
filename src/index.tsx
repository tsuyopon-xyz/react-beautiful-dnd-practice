import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial-data';
import Column from './Column';

const App = () => {
  const [data, setData] = useState(initialData);

  const columnsTitles = data.columnOrder.map((columnId) => {
    const column = data.columns[columnId];
    const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

    return <Column column={column} tasks={tasks} />;
  });

  return <div>{columnsTitles}</div>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
