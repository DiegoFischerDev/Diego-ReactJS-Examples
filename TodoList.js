import React, { useEffect, useState } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import './index.css'

function App() {

  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [newId, setNewId] = useState(0);

  useEffect(() => {
    const listStorage = localStorage.getItem('@TodoListReact');
    const idStorage = localStorage.getItem('@newId');

    if (listStorage) {
      setList(JSON.parse(listStorage));
    }

    if (idStorage) {
      setNewId(JSON.parse(idStorage));
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('@TodoListReact', JSON.stringify(list));
    localStorage.setItem('@newId', JSON.stringify(newId));
  }, [list])

  function addItem() {
    if (inputValue != '') {
      // let newId = Math.floor(Math.random() * 10000);
      setNewId(newId+1);
      let newItem = {
        text: inputValue,
        id: newId
      }
      setList([...list, newItem]);
      setInputValue('');
    }
  }

  function removeItem(id) {
    const newList = list.filter(item => item.id !== id);
    setList([...newList]);
  }

  function editItem(id) {
    const selectedItem = list.find((item) => { return item.id == id });
    selectedItem.text = prompt("Edit Item", selectedItem.text);
    setList([...list]);
  }

  return (
    <div>
      <h1>To Do List</h1>

      <ul>
        {
          list.map((item) => {
            return (
              <li key={item.id}>{item.text} <a onClick={() => { removeItem(item.id) }}><AiFillDelete /> </a><a onClick={() => { editItem(item.id) }}><AiFillEdit /></a></li>
            )
          })}
      </ul>

      <input value={inputValue} placeholder="New Item" onChange={(e) => { setInputValue(e.target.value) }} />
      <button onClick={addItem}>ADD</button>
    </div>
  )
}

export default App;