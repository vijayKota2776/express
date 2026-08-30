import './App.css';
import AddEmployee from './pages/AddEmployee';
import Employee from './pages/Employee';
import {BrowserRouter as Router ,Route ,Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path='/' element={<Employee/>}/>
          <Route path='/add-employee' element={<AddEmployee/>}/>
        </Routes>
     </Router>
    </div>
  );
}

export default App;