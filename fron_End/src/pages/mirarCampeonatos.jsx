import './campeonato.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export const MirarCampeonatos = () => {

  const [data, setData]= useState()
  useEffect(() => {
    const obtenerUsuarios = async () => {
      const response = await axios.get(`http://localhost:4000/campeonatos/obtenerCampeonato`);
      
      setData(response.data);
      console.log(data)
    };
    obtenerUsuarios();
  }, []);
 
  return (
    <>
     <h1>campeonatos disponibles</h1>
    {data && data.campeonatoEnEjecucion.map((campeonato) =>(
      <article className="descripcion " key={campeonato._id}>
         <div className="texto">
          <h1 className="tituloTorneo">{campeonato.nombre}</h1>
          <p className="text">{campeonato.descripcion}</p>
        </div><div className="">
            <h1 className="progreso">Progreso</h1>
            <section className="barraProgreso">
              <h1 className="porciento">0%</h1>
            </section>
            <p className="">{campeonato.inicioInscripcion}</p>
            <p className="">{campeonato.finInscripcion}</p>

            <Link to={`/mirarparticipantes/${campeonato._id}`} className='editar' >Campeonatos</Link>
          </div>
</article>
      ))}
     
      </>
  )
}
