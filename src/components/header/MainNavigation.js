import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import classes from './MainNavigation.module.css';
import { authActions } from "../store/AuthSlice";
import { toggleDarkMode } from "../store/ThemeSlice";

const MainNavigation = () =>{
const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);

const dispatch = useDispatch();
const history = useHistory();
    const logoutHandler = ()=> {
        dispatch(authActions.logout());
        localStorage.removeItem("token");
        history.push('/auth');
    };
   const themeHandler = () => {
    dispatch(toggleDarkMode());
   };

return (
    
    <header className={classes.header}>
        <div className={classes.logo}>Expense Tracker</div>
        <nav>
            <ul>
                {
                !isLoggedIn &&
                <li>
                    <Link to='/auth'> Login</Link>
                </li>
                }
                { 
                  isLoggedIn &&
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                }
                 { 
                  isLoggedIn &&
                <li>
                    <Link to='/changePassword'>Change Password</Link>
                </li>
                }
                 { 
                  isLoggedIn &&
                <li>
                    <label className={classes.switch}>
                     <input onChange={themeHandler} type="checkbox"/>
                    <span className={classes.slider}></span>
                    </label>

                </li>
                }
                { 
                 isLoggedIn &&
                <li>
                    <button onClick={logoutHandler}>Logout</button>
                </li>
                }
               
            </ul>
        </nav>
    </header>
)
};
export default MainNavigation;