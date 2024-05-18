import { BrowserRouter, useRoutes } from 'react-router-dom'
import './App.css'

import { MirarCampeonatos } from './pages/mirarCampeonatos'
import { InscribirEquipos } from './pages/incribirEquipos'
import { Resultado } from './pages/mirarResultado'
import { AgregarResultado } from './pages/agregarResultado'
import { Cronograma } from './pages/cronograma'
import { Participantes } from './pages/participantes'
import { Derrotero } from './pages/derrotero'

function App() {

  const AppRoutes = ()=>{
    let routes = useRoutes([
      {path:'/', element: <MirarCampeonatos/>},
      {path:'/incribirEquipos/:id', element: <InscribirEquipos/>},
      {path: '/mirarparticipantes/:id', element: <Participantes/>},
      {path:"/cronograma", element: <Cronograma/>},
      {path: "/derrotero", element: <Derrotero/>},
      {path:"/resultado", element: <Resultado/>},
      {path: "/agregarResultado", element: <AgregarResultado/>}
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
