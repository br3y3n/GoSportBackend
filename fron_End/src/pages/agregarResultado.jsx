import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
export const AgregarResultado = () => {

  const [data, setData] = useState()
  const [equipo1, setEquipo1] = useState()
  const [equipo2, setEquipo2] = useState()
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const idFase = localStorage.getItem('IdFase');
  const [amarillasEquipo1, setAmarillasEquipo1] = useState([])
  const [rojasEquipo1, setrojasEquipo1] = useState([])
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

  const seleccionarJugadorAmarillas = (nombre) => {
    setAmarillasEquipo1(prev => [...prev, nombre])
  }

  const seleccionarJugadorRojas = (nombre) => {
    setrojasEquipo1(prev => [...prev, nombre])
  }

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
              {amarillasEquipo1 && amarillasEquipo1.map((nombre) => (
                <h1>{nombre}</h1>
              ))}
            </div>


          </div>
          <div className='agrInput'>
            <br />
            <h1>0</h1>
            <div>
              <button onClick={() => setOpen1(true)}>Seleccionar jugador</button>
              {open1 && (
                <dialog open={true}>
                  {equipo1 && equipo1.equipo.participantes.map((integrante) => (
                    <h1
                      key={integrante.N}
                      onClick={() => seleccionarJugadorAmarillas(integrante.nombreJugador)}>
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
                      onClick={() => seleccionarJugadorRojas(integrante.nombreJugador)}>
                      {integrante.nombreJugador}
                    </h1>
                  ))}
                  <button onClick={() => setOpen2(false)}>Cerrar</button>
                </dialog>
              )}
              <div>
                <h1>rojas equipo1</h1>
                {rojasEquipo1 && rojasEquipo1.map((nombre) => (
                  <h1>{nombre}</h1>
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
          <div className='agrInput'>
            <h1>0</h1>
            <input type="text" />
            <input type="text" />
            <input type="text" />
          </div>
        </section>

      </article>

    </>

  )

}