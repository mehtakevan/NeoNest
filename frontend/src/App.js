import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetPassword from './Pages/setPassword';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Navbar from './components/Navbar/Navbar';
import ForgotPassword from './Pages/forgotpassword'
import Verifyotp from './Pages/verifyotp'
import Home from './views/Home/Home';
import Transfer from './views/Transfer_funds/transfer';
import Addfund from './Pages/Addfund';
import { ChakraProvider } from '@chakra-ui/react';
import Dashboard from './views/Dashboard/Dashboard';
import Addfund from './Pages/Addfund';
import Loan from './Pages/getLoan';


// import { ToastContainer } from 'react-toast-notifications'
function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <ChakraProvider>
      <BrowserRouter>
        <Routes>
        
          <Route path='/' element={<Home/>}/>
          <Route path='/setpassword' Component={SetPassword} />
          <Route path='/forgotpassword' Component={ForgotPassword} />
          <Route path='/verifyotp' Component={Verifyotp} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={SignUp} />
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/transfer' Component={Transfer} />
          <Route path='/loan' Component={Loan} />
          <Route path='/addfund' Component={Addfund} />
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
