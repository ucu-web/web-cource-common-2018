import React from 'react';
import './Todo.scss';
import BEM from '../../utils/bem';
import API from '../../utils/api';
import { withState, compose, withHandlers } from 'recompose';

const b = BEM('todo');
const api = API('127.0.0.1:4000', 'todos');

const TodoCreator = ({ todo, onChange, onSubmit }) => (
  <form className={b('form')} onSubmit={onSubmit}>
    <input className={b('input')} value={todo} type="text" onChange={onChange} placeholder="Enter a task for this day" />
  </form>
);

const enhancer = compose(
  withState('todo', 'setTodo', ''),
  withHandlers({
    onTodoCreate: ({ getTodos, activeDate }) => async todo => {
      await api.create({ date: activeDate, text: todo, done: false });
      getTodos();
    }
  }),
  withHandlers({
    onChange: ({ setTodo }) => e => {
      setTodo(e.target.value);
    },
    onSubmit: ({ onTodoCreate, setTodo, todo }) => e => {
      e.preventDefault();
      onTodoCreate(todo);
      setTodo('');
    }
  })
);

export default enhancer(TodoCreator);
