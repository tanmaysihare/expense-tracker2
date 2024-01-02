import React,{useRef} from "react";
import classes from './AuthForm.module.css';
import { authActions } from "../store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,Link } from "react-router-dom";

const AuthForm = () => {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const conformPasswordInputRef = useRef();
    const dispatch = useDispatch();
   // const isLogin = useSelector((state)=> state.auth.isLoggedIn);
    const isSignIn = useSelector((state)=> state.auth.isSignIn);
    const history = useHistory();

    const switchModeHandler = () =>{
        if(isSignIn){
            dispatch(authActions.signupOn());
        }else{
            dispatch(authActions.signupOff());
        }
     };

    const submitHandler = (event) =>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConformPassword = conformPasswordInputRef.current.value;

        if(enteredEmail && enteredPassword === enteredConformPassword){
            
            let url;
if(!isSignIn){
    url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-ZiBDqAYaaBy2czSnBwxdUgrRk0Y0Qjs';
}else{
    url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-ZiBDqAYaaBy2czSnBwxdUgrRk0Y0Qjs';
}
fetch(url,
  {
    method:'POST',
    body: JSON.stringify({
      email:enteredEmail,
      password: enteredPassword,
      returnSecureToken:true
    }),
    headers:{
      'Content-Type': 'application/json'
    }
  }
  ).then(res => {
    if(res.ok){
      return res.json();
    }else{
      return res.json().then(data => {
        let errorMessage = 'Authentication failed!';
        if(data && data.error && data.error.message){
          errorMessage = data.error.message;
        } 
         throw new Error(errorMessage);
      });
    }
  }).then((data) => {
    console.log(data);
   dispatch(authActions.login({token:data.idToken,userId:data.localId})); 
   localStorage.setItem('token',data.idToken);
   localStorage.setItem('userId',data.localId);
   if(data.displayName === '' || null){
      dispatch(authActions.manualProfileUpdate());
   }else{
    dispatch(authActions.profileUpdate());
    localStorage.setItem('isProfileUpdated', true);
   }
  history.replace('/home');
  }).catch((err) => {
    alert(err.message);
  });
        }else{
            alert('fill your details');
        }
    };
   
    
    return (
        <section className={classes.auth}>
            <h1>{isSignIn ? "Create New Account" : "Login"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label>Enter Your Email Address</label>
                    <input type="email" id="email" ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label>Your Password</label>
                    <input type="password" id="password" ref={passwordInputRef}/>
                </div>
                <div className={classes.control}>
                    <label>Conform Your Password</label>
                    <input type="password" id="conformPassword" ref={conformPasswordInputRef}/>
                </div>
                <div className={classes.actions}>
                    <button>
                      { isSignIn ? "Create Account":"login"}
                      </button>
                    <button 
                    type="button" 
                    className={classes.toggle} 
                    onClick={switchModeHandler}>
                      {isSignIn ? "Login With Existing Account" : "Create New Account  |" }
                      {!isSignIn ? <Link to="/forgetPassword">|  Forget Password</Link> : ""}
                      </button>
                </div>
            </form>

        </section>
    );
};
export default AuthForm;