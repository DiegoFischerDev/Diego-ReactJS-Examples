// npm install json-serve

// **********  server.json  *********************

// {
//   "stock": [
//     {
//       "id": 1,
//       "amount": 10
//     },
//     {
//       "id": 4,
//       "amount": 5
//     },
//     {
//       "id": 22,
//       "amount": 3
//     }
//   ],
//   "trips": [
//     {
//       "id": 1,
//       "title": "Viagem Maceió 7 noites",
//       "status": true,
//       "image": "https://sujeitoprogramador.com/wp-content/uploads/2019/12/maceio.jpg"
//     },
//     {
//       "id": 4,
//       "title": "Viagem Caribe 5 noites",
//       "status": true,
//       "image": "https://sujeitoprogramador.com/wp-content/uploads/2019/12/caribe.jpg"
//     },
//     {
//       "id": 22,
//       "title": "Viagem Fernando de Noronha 10 noites",
//       "status": true,
//       "image": "https://sujeitoprogramador.com/wp-content/uploads/2019/12/fernand-noronha.jpg"
//     }
//   ]
// }



// ****************** starting....  **********

// json-server server.json -p 3333


// ************ install axios ************

// npm install axios

// *********** create API file *******************

// ****************  services/api.js  ***********

// import axios from 'axios';

// const api = axios.create({
//  baseURL: 'http://localhost:3333'
// });

// export default api;

// // *********** getting Data ****************

// import React, { useEffect, useState } from 'react';
// import api from '../services/api'

// export default function Home() {

//   const [trips, setTrips] = useState([])

//   useEffect(() => {

//     async function loadApi() {
//       const response = await api.get('trips')
//       setTrips(response.data)
//       console.log(response.data)
//     }

//     loadApi();

//   }, [])

//   return(
//     <>i am Home</>
//   )

// }
