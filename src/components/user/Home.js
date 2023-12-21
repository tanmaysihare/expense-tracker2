import classes from './Home.module.css';
import ExpenseForm from '../expense/ExpenseForm';

const Home = ()=> {
    return (
    <>
     <section className={classes.starting}>
          <h1>Welcome to expense tracker</h1>
          <div>
           <ExpenseForm/>
          </div>
        </section>
    </>
    );
};
export default Home;