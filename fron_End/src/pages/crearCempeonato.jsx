import React, { useState } from 'react'
import './campeonato.css'
import axios from 'axios'

export const CrearCempeonato = () => {

    const [diciplina, setDiciplina] = useState('')
    const [categoria, setCategoria] = useState('')
    const [modalidad, setModalidad] = useState('')
    const [fehcaInicio, setFehcaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [nombre, setnombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [inicioInscripcion,setInicioInscripcion] = useState('')
    const [finInscripcion, setfinInscripcion] = useState('')
    const [cantidadEquipos, setCantidadEquipos] = useState(0)
    const estado = true;
    const nombree = "fase 1"
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`http://localhost:4000/campeonatos/agregarCampeonato`,
         {diciplina, categoria, modalidad, fehcaInicio, fechaFin,nombre, descripcion, inicioInscripcion, finInscripcion});

        const resFase= await axios.post('http://localhost:4000/fases/obtener',
        {estado, nombree});
       console.log("datos enviados correctamente")
      } catch (error) {
        console.error(error);
      }
    };

  return (

    <form action="" className='contenedorPrincipal' onSubmit={handleSubmit}>
        <div className='contenedorText'>

        <label htmlFor="">diciplina</label>
        <label htmlFor="">categoria</label>
        <label htmlFor="">modalidad</label>
        <label htmlFor="">fehca inicio </label>
        <label htmlFor="">fehca fin </label>
        <label htmlFor=""> nombre </label>
        <label htmlFor="">descripcion </label>
        <label htmlFor="">inicio inscripcion </label>
        <label htmlFor="">fin inscripcion </label>
        <label htmlFor="">cantidad equipo </label>
        </div>

        <div className='contenedorInput'>
            <input type="text" 
            onChange={e=> setDiciplina(e.target.value)}
            value={diciplina}
            />
            <input type="text"
            onChange={e=> setCategoria(e.target.value)}
            value={categoria}
            />
            <input type="text" 
            onChange={e=> setModalidad(e.target.value)}
            value={modalidad}
            />
            <input type="date" 
            onChange={e=> setFehcaInicio(e.target.value)}
            value={fehcaInicio}
            />
            <input type="date" 
            onChange={e=> setFechaFin(e.target.value)}
            value={fechaFin}
            />
            <input type="text" 
            onChange={e=> setnombre(e.target.value)}
            value={nombre}
            />
            <input type="text" 
            onChange={e=> setDescripcion(e.target.value)}
            value={descripcion}
            />
            <input type="date" 
            onChange={e=> setInicioInscripcion(e.target.value)}
            value={inicioInscripcion}
            />
            <input type="date" 
            onChange={e=> setfinInscripcion(e.target.value)}
            value={finInscripcion}
            />
            <label htmlFor="">{cantidadEquipos}</label>
        </div>
        <button type='submit'>Agregar Camoenato</button>
    </form>
  )
}
