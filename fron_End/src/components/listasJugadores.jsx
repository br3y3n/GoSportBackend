import React, { useEffect, useState } from 'react'
import './listaJugadores.css'
import axios from 'axios'
export default function listasJugadores({numeroEquipo}) {
    const idCampeonato= localStorage.getItem('ID');
    const idFase= localStorage.getItem('IdFase');
    const [idVs , setIdVs]=useState()
    const [idEquipo1, setIdEquipo1]=useState()
    const [idEquipo2, setIdEquipo2]=useState()
    const[id, setIdEquipo]=useState()
    const[equipo, setEquipo]=useState()
    useEffect(() => {
        const obtenerUsuarios = async () => {
          const response = await axios.get(`http://localhost:4000/enfrentamiento/obtenervs`,{
            headers: {
              IdFase: idFase
            }
          });
          setIdVs(response.data.equipos[0]._id)
           setIdEquipo1(response.data.equipos[0].equipo1.idEquipo);
           setIdEquipo2(response.data.equipos[0].equipo2.idEquipo)
          
        };
        obtenerUsuarios();
      }, []);
      useEffect(()=>{
      const guardarIdVs=()=>{
        if(numeroEquipo== 1){
                setIdEquipo(idEquipo1)
        }else if(numeroEquipo == 2){
            setIdEquipo(idEquipo2)
        }
        
      }
      guardarIdVs()
    },[numeroEquipo])
    

            useEffect(() => {
              const obtenerEquipo = async () => {
                try{
                    if(id =! null){
                const response = await axios.get(`http://localhost:4000/equipo/obtenerEquipo/${id}`,{
                  headers: {
                    idcampeonato: idCampeonato,
                    // IdVs: idVs
                  }
                });
                 setEquipo(response.data);
            }
              }catch(error){
                console.log(error)
              };
            }
              obtenerEquipo();
              
            }, [])
            console.log(equipo)
        
    return (
    <div>
        <div className='contenedorJugador '>
            <div>jugador 1</div>
        </div>
    </div>
  )
}
