import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './campeonato.css'
import { Link } from 'react-router-dom';
import { SideBar } from '../components/sideBar';
export const Cronograma = () => {
  const IdCampeonato = localStorage.getItem('ID');
  const [data, setData]= useState()
  const [IdFase, setIdFase]= useState()
  const [equiposSorteados, setEquiposSorteados]= useState()
  const [mensaje, setMensaje]= useState();
  const [nombreFase, setNombreFase]= useState("Fase 1")
  const [estado, setEstado]= useState(true)


  useEffect(() => {
    const obtenerUsuarios = async () => {
      const response = await axios.get(`http://localhost:4000/enfrentamiento/vs`,{
        headers:{
          Authorization: IdCampeonato
        }
      });
      setData(response.data);
    };
    obtenerUsuarios();
  }, []);
  const sortearEquipos = async () => {
    try {
      // Obtener el idFase
      const fase = await axios.post('http://localhost:4000/fases/obtener', { estado, nombreFase });
      const idFase = fase.data._id;
  
      // Guardar los datos para enviar
      const dataVs = {
        equipos: data,
        IdFase: idFase
      };
  
      // Guardar los enfrentamientos
      const equipoSort = await axios.post('http://localhost:4000/enfrentamiento/guardarvs', {
        dataVs
      });
  
      // Obtener los enfrentamientos
      const vs = await axios.get('http://localhost:4000/enfrentamiento/obtenervs', {
        headers: {
          IdFase: idFase
        }
      });
  
      // Actualizar el estado con los resultados
      setEquiposSorteados(vs.data.equipos);
      setData();
      setMensaje(equipoSort.data.msg);
    } catch (error) {
      console.error('Error al sortear equipos:', error);
    }
  };
  
  return (
  <article className='participantes'>

    <SideBar/>

 <section className='participante'>
    <h1>Id campeonato {IdCampeonato}</h1>
    <h1>EQUIPOS INSCRITOS</h1>
      {
        (
          equiposSorteados?.map((equipo) => (
            <article key={equipo.id} className='equiposIncritos'>
            <h1>{equipo.equipo1} VS {equipo.equipo2}</h1>
          </article>
        ))
        )
      }
      <button className='editar' onClick={sortearEquipos}>SORTEAR</button>
      </section>
    <br />
      </article>
  
  )
}
