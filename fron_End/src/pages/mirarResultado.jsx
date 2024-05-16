import React, { useState, useEffect } from 'react'

export const Resultado = () => {
   const [data, setData]= useState()
   useEffect(() => {
    const obtenerUsuarios = async () => {
      const response = await axios.get(`http://localhost:4000/campeonatos/obtenerCampeonato`);
      setData(response.data);
    };
    obtenerUsuarios();
  }, []);
  return (
   <article>

    <div>
    <h1>Equipo1</h1>
    <h2>goles</h2>
    <h2>tarjetas Amarillas</h2>
    <h2>tarjetas rojas</h2>
    </div>
    <div>
    <h1>Equipo1</h1>
    <h2>goles</h2>
    <h2>tarjetas Amarillas</h2>
    <h2>tarjetas rojas</h2>
    </div>
   </article>
  )
}
