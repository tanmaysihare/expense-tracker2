import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import AuthPage from './components/pages/AuthPage';
import HomePage from './components/pages/HomePage';
import ForgetPassword from './components/auth/ForgetPassword';
import ChangePassword from './components/auth/ChangePassword';
import { useSelector } from 'react-redux';


function App() {
  const isLogin = useSelector((state)=> state.auth.isLoggedIn);

  return (
    <Header >
      <Switch>
        <Route  path='/auth' exact>
          <AuthPage/>
        </Route>
        {isLogin && <Route path='/home'>
          <HomePage/>
        </Route>}
        {isLogin && <Route path='/changePassword'>
          <ChangePassword/>
        </Route>}
        <Route path='/forgetPassword'>
          <ForgetPassword/>
        </Route>
      </Switch>
    </Header>
  )
}

export default App;
