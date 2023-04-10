import { useState, useEffect } from "react"
import { auth, db } from '../../firebaseconection'
import { signOut } from 'firebase/auth'
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from "firebase/firestore"


export default function Admin() {

  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})
  const [tarefas, setTarefas] = useState([])
  const [edit, setEdit] = useState({})

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail))

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "tarefas")
        const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })

          setTarefas(lista);

        })

      }

    }


    loadTarefas();
  }, [])


  async function handleRegister(e) {
    e.preventDefault();

    if (tarefaInput == '') {
      alert("Digite sua tarefa....")
      return;
    }

    if(edit?.id){
      handleUpdateTarefa();
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
      .then(() => {
        console.log("TAREFA REGITRADA")
        setTarefaInput('')
      })
      .catch((error) => {
        console.log("ERRO AO REGISTRAR" + error)
      })

  }

  async function handleLogout() {
    await signOut(auth);
  }

  async function deleteTarefa(id){
    const docRef = doc(db, "tarefas", id);

    await deleteDoc(docRef);
  }

  async function editTarefa(item){
    setTarefaInput(item.tarefa);
    setEdit(item);
  }

  async function handleUpdateTarefa(){
    const docRef = doc(db, "tarefas", edit?.id)
    await updateDoc(docRef, {
      tarefa: tarefaInput
    })
    .then(()=>{
      setTarefaInput('');
      setEdit({});
    })
    .catch((error)=>{
      console.log("DEU ERRO" + error)
    })
  }

  return (
    <div className="admin-container flex">
      <h1>Minhas Tarefas</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea value={tarefaInput} onChange={(e) => setTarefaInput(e.target.value)} placeholder="Digite sua tarefa..." />

        {Object.keys(edit).length > 0 ? <button className="btn-register" type="submit">Atualizar tarefa</button> : <button className="btn-register" type="submit">Registar tarefa</button>}
      </form>

      {tarefas.map((item) => {

        return (
          <article className="list flex" key={item.id}>
            <p>{item.tarefa}</p>

            <div>
              <button onClick={ () => editTarefa(item) }>Editar</button>
              <button onClick={ () => deleteTarefa(item.id) } className="btn-delete">Concluir</button>
            </div>

          </article>
        )
      })}

      <button onClick={handleLogout} className="btn-logout">Sair</button>

    </div>
  )
}