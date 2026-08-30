import React from "react";
import Register from "./pages/regester";
import Login from "./pages/login";
import UserProfile from "./pages/UserProfile";
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Register' element={<Register/>}> </Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/User' element={<UserProfile/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;