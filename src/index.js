import './styles.css';

import {Todo, TodoList} from './classes';  //si no especificas, busca el index por default
import { crearTodoHtml } from './js/componentes';

// Instancia del Todo-list
export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml);

const newTodo = new Todo('Aprender JavaScrip');

console.log('todos', todoList.todos);
