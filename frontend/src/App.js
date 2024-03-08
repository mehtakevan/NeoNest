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
import { ChakraProvider } from '@chakra-ui/react';
import Dashboard from './views/Dashboard/Dashboard';
import Addfund from './Pages/Addfund';
import Loan from './Pages/getLoan';
import NewSignup from './Pages/NewSignup';
import FixedDeposit from './views/FixedDeposit/FixedDeposit';
import {Toaster} from 'react-hot-toast'
import Portfolio from './views/Stock_Portfolio/Portfolio';
import FullTransactionTable from './components/FullTransactionTable';

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
          <Route path='/newsignup' Component={NewSignup} />
          <Route path='/fixedDeposit' Component={FixedDeposit} />
          <Route path='/portfolio' Component={Portfolio} />
          <Route path='/transactionhistory' Component={FullTransactionTable}/>
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
      <Toaster/>
    </div>
  );
}

export default App;
