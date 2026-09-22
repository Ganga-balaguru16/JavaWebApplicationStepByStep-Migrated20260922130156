import axios from 'axios';

export interface Todo {
  name: string;
  category: string;
}

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>('/todos');
  return response.data;
};

export const deleteTodo = async (name: string, category: string): Promise<void> => {
  await axios.get(`/delete-todo.do`, {
    params: { todo: name, category },
  });
};