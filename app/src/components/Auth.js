import React, { useState, useContext, createContext } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export default function useAuth() {
  return useContext(authContext);
}

function useProvideAuth(e) {
  const [user, setUser] = useState(cookies.get('userid'));

  const signin = (e, cb) => {
    cookies.set('userid', e.username);
    setUser(cookies.get('userid'));
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      cookies.remove('userid');
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}
