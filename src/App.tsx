
import './App.css'
import { BrowserRouter,  Route } from 'react-router-dom'
import { RoutesWithNotFound } from './components/RoutesWithNotFound/RoutesWithNotFound'
import { Content } from './components/Content/Content'

import { Provider } from 'react-redux'
import {store} from './store/store'
import Edit from './components/Content/Edit'
import { Curso } from './components/Curso/Curso'
import EditCurso from './components/Curso/EditCurso'
import AlumnoCursoForm from './components/AlumnoCursoForm'
import { Carrera } from './components/Carrera/Carrera'
import EditCarrera from './components/Carrera/EditCarrera'



function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
    <RoutesWithNotFound>        
        <Route path="/" element={<Content />} />
        <Route path="/cursos" element={<Curso />} />
        <Route path="/carreras" element={<Carrera />} />
        <Route path="/alumno/:id/editar" element={<Edit/>} />
        <Route path="/curso/:id/editar" element={<EditCurso/>} />
        <Route path="/carrera/:id/editar" element={<EditCarrera/>} />
        <Route path="/alumno/:id/addcurso" element={<AlumnoCursoForm/>} />
    </RoutesWithNotFound>
    </BrowserRouter>
    </Provider>
  )
}

export default App
