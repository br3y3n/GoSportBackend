import { useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
// import { useLocalStorage } from 'react-storage-complete';
export const InscribirEquipos = () => {

    const Idcampeonato= useParams().id
    // const [ Item, setItem ] = useLocalStorage('ID'); 
    const [nombreEquipo, setNombreEquipo] = useState('')
    const [nombreCapitan, setNombreCapitan] = useState('')
    const [contactoUno, setContactoUno] = useState(0)
    const [contactoDos, setContactoDos] = useState(0)
    const [jornada, setjornada] = useState('')
    const [N, setN] = useState(0)
    const [nombreJugador, setNombreJugador] = useState('')
    const [ficha, setFicha] = useState(0)
    const [dorsal, setDorsal] = useState(0)
    const [participantes, setParticipantes] = useState([]);
    localStorage.setItem('ID', Idcampeonato.toString())
    const agregarIntegrante = () => {
        const nuevoIntegrante = {
          N,
          nombreJugador,
          ficha,
          dorsal,
        };
        setParticipantes([...participantes, nuevoIntegrante]);
        setN('');
        setNombreJugador('');
        setFicha('');
        setDorsal('');
      };

      const handleSubmit = async (e) => {   
        e.preventDefault();     
        try {
          
          const res = await axios.post(`http://localhost:4000/equipo/agregarInscripcion`,
           {nombreEquipo, nombreCapitan, contactoUno, contactoDos, jornada,Idcampeonato, participantes});
           console.log(res)
          console.log("datos enviados correctamente")
        } catch (error) {
          console.error(error);
        }
      };


  return (

    <>
    <h1>DATOS CAPITAN</h1>
    <form 
    onSubmit={handleSubmit}
    className='contenedorPrincipal'>
    <div className='contenedorText'>

    <label htmlFor="">nombre equipo</label>
    <label htmlFor="">nombre Capitan</label>
    <label htmlFor="">contacto Uno</label>
    <label htmlFor="">contacto Dos </label>
    <label htmlFor="">jornada </label>
    
   
    </div>

    <div className='contenedorInput'>
        <input type="text" 
        onChange={e=> setNombreEquipo(e.target.value)}
        value={nombreEquipo}
        />
        <input type="text" 
        onChange={e=> setNombreCapitan(e.target.value)}
        value={nombreCapitan}
        />
        <input type="number" 
        onChange={e=> setContactoUno(e.target.value)}
        value={contactoUno}
        />
        <input type="number" 
        onChange={e=> setContactoDos(e.target.value)}
        value={contactoDos}
        />
        <input type="text" 
        onChange={e=> setjornada(e.target.value)}
        value={jornada}
        />
    </div>
    <button 
    type="submit"
    className="buttonIncribir" >
    IncribirEquipo</button>
</form>
<h1>PARTICIPANTES</h1>

    <form action="" className="formParticipantes">
    <div className="contenedorText">
    <label htmlFor="">N:</label>
    <label htmlFor="">nombre Jugador</label>
    <label htmlFor="">ficha</label>
    <label htmlFor="">dorsal </label>
    </div>

    <div>
    <div className='contenedorInput'>
        <input type="number"
        onChange={e=> setN(e.target.value)}
        value={N}
        />
        <input type="text" 
        onChange={e=> setNombreJugador(e.target.value)}
        value={nombreJugador}
        />
        <input type="number" 
            onChange={e=> setFicha(e.target.value)}
            value={ficha}
        />
        <input type="text" 
        onChange={e=> setDorsal(e.target.value)}
        value={dorsal}
        />
       
    </div>
    </div>

    <button 
    className="buttonIncribir"
    onClick={agregarIntegrante} 
    type="button">Agregar</button>
    </form>
    
      <ul>
        {participantes.map((integrante, index) => (
          <li key={index}>
            {integrante.N} - {integrante.nombreJugador} - {integrante.ficha} -{' '}
            {integrante.dorsal}
          </li>
        ))}
      </ul>


      <Link className="editar" to={'/participantes'}>Mirar participantes</Link>
    </>
  )
}
