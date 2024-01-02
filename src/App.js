import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import AuthPage from './components/pages/AuthPage';
import HomePage from './components/pages/HomePage';
import ForgetPassword from './components/auth/ForgetPassword';
import ChangePassword from './components/auth/ChangePassword';
import { useSelector } from 'react-redux';
import classes from './app.module.css';

function App() {
  const isLogin = useSelector((state)=> state.auth.isLoggedIn);
  const themeToggle = useSelector((state)=> state.theme.isDarkMode);
  const premium = useSelector((state)=>state.expenses.premiumActivated);
  console.log("is dark mode on or off:",themeToggle);
let className = classes.header
  const toggleFunction =()=>{
    if(!themeToggle && !premium){
     className= classes.header
    }else if(themeToggle && !premium){
      className=classes.darkMode
    }else if(!themeToggle && premium){
      className=classes.darkMode
    }else{
      className=classes.darkMode
    }
  };
  toggleFunction();
  return (
    <div className={className}>
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
    </div>
  )
}

export default App;
