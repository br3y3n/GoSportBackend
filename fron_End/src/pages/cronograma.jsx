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
  const [resultados, setResultados] = useState([])
 


  console.log(idFase)

  useEffect(() => {
      const obtenerVs =async ()=>{

        // se utiliza la api lenResultados para vrificar que todas los resultados se hallan llenado 
        // si ya se llenaron todos los resultados se manda a llamar a la otra api equipos clasificados
      const vs = await axios.get('http://localhost:4000/resultados/lenResultadoVs', {
          headers: {
            IdFase: idFase
          }
        })
        console.log(vs.data)
        if(vs.data.estadoFase == false ){
          //traemos la variable estadoFase y la cambios a false lo cual quiere decir
          // que la fase a terminado y se necesita formanar nuevos cronogramas
          localStorage.setItem('estadoFase', false)
          setEstadoBtn(true)
          const clasificacion = await axios.get('http://localhost:4000/resultados/equiposClasificados',{
            headers:{
              IdFase: idFase
            }
          })

          console.log(clasificacion.data.msg)
        }
      }
        obtenerVs()
    
  }, [])

  useEffect(() => {
    if(estadoFase){

      // si el estado de la fase se mantiene en true quiere decir que la fase esta en juego y que ya hay 
      // unos cronagramas, despues se manda a llamar a la api obtener vs,
      //esta api me de vuelve todos los Vs que hay en esa fase 
      const obtenerVs =async ()=>{
      const vs = await axios.get('http://localhost:4000/enfrentamiento/obtenervs', {
          headers: {
            IdFase: idFase
          }
        })
        // se cambia el estado del boton sortear a false para que no se pueda sortear dos veces 
      setEstadoBtn(false)
      setDataVs(vs.data.equipos)
      }
        obtenerVs()
    }
  }, [])


  useEffect(() => {
    const obtenerUsuarios = async () => {

      // se manda a llamar a la api vs para obtener los vs, y si no hay equipos en vs todavia se manda todos los vs que me devuelva
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
      // se cambia el estado de la fase a true lo que quiere decir que ya hay vs y no tiene que volver a pasar por esta funcion
      //esta funcion se ejecuta solamente cuando no hay una fase y no hay vs para esa fase
      localStorage.setItem('estadoFase', estado)
      // se manda a llamar a la api para crear la fase y lo que nos devuelve es el id de la fase que se creo
      const fase = await axios.post('http://localhost:4000/fases/obtener', { estado, nombreFase });
      // se guarda en una variable el id de la fase que se halla creado
      const idFase = fase.data._id;
      setIdFase(idFase)
      // Guardar los datos para enviar
      const dataVs = {
        equipos: data.ganadores,
        IdFase: idFase
      };
      console.log(dataVs)
      //se actualiza el id de la fase 
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
      setEstadoBtn(false)
      setData();
      setMensaje(equipoSort.data.msg);
    } catch (error) {
      console.error('Error al sortear equipos:', error);
    }
  };
  
  const agregarCronograma=async(id, equipo1,equipo2, IdFase)=>{
    //esta funcion nos permite actualizar un cronograma, es decir agregar la hora y fecha de cada enfrentamiento
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
        <button onClick={()=>agregarCronograma(equipo._id, equipo.equipo1, equipo.equipo2, equipo.IdFase)} >Guardar</button>
      </article>
    ))
   
  }
      
      </section>
    <br />
      </article>
  

  )
}
