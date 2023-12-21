import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    list:[],
    premiumActivated : false,
    editExpense : false,
    editingList:[],
  },
  reducers: {
    addExpense: (state, action) => {
      state.list.push(action.payload);
    },
    editExpense:(state,action) => {
      state.editExpense = true;
      state.editingList.push(action.payload);
    },
    afterEdit:(state)=>{
      state.editExpense = false;
      state.editingList=[];
    },
    setExpenses:(state,action) => {
      state.list = action.payload;
    },
    deleteExpense: (state, action) => {
     state.list = state.list.filter(expense => expense.id !== action.payload);
    },
   activatePremium: (state) => {
      state.premiumActivated = true;
    },
    // Add other reducer logic as needed 
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
