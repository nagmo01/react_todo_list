
import './App.css';
import './input.css';
import { useState } from 'react';

let count = 0;

function App() {

  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  const [editValue, setEditValue] = useState('');

  const addTodo = () => {
    if (value === '') {
      return;
    }

    const newTodos = [...todos, { id: count, text: value, type: "task", completed: false }]
    setTodos(newTodos)
    setValue('')
    count += 1;
  }


  const onUpdate = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, type: "task", text: editValue }
      } else {
        return { ...todo }
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
    setTodos(todos.map((todo) =>
      todo.id === id ?
        { ...todo, completed: !todo.completed }
        :
        { ...todo }
    ))

  }


  const list = todos.map((todo) => {
    return todo.type === "task" ? (
      <div key={todo.id}>
        <div className='my-3 flex justify-between'>
          <div className='flex justify-start'>
            <input className='self-center mx-5 form-checkbox h-6 w-6 text-green-500 border-gray-300 rounded' type="checkbox" checked={todo.completed} onChange={() => onCheck(todo.id)} />
            <p className='me-5 self-center font-bold'>{todo.text}</p>
          </div>
          <div className='me-5'>
            <button className='rounded bg-purple-400 px-5 py-2 my-3 text-white font-bold mr-2' onClick={() => onDelete(todo.id)}>削除</button>
            <button className='rounded bg-green-400 px-5 py-2 my-3 text-white font-bold' onClick={() => onEdit(todo.id)}>編集</button>
          </div>
        </div>
      </div>
    ) : (
      <div className='flex justify-center mt-5' key={todo.id}>
        <input className='font-bold w-2/3 border border-gray-600 border-4 rounded me-2 my-2' type="text" value={editValue} onChange={onEditChange} />
        <button className="text-white rounded bg-red-400 font-bold px-3 py-3  my-2 px-9" onClick={() => onUpdate(todo.id)} >更新</button>
      </div>
    );
  });



  return (
    <>
      <h1 className='text-center font-bold text-3xl mt-20'>Todoアプリ</h1>
      <div className='mt-12 text-2xl container mx-auto'>
        <div className='flex justify-center mt-5'>
          <input className='font-bold w-2/3 border border-black border-4 rounded me-2 my-2' type="text" value={value} onChange={onChange} />
          <button className="text-white rounded bg-black font-bold px-3 py-3  my-2" onClick={addTodo} >追加する</button>
        </div>

        <div className='w-full mt-10'>
          {list}
        </div>

        <div className='flex justify-around font-bold mt-12 mb-5'>

          <div className='flex'>
            <p className=''>タスクの数：</p>
            <p>{todos.length}</p>
          </div>

          <div className='flex'>
            <p className=''>完了済み：</p>
            <p>{todos.filter((todo) => todo.completed === true).length}</p>
          </div>

          <div className='flex'>
            <p className=''>未完了：</p>
            <p>{todos.length - todos.filter((todo) => todo.completed === true).length}</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
