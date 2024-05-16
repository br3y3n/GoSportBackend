import React, { useState } from 'react'

export const AgregarResultado = () => {

    const [data, setData]= useState()
    const [equipo1, setEquipo1]= useState()
    const [equipo2, setEquipo2]= useState()
    useEffect(() => {
     const obtenerUsuarios = async () => {
       const response = await axios.get(`http://localhost:4000/enfrentamiento/vs`);
       setData(response.data);
     };
     obtenerUsuarios();
   }, []);
   console.log(data)
  return (
    <article className='agrResultadoPrincipal'> 
    <section className='agrResultadoEq1'>
        <div>
    <h1>Equipo1</h1>
    <h2>goles</h2>
    <h2>tarjetas Amarillas</h2>
    <h2>tarjetas rojas</h2>
        </div>
        <div className='agrInput'>
            <h1>0</h1>
            <input type="text" />
            <input type="text" />
            <input type="text" />
        </div>
    </section>
    <section className='agrResultadoEq1'>
        <div>
    <h1>Equipo2</h1>
    <h2>goles</h2>
    <h2>tarjetas Amarillas</h2>
    <h2>tarjetas rojas</h2>
        </div>
        <div className='agrInput'>
        <h1>0</h1>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        </div>
    </section>
    </article>
  )
}
