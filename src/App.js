
import './App.css';
import { useState } from 'react';

let count = 0;

function App() {

  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  const [editValue, setEditValue] = useState('');

  const addTodo = () => {
    if (value === ''){
      return ;
    }

    const newTodos = [...todos, {id: count, text: value, type: "task", completed: false }]
    setTodos(newTodos)
    setValue('')
    count += 1;
  }


  const onUpdate = (id) => {
    setTodos(todos.map((todo) => {
      if ( todo.id === id ){
        return {...todo, type: "task", text: editValue}
      } else {
        return {...todo}
      }
    })
    )
  }

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onEditChange = (e) => {
    setEditValue(e.target.value)
  }



  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }



  const onEdit = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          setEditValue(todo.text); // ここでsetEditValueを呼び出す
          return { ...todo, type: "form" };
        } else {
          return { ...todo, type: "task" };
        }
      })
    );
  };


  const onCheck = (id) => {
    setTodos(todos.map((todo)=> 
      todo.id === id ?
        {...todo, completed: !todo.completed}
        : 
        {...todo}
    ))

  }


  const list = todos.map((todo) => {
    return todo.type === "task" ? (
      <li key={todo.id}>
        <div className='border border-gray-400'>
          <input className='border border-blue-200' type="checkbox" checked={todo.completed} onChange={()=>onCheck(todo.id)} />
          <p>{todo.text}</p>
          <button onClick={()=>onDelete(todo.id)}>削除</button>
          <button onClick={()=>onEdit(todo.id)}>編集</button>
        </div>
      </li>
    ) : (
        <li key={todo.id}>
          <form>
            <input type="text" value={editValue} onChange={onEditChange} />
            <button onClick={()=>onUpdate(todo.id)}>確定</button>
          </form>
        </li>
      );
  });


  return (
    <>
      <div className=''>
        <div className=''>
          <input className='' type="text" value={value} onChange={onChange} />
          <button className='' onClick={addTodo} >送信する</button>
        </div>

        <div>
          {value}
        </div>
        <ul className='todoList flex'>
          {list}
        </ul>

        <div>

          <p>タスクの数</p>
          <p>{todos.length}</p>

          <p>完了済み</p>
          <p>{todos.filter((todo) => todo.completed === true ).length}</p>

          <p>未完了</p>
          <p>{todos.length - todos.filter((todo) => todo.completed === true ).length}</p>

        </div>
      </div>
    </>
  );
}

export default App;
