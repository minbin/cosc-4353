import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute, Navigation, Home, Login, Logout, Signup, Quote, Profile, History } from './components';
import useAuth, { ProvideAuth } from './components/Auth.js';

export default function App() {
  return (
    <React.StrictMode>
      <ProvideAuth>
        <Navigation useAuth={ useAuth } style={{ width: '100%' }}/>
        <HashRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<Signup useAuth={ useAuth }/>} />
            <Route path='/login' element={<Login useAuth={ useAuth }/>} />
            <Route path='/logout' element={<PrivateRoute useAuth={ useAuth } />}>
              <Route path='/logout' element={<Logout useAuth={ useAuth } />}/>
            </Route>
            <Route path='/quote' element={<PrivateRoute useAuth={ useAuth } />}>
              <Route path='/quote' element={<Quote />}/>
            </Route>
            <Route path='/profile' element={<PrivateRoute useAuth={ useAuth } />}>
              <Route path='/profile' element={<Profile test={false}/>}/>
            </Route>
            <Route path='/quote' element={<PrivateRoute useAuth={ useAuth } />}>
              <Route path='/quote' element={<Quote />}/>
            </Route>
            <Route path='/history' element={<PrivateRoute useAuth={ useAuth } />}>
              <Route path='/history' element={<History />}/>
            </Route>
          </Routes>
        </HashRouter>
      </ProvideAuth>
    </React.StrictMode>
  );
}
