import React, {useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { expenseActions } from "../store/ExpenseSlice";
import ExpenseList from "./ExpenseList";
import {db} from "../../firebase";
import { ref, set, push} from "firebase/database";
import { toggleDarkMode } from "../store/ThemeSlice";

const ExpenseForm = ()=>{
    const [amount,setAmount] = useState('');
    const [exName,setName] = useState('');
    const [category,setCategory] = useState('');
    const editingStatus = useSelector((state)=> state.expenses.editExpense);
    const userId = useSelector((state)=> state.auth.userId);
    const premium = useSelector((state)=>state.expenses.premiumActivated);
    const dispatch = useDispatch();
    console.log("is premium on or off: ",premium);
    
    const submitHandler = (event) => {
        event.preventDefault();
      
      if(amount >= 10000 && !premium){
        dispatch(expenseActions.activatePremium());
        dispatch(toggleDarkMode());
        console.log("if is running");
   
      }else{
        dispatch(expenseActions.deactivatePremium());
       // dispatch(toggleDarkMode());
        console.log("else is running");
      }
        if (!exName || !amount || !category) {
          alert('Please enter the inputs correctly');
        } else {
          const expensesRef = ref(db, `${userId}/Expenses`);
          const newExpenseRef = push(expensesRef); // Use push to automatically generate a unique ID
      
          set(newExpenseRef, {
            id: newExpenseRef.key,
            amount: amount,
            name: exName,
            category: category,
          });
          setAmount('');
          setCategory('');
          setName('');
        }
      };

        return(
      <section>
        {!editingStatus && <div style={{border:'dashed 2px red',margin:'2rem',padding:'2rem'}}>
            <h2>Expense Tracker</h2>
           <form  onSubmit={submitHandler}> 
                <label style={{margin:'1rem',padding:'1rem'}}>Amount Spend : <input style={{margin:'1rem'}} type="number" value={amount} onChange={(e)=> setAmount(e.target.value)} /></label>
                <label style={{margin:'1rem',padding:'1rem'}}>Provide Name On What You Spend : <input style={{margin:'1rem'}} type="text" value={exName} onChange={(e)=> setName(e.target.value)} /></label>
                <label style={{margin:'1rem',padding:'1rem'}}>Please Select An Category : <select style={{margin:'0.5rem'}} value={category} onChange={(e)=> setCategory(e.target.value)}>
                    <option>Select Category</option>
                    <option value="Food" >Food</option>
                    <option value="Transport" >Transportation</option>
                    <option value="Home Spends" >Home Spends</option>
                    </select></label>
                    <button style={{borderRadius:'8px',height:'1.72rem',color:'white',backgroundColor:'#38015c',margin:'1rem'}}>Add Expense</button>
            </form> 
         </div>}
        <ExpenseList/>
      </section>
    );
};
export default ExpenseForm;