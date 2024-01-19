import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home';
import { ChakraProvider } from '@chakra-ui/react'
import Dashboard from './views/Dashboard/Dashboard';
// import { ToastContainer } from 'react-toast-notifications'
function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <ChakraProvider>
      <BrowserRouter>
        <Routes>
        
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/forgotpassword' Component={ForgotPasswordPage} /> */}
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={SignUp} />
          <Route path='/dashboard' Component={Dashboard} />
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
