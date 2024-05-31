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
  const [dataVs, setDataVs]= useState();
  const [estadoBtn, setEstadoBtn] = useState(true)
  const [hora, setHora]= useState('')
  const [fecha, setFecha] = useState('')
  const estadoFase = localStorage.getItem('estadoFase');
  const idFase= localStorage.getItem('IdFase');
  
  useEffect(() => {
    if(estadoFase){
      const obtenerVs =async ()=>{
      const vs = await axios.get('http://localhost:4000/enfrentamiento/obtenervs', {
          headers: {
            IdFase: idFase
          }
        })
      setEstadoBtn(false)
      
      setDataVs(vs.data.equipos)
      }
        obtenerVs()
    }
  }, [])

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
      localStorage.setItem('estadoFase', estado)
      // Obtener el idFase
      const fase = await axios.post('http://localhost:4000/fases/obtener', { estado, nombreFase });
      const idFase = fase.data._id;
      setIdFase(idFase)
      // Guardar los datos para enviar
      const dataVs = {
        equipos: data.equiposInscritos,
        IdFase: idFase
      };
      console.log(dataVs)
      localStorage.setItem('IdFase', idFase)
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
  
  const agregarCronograma=async(id, equipo1,equipo2, IdFase)=>{
    try {
      const vs = await axios.patch(`http://localhost:4000/enfrentamiento/agregarCronograma/${id}`, {
        equipo1, equipo2, IdFase,fecha, hora 
      });
      console.log('Enfrentamiento guardado:', vs.data);
    } catch (error) {
      console.error('Error al guardar el enfrentamiento:', error);
    }
  }

  
  return (
  <article className='participantes'>

    <SideBar/>

 <section className='participante'>
    <h1>Id campeonato {IdCampeonato}</h1>
    <h1>EQUIPOS INSCRITOS</h1>
  {
    estadoBtn? 
    <button className='editar' onClick={sortearEquipos}>SORTEAR</button>:
    dataVs.map((equipo)=>(
      <article key={equipo._id} className='equiposIncritos'>
        <h1>{equipo.equipo1.name} VS {equipo.equipo2.name}</h1>
        <div className='addInfo'>
        <h1>Hora</h1>
        <input 
        type="time" 
        value={hora}
        onChange={e => setHora(e.target.value)}
        />
        </div>
        <div className='addInfo'>
          <h1>fecha</h1>
          <input 
          type="date" 
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          />
        </div>
        <button onClick={()=>agregarCronograma(equipo._id, equipo.equipo1.name, equipo.equipo2.name, equipo.IdFase)} >Guardar</button>
      </article>
    ))
   
  }
      
      </section>
    <br />
      </article>
  

  )
}
