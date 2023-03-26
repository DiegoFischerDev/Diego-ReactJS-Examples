// ********************* firebaseconection.js ***************************


import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCmIjuRPGiXiR3dSdAYe6iedYe3F3rnqRs",
  authDomain: "cursosujeito-60957.firebaseapp.com",
  projectId: "cursosujeito-60957",
  storageBucket: "cursosujeito-60957.appspot.com",
  messagingSenderId: "228673360542",
  appId: "1:228673360542:web:75b6404c62524e3c69e18f",
  measurementId: "G-ZN4J6JS2CE"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };



// ***************************** App.js ********************************

import React, { useContext, useEffect, useState } from 'react';
import { db, auth } from './firebaseconection';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { async } from '@firebase/util';

function App() {

  useEffect(() => {

    // Essa função vai ficar monitorando o banco de dados e atualiza se sofrer mudança (real time)
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = [];

        snapshot.forEach(doc => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })

        setPosts(listaPost)
      })
    }

    loadPosts()
  }, [])

  useEffect(()=>{
    async function checkLogin(){
      onAuthStateChanged(auth, (user)=>{
        if(user){
          // se tiver usuario logado salvo na memoria...
          console.log(user);
          setUserLogado(true);
          setUserDetail({
            uid: user.uid,
            email: user.email
          });
          if(user.email === 'admin@email.com'){
            setAdminLogado(true);
          }
        }else{
          //se nao tiver usuario logado salvo na memoria...
          setUserLogado(false);
          setAdminLogado(false);
          setUserDetail({});
        }
      })
    }

    checkLogin();
  }, [])

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [userLogado, setUserLogado] = useState(false);
  const [adminLogado, setAdminLogado] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const [titulo, setTitulo] = useState([]);
  const [autor, setAutor] = useState([]);

  const [newTitulo, setNewTitulo] = useState([]);
  const [newAutor, setNewAutor] = useState([]);

  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState("");

  const [enableEdit, setEnableEdit] = useState("");

  async function cadastrarPost() {

    // await setDoc(doc(db, "posts", "4"), {
    //   titulo: titulo,
    //   autor: autor
    // })
    // .then(()=>{
    //   console.log("Dados Registrados no Banco.")
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor
    })
      .then(() => {
        console.log("Cadastrado com sucesso!");
        setTitulo("");
        setAutor("");
        // buscarPost();
      })
      .catch((error) => {
        console.log(`deu erro: ${error}`)
      })
  }

  async function buscarPost() {

    // const postRef = doc(db, "posts", "m3kWfG5zBypTL6QJFtEb");

    // await getDoc(postRef)
    // .then((snapshot)=>{
    //   setAutor(snapshot.data().autor);
    //   setTitulo(snapshot.data().titulo);
    // })
    // .catch((error)=>{
    //   console.log(`deu erro: ${error}`)
    // })

    const postsRef = collection(db, "posts")

    await getDocs(postsRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach(doc => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        });

        setPosts(lista);

      })
      .catch((error) => {
        console.log(`deu erro: ${error}`)
      })

  }

  async function editarPost() {
    const docRef = doc(db, "posts", idPost)

    await updateDoc(docRef, {
      titulo: newTitulo,
      autor: newAutor
    })
      .then(() => {
        console.log("Post Atualizado");
        setIdPost("");
        setAutor("");
        setTitulo("");
        // buscarPost();
      })
      .catch((error) => {
        console.log(`deu erro: ${error}`)
      })
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id)

    await deleteDoc(docRef)
      .then(() => {
        // buscarPost();
      })
      .catch((error) => {
        console.log(`deu erro: ${error}`)
      })

  }

  async function cadastrarUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then((value) => {
        alert("Cadastrado com sucesso!")
        console.log(`Usuario cadastrado com sucesso! email: ${value.user.email} uid: ${value.user.uid}`);
        setEmail('');
        setSenha('');
      })
      .catch((error) => {
        console.log(`deu erro: ${error}`)
        if (error.code === 'auth/weak-password')
          alert("Ops! Sua senha deve ter no minimo 6 digitos...")
        else if (error.code === 'auth/email-already-in-use')
          alert("Ops! Email ja cadastrado...")
        else if (error.code === 'auth/invalid-email')
          alert("Ops! Email invalido...")
        else if (error.code === 'auth/missing-emaill')
          alert("Ops! Você precisa digitar um email...")
        else alert("Ops! Erro ao tentar cadastrar... entre em contato conosco via Whatsapp")
      })
  }

  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, senha)
      .then((value) => {
        alert("Logado com sucesso!");
        console.log(value.user);

        setUserDetail({
          uid: value.user.uid,
          email: value.user.email
        });

        setUserLogado(true);
        if (value.user.email === 'admin@email.com')
          setAdminLogado(true);

        setEmail('');
        setSenha('');
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password')
          alert("Ops! Senha errada...")
        else alert("Ops! Deu Erro ao tentar logar...")
        console.log(`deu erro: ${error}`)
      })
  }

  async function fazerLogout() {
    await signOut(auth);
    setUserLogado(false);
    setAdminLogado(false);
    setUserDetail({});
  }


  return (
    <div>
      <h1>FireBase + Authentication</h1>


      {/* ********************************* LOGIN ******************************************** */}


      {!userLogado &&
        <div className='container'>
          <h2>Login / Cadastro</h2><br />
          <label>Email</label><br />
          <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Digite seu Email" /><br />

          <label>Senha</label><br />
          <input value={senha} onChange={(e) => { setSenha(e.target.value) }} placeholder="Digite sua Senha" /><br />

          <button onClick={cadastrarUsuario}>Cadastrar</button>
          <button onClick={logarUsuario}>Login</button>

          <br /><br />
          <span>Conta do Administrador</span><br />
          <span>email: admin@email.com</span><br />
          <span>senha: 123456</span>

        </div>
      }


      {/* ********************************* POSTS ******************************************** */}


      {userLogado &&
        <div className='container'>

          <div>
            <h2>Seja Bem Vindo(a) (Você está logado!)</h2>
            <span>ID: {userDetail.uid} - Email: {userDetail.email}</span><br />
            <button onClick={fazerLogout}>Sair da Conta</button>
            <br /><br />
          </div>

          <h2>Posts</h2>

          {adminLogado &&
            <div>
              <label>Titulo: </label>
              <input type="text" placeholder='Digite o titulo' value={titulo} onChange={(e) => { setTitulo(e.target.value) }} />
              <br />

              <label>Autor: </label>
              <input type="text" placeholder='Digite o autor' value={autor} onChange={(e) => { setAutor(e.target.value) }} />
              <br />

              <button onClick={cadastrarPost}>Cadastrar</button>
            </div>
          }

          <div>
            <ul>
              {posts.map((post) => {
                return (
                  <li key={post.id}>
                    <strong>ID {post.id}</strong><br />
                    {(enableEdit != post.id) &&
                      <>
                        <span>Titulo: {post.titulo}</span><br />
                        <span>Autor: {post.autor}</span><br /><br />
                      </>}

                    {(enableEdit == post.id) &&
                      <>
                        <span>Titulo: </span><input value={newTitulo} onChange={(e) => { setNewTitulo(e.target.value) }} placeholder={post.titulo} /><br />
                        <span>Autor: </span><input value={newAutor} onChange={(e) => { setNewAutor(e.target.value) }} placeholder={post.autor} /><br /><br />
                      </>}

                    {(enableEdit != post.id && adminLogado) &&
                      <>
                        <button onClick={() => { excluirPost(post.id) }}>Excluir</button>
                        <button onClick={() => { setEnableEdit(post.id); setIdPost(post.id); setNewAutor(post.autor); setNewTitulo(post.titulo) }}>Editar</button><br /><br />
                      </>}

                    {(enableEdit == post.id) &&
                      <>
                        <button onClick={() => { setEnableEdit(""); editarPost() }}>Salvar</button><br /><br />
                      </>}
                  </li>
                )
              })}
            </ul>
          </div>

        </div>
      }

    </div>
  )
}

export default App;