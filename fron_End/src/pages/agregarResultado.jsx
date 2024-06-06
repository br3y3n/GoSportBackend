import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
export const AgregarResultado = () => {
  const IdCampeonato = localStorage.getItem('ID')

  const [data, setData] = useState()
  const [equipo1, setEquipo1] = useState()
  const [equipo2, setEquipo2] = useState()
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [openGoles, setOpengoles] = useState(false)
  const [open1E2, setOpen1E2] = useState(false)
  const [open2E2, setOpen2E2] = useState(false)
  const [openGolesE2, setOpengolesE2] = useState(false)
  const [numGoles, setNumGoles]=useState(0)
  const [golesEquipo1, setGolesEquipo1]= useState([])
  const idFase = localStorage.getItem('IdFase');
  const [amarillasEquipo1, setAmarillasEquipo1] = useState([])
  const [rojasEquipo1, setrojasEquipo1] = useState([])
  const [amarillasEquipo2, setAmarillasEquipo2] = useState([])
  const [rojasEquipo2, setrojasEquipo2] = useState([])
  const [numGoles2, setNumGoles2]=useState(0)
  const [golesEquipo2, setGolesEquipo2]= useState([])
  const [estadoPartido, setEstadoPartido]=useState(true)
  const [estadoGanador, setEstadoGanador]=useState(false)
  const { id } = useParams()
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/enfrentamiento/obtenervs1/${id}`, {
          headers: {
            IdFase: idFase
          }
        });
        setData(response.data);
      } catch (error) {
        console.log(error)
      }
    };
    obtenerUsuarios();
  }, [id, idFase]);

  useEffect(() => {
    if (data) {
      const obtenerEquipo = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/equipo/obtenerEquipo/${data.equipos.equipo1.idEquipo}`, {
          })
          setEquipo1(response.data)

          const response2 = await axios.get(`http://localhost:4000/equipo/obtenerEquipo/${data.equipos.equipo2.idEquipo}`, {
          })

          setEquipo2(response2.data)
        } catch (error) {
          console.log(error)
        }
      }
      obtenerEquipo()
    }
  }, [data])
  
  useEffect(() => {
  if(!estadoPartido)  {
   
      const agregarResultado = async () => {
        try {
          const resultado = {
            equipo1:{
              idEquipo:data.equipos.equipo1.idEquipo,
              tarjetasAmarillas:[amarillasEquipo1],
              tarjetasRojas:[rojasEquipo1],
              jugadoresGoles:[golesEquipo1],
              numeroGoles:numGoles
            },
            equipo2:{
              idEquipo:data.equipos.equipo2.idEquipo,
              tarjetasAmarillas:[amarillasEquipo2],
              tarjetasRojas:[rojasEquipo2],
              jugadoresGoles:[golesEquipo2],
              numeroGoles:numGoles2
            },
            IdVs:id,
            IdFase: idFase,
            EstadoPartido: false

          };
          const resultados = await axios.post(`http://localhost:4000/resultados/agregarResultado`,resultado)
          console.log("datos enviados correctamente")
        } catch (error) {
          console.log(error)
        }
      }
      
        agregarResultado()
    
    }
  
  }, [estadoPartido, data, amarillasEquipo1, rojasEquipo1, golesEquipo1, numGoles, amarillasEquipo2, rojasEquipo2, golesEquipo2, numGoles2, id])
  useEffect(()=>{
    if(!estadoPartido){
  const modificarEquipo=async()=>{
    try {
      if(numGoles > numGoles2){
      const vs1 = await axios.patch(`http://localhost:4000/equipo/modificarInscripcion/${data.equipos.equipo2.idEquipo}`, {
          estadoGanador
      });}else{
      const vs2 = await axios.patch(`http://localhost:4000/equipo/modificarInscripcion/${data.equipos.equipo1.idEquipo}`, {
         estadoGanador
     
      })}
      console.log('equipo modificado');
    } catch (error) {
      console.error('Error al modificar el equipo:', error);
    }
  }
  modificarEquipo()
}
},[estadoPartido, estadoGanador])
  const seleccionarJugadorAmarillas = (nombre) => {
    setAmarillasEquipo1(prev => [...prev, nombre])
  }

  const seleccionarJugadorRojas = (nombre) => {
    setrojasEquipo1(prev => [...prev, nombre])
  }
  const seleccionarJugadorGoles = (nombre) => {
    setGolesEquipo1(prev => [...prev, nombre])
  }
  const seleccionarJugadorAmarillasE2 = (nombre) => {
    setAmarillasEquipo2(prev => [...prev, nombre])
  }

  const seleccionarJugadorRojasE2 = (nombre) => {
    setrojasEquipo2(prev => [...prev, nombre])
  }
  const seleccionarJugadorGolesE2 = (nombre) => {
    setGolesEquipo2(prev => [...prev, nombre])
  }
  const finalizarPartido = () => {
    setEstadoPartido(false);
    alert('Partido finalizado');
  };


  

  return (
    <>

      <article className='agrResultadoPrincipal'>
        <section className='agrResultadoEq1'>
          <div>

            <h1>{data && data.equipos.equipo1.name}</h1>
            <h2>goles</h2>
            <h2>tarjetas Amarillas</h2>
            <h2>tarjetas rojas</h2>

            <div>
              <h1>amarillas equipo1</h1>
              {amarillasEquipo1 && amarillasEquipo1.map((nombre, index) => (
                <h1 key={index}>{nombre}</h1>
              ))}
            </div>


          </div>
          <div className='agrInput'>
            <h1>{numGoles}</h1>
            <div>
              <button onClick={()=>setOpengoles(true)}>Seleccionar jugador</button>
              {openGoles &&(
                <dialog open={true}>
                {equipo1 && equipo1.equipo.participantes.map((integrante) => (
                  <h1
                    key={integrante.N}
                    onClick={() => {seleccionarJugadorGoles(integrante.nombreJugador)
                      setOpengoles(false)
                    setNumGoles(numGoles+1)}
                    }>
                    {integrante.nombreJugador}
                  </h1>
                ))}
                <button onClick={() => setOpengoles(false)}>Cerrar</button>
                </dialog>
              )}

              
            </div>
            <div>
              <button onClick={() => setOpen1(true)}>Seleccionar jugador</button>
              {open1 && (
                <dialog open={true}>
                  {equipo1 && equipo1.equipo.participantes.map((integrante) => (
                    <h1
                      key={integrante.N}
                      onClick={() => {seleccionarJugadorAmarillas(integrante.nombreJugador)
                        setOpen1(false)}
                      }>
                      {integrante.nombreJugador}
                    </h1>
                  ))}
                  <button onClick={() => setOpen1(false)}>Cerrar</button>
                </dialog>
              )}

            </div>

            <div>
              <button onClick={() => setOpen2(true)}>Seleccionar Jugador</button>
              {open2 && (
                <dialog open={true}>
                  {equipo1 && equipo1.equipo.participantes.map((integrante) => (
                    <h1
                      key={integrante.N}
                      onClick={() => {seleccionarJugadorRojas(integrante.nombreJugador)
                        setOpen2(false)
                      }}>
                      {integrante.nombreJugador}
                    </h1>
                  ))}
                  <button onClick={() => setOpen2(false)}>Cerrar</button>
                </dialog>
              )}
              <div>
                <h1>rojas equipo1</h1>
                {rojasEquipo1 && rojasEquipo1.map((nombre, index) => (
                  <h1 key={index}>{nombre}</h1>

                

                ))}
                  <h1>Goles equipo1 </h1>
                  {golesEquipo1 && golesEquipo1.map((nombre ,index)=>(
                    <h1 key={index}>{nombre}</h1>
                  ))}
              </div> 
            </div>
          </div>
        </section>
        <section className='agrResultadoEq1'>
          <div>
            <h1>{data && data.equipos.equipo2.name}</h1>

            <h2>goles</h2>
            <h2>tarjetas Amarillas</h2>
            <h2>tarjetas rojas</h2>
          </div>
          <div>
              <h1>amarillas equipo2</h1>
              {amarillasEquipo2 && amarillasEquipo2.map((nombre, index) => (
                <h1 key={index}>{nombre}</h1>
              ))}
            </div>
          <div className='agrInput'>
            <h1>{numGoles2}</h1>
            <div>
              <button onClick={()=>setOpengolesE2(true)}>Seleccionar jugador</button>
              {openGolesE2 &&(
                <dialog open={true}>
                {equipo2 && equipo2.equipo.participantes.map((integrante) => (
                  <h1
                    key={integrante.N}
                    onClick={() => {seleccionarJugadorGolesE2(integrante.nombreJugador)
                      setOpengolesE2(false)
                    setNumGoles2(numGoles2+1)}
                    }>
                    {integrante.nombreJugador}
                  </h1>
                ))}
                <button onClick={() => setOpengolesE2(false)}>Cerrar</button>
                </dialog>
              )}

              
            </div>
            <div>
              <button onClick={() => setOpen1E2(true)}>Seleccionar jugador</button>
              {open1E2 && (
                <dialog open={true}>
                  {equipo2 && equipo2.equipo.participantes.map((integrante) => (
                    <h1
                      key={integrante.N}
                      onClick={() => {seleccionarJugadorAmarillasE2(integrante.nombreJugador)
                        setOpen1E2(false)}
                      }>
                      {integrante.nombreJugador}
                    </h1>
                  ))}
                  <button onClick={() => setOpen1E2(false)}>Cerrar</button>
                </dialog>
              )}

            </div>
            <div>
              <button onClick={() => setOpen2E2(true)}>Seleccionar Jugador</button>
              {open2E2 && (
                <dialog open={true}>
                  {equipo2 && equipo2.equipo.participantes.map((integrante) => (
                    <h1
                      key={integrante.N}
                      onClick={() => {seleccionarJugadorRojasE2(integrante.nombreJugador)
                        setOpen2E2(false)
                      }}>
                      {integrante.nombreJugador}
                    </h1>
                  ))}
                  <button onClick={() => setOpen2E2(false)}>Cerrar</button>
                </dialog>
              )}
              <div>
                <h1>rojas equipo2</h1>
                {rojasEquipo2 && rojasEquipo2.map((nombre, index) => (
                  <h1 key={index}>{nombre}</h1>

                

                ))}
                  <h1>Goles equipo2 </h1>
                  {golesEquipo2 && golesEquipo2.map((nombre ,index)=>(
                    <h1 key={index}>{nombre}</h1>
                  ))}
              </div> 
              </div>

          </div>
        </section>
        <div>
      <button onClick={finalizarPartido}>Finalizar Partido</button>
      {!estadoPartido && <h1>Partido finalizado</h1>}
    </div>

      </article>

    </>

  )

}