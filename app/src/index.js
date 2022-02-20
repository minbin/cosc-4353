import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Navigation, Footer, Home, History, Login, Quote, Profile } from './components';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Navigation />
    <HashRouter>
      <Routes>                
        <Route exact path='/' element={<Home />}/>            
        <Route path='/login' element={<Login />}/>               
        <Route path='/profile' element={<Profile />}/>               
        <Route path='/quote' element={<Quote />}/>               
        <Route path='/history' element={<History />}/>  
      </Routes>
    </HashRouter>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
