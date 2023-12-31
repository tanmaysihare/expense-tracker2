import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import classes from './MainNavigation.module.css';
import { authActions } from "../store/AuthSlice";
import { toggleDarkMode } from "../store/ThemeSlice";
import { expenseActions } from "../store/ExpenseSlice";

const MainNavigation = () =>{
const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
const expenseList = useSelector((state) => state.expenses.list);
const dispatch = useDispatch();
const history = useHistory();
    const logoutHandler = ()=> {
        dispatch(authActions.logout());
        localStorage.removeItem("token");
        history.push('/auth');
    };
   const themeHandler = () => {
    dispatch(toggleDarkMode());
    dispatch(expenseActions.deactivatePremium());
   };
   const downloadCSV = () => {
    if (!Array.isArray(expenseList)) {
      console.error("Expense list is not an array.");
      return;
    }
  
    if (expenseList.length === 0) {
      console.warn("Expense list is empty.");
      return;
    }
  
    const csvContent = "data:text/csv;charset=utf-8," +
      "Amount,Name,Category\n" +
      expenseList.map(expense => `${expense.amount},${expense.name},${expense.category}`).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
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
              <button onClick={downloadCSV}>Download Expenses</button>
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