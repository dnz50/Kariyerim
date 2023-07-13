import './App.scss'
import Header from './components/Header'
import AddJob from './pages/AddJob'
import JobList from './pages/JobList'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Header/> 
    <Routes>
      <Route path='/' element={<JobList/>}/>
      <Route path='/jobs' element={<AddJob/>}/>
    </Routes>
    
    
    </BrowserRouter>
  )
}

export default App
