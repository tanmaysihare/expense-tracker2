import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import expenseReducer from "./ExpenseSlice";

const ReduxStore = configureStore({
    reducer: {
      expenses: expenseReducer,
      auth: authReducer ,
    },
  });
  
  export default ReduxStore;