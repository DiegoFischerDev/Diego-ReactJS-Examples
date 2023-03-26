import React, { useState } from 'react';

function App() {

  const [titulo, setTitulo] = useState([]);
  const [autor, setAutor] = useState([]);

  function handleAdd() {
    console.log("cadastrando...")
  }

  return (
    <div>
      <div className='container'>
        <label>Titulo: </label>
        <input type="text" placeholder='Digite o titulo' value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}/>
        <br/>

        <label>Autor: </label>
        <input type="text" placeholder='Digite o autor' value={autor} onChange={(e)=>{setAutor(e.target.value)}}/>
        <br/>

        <button onClick={()=>{handleAdd()}}>Cadastrar</button>
      </div>
    </div>
  )
}

export default App;