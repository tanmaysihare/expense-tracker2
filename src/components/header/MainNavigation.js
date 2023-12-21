import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import classes from './MainNavigation.module.css';
import { authActions } from "../store/AuthSlice";

const MainNavigation = () =>{
const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
const dispatch = useDispatch();
const history = useHistory();
    const logoutHandler = ()=> {
        dispatch(authActions.logout());
        localStorage.removeItem("token");
        history.push('/auth');
    };
    console.log(isLoggedIn);
return (
    <header className={classes.header}>
        <div className={classes.logo}>Expense Tracker</div>
        <nav>
            <ul>
                <li>
                    <Link to='/auth'> Login</Link>
                </li>
               { isLoggedIn &&
                <li>
                    <button onClick={logoutHandler}>Logout</button>
                </li>
                }
            </ul>
        </nav>
    </header>
);
};
export default MainNavigation;