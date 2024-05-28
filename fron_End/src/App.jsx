import { BrowserRouter, useRoutes } from 'react-router-dom'
import './App.css'

import { MirarCampeonatos } from './pages/mirarCampeonatos'
import { InscribirEquipos } from './pages/incribirEquipos'
import { Resultado } from './pages/estadisticas'
import { AgregarResultado } from './pages/agregarResultado'
import { Cronograma } from './pages/cronograma'
import { Participantes } from './pages/participantes'
import { Derrotero } from './pages/derrotero'
import { MirarResultadoVs } from './pages/mirarResultadoVs'

function App() {

  const AppRoutes = ()=>{
    let routes = useRoutes([
      {path:'/', element: <MirarCampeonatos/>},
      {path:'/incribirEquipos/:id', element: <InscribirEquipos/>},
      {path: '/mirarparticipantes/:idCampeonato', element: <Participantes/>},
      {path:"/cronograma", element: <Cronograma/>},
      {path: "/derrotero", element: <Derrotero/>},
      {path:"/resultado", element: <Resultado/>},
      {path:"/mirarResultado", element: <MirarResultadoVs/>},
      {path: "/agregarResultado/:id", element: <AgregarResultado/>}
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
