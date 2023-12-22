import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../store/ExpenseSlice";
import { db } from "../../firebase";
import { ref, onValue, remove,update } from "firebase/database";

const ExpenseList = () => {
  const expenseList = useSelector((state) => state.expenses.list);
  const editingStatus = useSelector((state)=> state.expenses.editExpense);
  const selectedExpense = useSelector((state) => state.expenses.editingList[0]);
  const userId = useSelector((state)=> state.auth.userId);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [exName, setName] = useState("");
  const [category, setCategory] = useState("");
// for get request 
  useEffect(() => {
    const expensesRef = ref(db, `${userId}/Expenses`);
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const expensesArray = Object.values(data);
        dispatch(expenseActions.setExpenses(expensesArray));
      }
    });
    // Cleanup the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [dispatch,userId]);

  //for edit
  const editHandler = (expense)=> {
    dispatch(expenseActions.editExpense(expense));
    setAmount(expense.amount);
    setName(expense.name);
    setCategory(expense.category);
  };
  const updateHandler =  () => {
        
            // Update the expense in the database
             update(ref(db, `${userId}/Expenses/${selectedExpense.id}`), {
              amount: amount,
              name: exName,
              category: category,
            });
            dispatch(expenseActions.afterEdit());
            setAmount("");
            setName("");
            setCategory("");
          
  };


  //for delete
  const deleteHandler = async(expenseId)=>{
    try{
        await remove(ref(db,`expenses/${expenseId}`));
        dispatch(expenseActions.deleteExpense(expenseId));
    }catch(error){
        console.error("error deleting expense:", error.massage);
    }
  };

  return (
    <section>
          {editingStatus && selectedExpense && 
           <div style={{border:'dashed 2px red',margin:'2rem',padding:'2rem'}}>
            <h2>Expense Tracker</h2>
           <form  onSubmit={updateHandler}> 
                <label style={{margin:'1rem',padding:'1rem'}}>Amount You Spend : <input style={{margin:'1rem'}} type="number" value={amount} onChange={(e)=> setAmount(e.target.value)} /></label>
                <label style={{margin:'1rem',padding:'1rem'}}>On What You Spend Give Name : <input style={{margin:'1rem'}} type="text" value={exName} onChange={(e)=> setName(e.target.value)} /></label>
                <label style={{margin:'1rem',padding:'1rem'}}>Select An Category : <select style={{margin:'0.5rem'}} value={category} onChange={(e)=> setCategory(e.target.value)}>
                    <option>Select Category</option>
                    <option value="Food" >Food</option>
                    <option value="Transport" >Transportation</option>
                    <option value="Home Spends" >Home Spends</option>
                    </select></label>
                    <button style={{borderRadius:'8px',height:'1.72rem',color:'white',backgroundColor:'#38015c',margin:'1rem'}}>Update Expense</button>
            </form> 
         </div>}
            
      <div style={{border:'dashed 2px blue', margin:'1rem'}}>
        <h2>Expense List</h2>
        <ul style={{color:'red', margin:'1rem',textAlign:'center',padding:'1rem'}}>
          {expenseList.map((expense) => (
            <li key={expense.id} style={{margin:'0.2rem',padding:'0.2rem',listStyle:'none'}}>
             <strong style={{color:'green',margin:'0.3rem',padding:'0.2rem'}}>Amount: </strong> {expense.amount},<strong style={{color:'blue',margin:'0.3rem',padding:'0.2rem'}}> Name: </strong> {expense.name},<strong style={{color:'olive',margin:'0.3rem',padding:'0.2rem'}}> Category:</strong> {expense.category}
                <button style={{borderRadius:'8px',height:'1.72rem',color:'white',backgroundColor:'#38015c',margin:'1rem'}} onClick={()=> editHandler(expense)}>Edit</button>
                <button style={{borderRadius:'8px',height:'1.72rem',color:'white',backgroundColor:'#38015c',margin:'1rem'}} onClick={()=> deleteHandler(expense.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
};

export default ExpenseList;
