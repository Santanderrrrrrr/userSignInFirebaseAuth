import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Signin from './components/Signin'
import SignUp from './components/SignUp'
import { useContext } from 'react';
import { GlobalContext } from './ContextApi/GlobalContext'

function App() {
  const { token } = useContext(GlobalContext);
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Signin />} />
        {token == ""? (
          <>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
          </>

        ):(
          ""
        )}
        <Route path='/*' element={token ? <Home/>:<Signin />} />
        
        <Route path="/Home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
