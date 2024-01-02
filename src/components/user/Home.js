import classes from './Home.module.css';
import ExpenseForm from '../expense/ExpenseForm';
import ProfileCompletion from '../auth/ProfileCompletion';
import { useSelector } from 'react-redux';

const Home = ()=> {
  const isProfileUpdated = useSelector((state)=> state.auth.isProfileUpdated);
  console.log("in home",isProfileUpdated);
  return (
    <>
  
    <div>
     <section className={classes.starting}>
          <h1>Welcome to expense tracker</h1>
      
        { !isProfileUpdated && 
          <div>
            <ProfileCompletion />
          </div>
        }
         {isProfileUpdated && 
          <div>
          <ExpenseForm/>
         </div>
         } 
        </section>
        </div>
        
        
    </>
    );
};
export default Home;