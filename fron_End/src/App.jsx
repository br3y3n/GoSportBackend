import { BrowserRouter, useRoutes } from 'react-router-dom'
import './App.css'

import { MirarCampeonatos } from './pages/mirarCampeonatos'
import { ParticipantesVs } from './pages/participantesVs'
import { InscribirEquipos } from './pages/incribirEquipos'
import { Resultado } from './pages/mirarResultado'
import { AgregarResultado } from './pages/agregarResultado'

function App() {

  const AppRoutes = ()=>{
    let routes = useRoutes([
      {path:'/', element: <MirarCampeonatos/>},
      {path:'/incribirEquipos/:id', element: <InscribirEquipos/>},
      {path:"participantes", element: <ParticipantesVs/>},
      {path:"resultado/:id", element: <Resultado/>},
      {path: "agregarResultado", element: <AgregarResultado/>}
    ])

    return routes
  }

  return (
  
 <BrowserRouter>
 <AppRoutes/>
 </BrowserRouter>
   
  )
}

export default App
