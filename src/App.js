import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Create from './pages/create';
import Undefine from './pages/undefine';
import ListElection from './pages/lisst-election';
import ListParty from './pages/list-party';
import ListProposal from './pages/list-proposal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='create' element={<Create />}></Route>
        <Route path='list' element={<ListElection />}></Route>
        <Route path='list-party/*' element={<ListParty />}></Route>
        <Route path='list-proposals/*' element={<ListProposal />}></Route>
        <Route path='*' element={<Undefine />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
