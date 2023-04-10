import {useState} from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseconection'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Home(){

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      
      await signInWithEmailAndPassword(auth, email, password)
      .then(()=>{
        navigate('/admin')
      })
      .catch(()=>{
        alert("ERRO AO FAZER LOGIN")
      })

    }else{
      alert('Preencha todos os campos!')
    }
  }

  return(
    <div className='home-container flex'>
      <h1>Lista de Tarefas</h1>
      <span>Gerencie sua agenda de forma fácil.</span>

      <form className='form flex' onSubmit={handleLogin}>
        <input type='text' placeholder='Digite seu email...' value={email} onChange={(e)=> setEmail(e.target.value)}/>

        <input type='password' autoComplete='false' placeholder='Digite sua senha...' value={password} onChange={(e)=> setPassword(e.target.value)}/>

        <button type='submit'>Acessar</button>
      </form>

      <Link className='button-link' to="/register">
      Não possui uma conta? cadastre-se</Link>
    </div>
  )
}