import { useRef } from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../store/AuthSlice';
import classes from './ForgetPassword.module.css';

const ChangePassword = ()=> {
    const history = useHistory();
    const passwordInputRef = useRef();
    const token = useSelector((state)=> state.auth.token);    
    const dispatch = useDispatch();

    const submitHandler = event => {
      event.preventDefault();
  
      const enteredPassword = passwordInputRef.current.value;
  
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA-ZiBDqAYaaBy2czSnBwxdUgrRk0Y0Qjs', {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          password: enteredPassword,
          returnSecureToken: true,
           }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        alert('Password reset. Please login with new password.');
        dispatch(authActions.logout());
        localStorage.removeItem('token');
        history.push('/auth');

      })
      .catch((error) => {
  
        alert(error.message);
      });
  };
    return (
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='new-password'>Enter your new password</label>
          <input type='password' id='new-password' ref={passwordInputRef}/>
        </div>
        <div className={classes.action}>
          <button>reset your password</button>
        </div>
      </form>
    );
}
export default ChangePassword;