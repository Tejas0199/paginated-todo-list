import logo from './logo.svg';
import './App.css';
import Modal from './components/Modal';
import Button from './components/Button';
import { useReducer, useRef, useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';
import TodoCard from './components/TodoCard';



function App() {
  const [openModal, setOpenModal] = useState(false);
  const [newTodo, setNewTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [ pagination, setPagination ] = useState({ page: 1, entity: 5 });
  const uid = useRef(1000); 

  const onCreatehandler = () => {
    if(newTodo.id) {
      setTodos(prev => prev.map( todo => (todo.id === newTodo.id ? newTodo : todo)))
    } else {
      newTodo.id = uid.current;
      setTodos([newTodo, ...todos]);
      uid.current = uid.current + 1;
      setPagination({...pagination, page: 1});
    }
    setOpenModal(false);
    setNewTodo({});
  }
  const onEditClickHandler = (index) => {
    setNewTodo(todos[index]);
    setOpenModal(true);
  }

  const onDeletehandler = () => {
    setTodos(todos.filter( todo => !todo.isSelected))
  }

  const onSelectHandler = (index, type = 'SINGLE', { target: { checked }}) => {
      if(type === 'SINGLE') {
        if(todos[index]) todos[index].isSelected = checked
        setTodos([...todos])
      } else {
        const { page, entity } = pagination;
        setTodos(todos.map((todo, index) => {
          if((page - 1) * entity <= index && index < page * entity) todo.isSelected = checked
          return todo
        }))
      }
  }
  console.log('render')
  const getPaginationBtns = () => {
    const btns = [];
    for(let i = 1; i <= Math.ceil(todos.length / pagination.entity); i++) {
      btns.push(<Button className={i === pagination.page ? 'active' : 'disabled'} text={i + ''}/>);
    }
    return btns
  }
  const { page, entity } = pagination;
  const pageTodoList = todos.slice((page - 1) * entity, page * entity);
  return (
    <div className="App">
      <div className='action-container'>
        <Button type="primary" text='Create Todo' onClick={() => setOpenModal(true)}/>
      </div>
      { openModal && <Modal onClose={() => setOpenModal(false)} onDone={onCreatehandler}>
        <label>Enter Todo Title</label><br/>
        <input type='text' onChange={({ target: {value}}) => setNewTodo((prev) => ({ ...prev,title: value}))} value={newTodo.title || ''}/>
      </Modal>}
      <div className='todo-container'>
        <div className='todo-container-header'>
          <div>
            <input id='multi-select' disabled={todos.length < 2} type='checkbox' onChange={onSelectHandler.bind(this, null, 'MULTI')} checked={pageTodoList.every((todo) => todo.isSelected)}/>
            <label className={todos.length < 2 ? 'disabled' : 'close'} htmlFor='multi-select'>Select All</label>
            <Button onClick={onDeletehandler} text='Delete' disabled={ !todos.some((todo) => todo.isSelected)} />
          </div>
          <div className='entity'>
            <label htmlFor='entity'>Entity</label>
            <input type='number' id='entity' value={entity || ''} min={5} max={10} onChange={({ target: {value}}) => setPagination({ ...pagination, entity: value <= 10 ? Number(value) : entity})}/>
          </div>
        </div>
        {
          todos.length ? todos.slice((page - 1) * entity, page * entity).map((todo, index) => (<TodoCard key={todo.id} 
          onSelect={onSelectHandler.bind(this, index, 'SINGLE')} 
          onEdit={onEditClickHandler.bind(this, index)} {...todo}/>))
        : <h5 className='empty-text'>Empty</h5>}
      </div>
      <div className='pagination-container'>
        <Button disabled={page === 1} text='Previous' onClick={() => setPagination({...pagination, page : page - 1})}/>
        {
          getPaginationBtns()
        }
        <Button disabled={page === Math.ceil(todos.length / entity)} text='Next' onClick={() => setPagination({...pagination, page : page + 1})}/>
      </div>
    </div>
  );
}

export default App;
