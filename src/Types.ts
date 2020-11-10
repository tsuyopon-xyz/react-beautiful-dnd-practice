export type Task = {
  id: string;
  content: string;
};

// export type Tasks = {
//   [key: string]: Task;
// };

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

// export type Columns = {
//   [key: string]: Column;
// };

export type ColumnOrder = string[];

export type DataType = {
  tasks: {
    [key: string]: Task;
  };
  columns: {
    [key: string]: Column;
  };
  columnOrder: ColumnOrder;
};
