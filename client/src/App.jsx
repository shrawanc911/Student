import Component from './components/Home'
import Attend from './components/Attendence'
import Result from './components/Result'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Component/>}></Route>
          <Route path='/attendence/:ind' element={<Attend />}/>
          <Route path='/move/:ind' element={<Attend/>}/>
          <Route path='/result' element={<Result/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
