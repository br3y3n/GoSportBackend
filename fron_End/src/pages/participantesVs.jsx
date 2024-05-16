import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './campeonato.css'
import { Link } from 'react-router-dom';
export const ParticipantesVs = () => {
  const IdCampeonato = localStorage.getItem('ID');
  const [data, setData]= useState()
  const [equiposSorteados, setEquiposSorteados]= useState()
  const [faseId, setFaseId]= useState()
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

  const sortearEquipos= async ()=>{
    const fase = await axios.post('http://localhost:4000/fases/obtener',{estado, nombreFase})
    setFaseId(fase.data._id)
    const dataVs ={
      equipos: data,
      IdFase: faseId
    }
    const equipoSort = await axios.post('http://localhost:4000/enfrentamiento/obtenerEquipos',{
      dataVs
    })
    setData()
    setEquiposSorteados(equipoSort.data.equipos)
    setMensaje(equipoSort.data.msg)
  }

  return (
    <>
    <h1>Id campeonato {IdCampeonato}</h1>
    <h1>EQUIPOS INSCRITOS</h1>
    <div className='listaIntegrantes'>
      {data ? (
        data.equiposInscritos.map((equipo) => (
          <article className='integrante' key={equipo._id}>
            <h1>nombre equipo: {equipo.nombreEquipo}</h1>
            <h1>nombre capitan: {equipo.nombreCapitan}</h1>
          </article>
        ))
      ) : (
        equiposSorteados?.map((equipo) => (
          <article key={equipo.id} className='equiposIncritos'>
            <h1>{equipo.team1} VS {equipo.team2}</h1>
          </article>
        ))
      )}
    </div>
    <br />
    <button className='editar' onClick={sortearEquipos}>SORTEAR</button>
  </>
  
  )
}
