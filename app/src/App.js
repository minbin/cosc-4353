import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Home, History, Login, Logout, Signup, Quote, Profile } from './components';

function App() {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/logout' element={<Logout />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/quote' element={<Quote />}/>
          <Route path='/history' element={<History />}/>
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}

export default App;
