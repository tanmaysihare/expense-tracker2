import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import expenseReducer from "./ExpenseSlice";
import themeReducer from "./ThemeSlice";

const ReduxStore = configureStore({
    reducer: {
      expenses: expenseReducer,
      auth: authReducer ,
      theme: themeReducer,
    },
  });
  
  export default ReduxStore;