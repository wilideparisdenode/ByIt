import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cartSlice.tsx"


export  const  store=configureStore({

    reducer:{
        cart:cartReducer
    }
   
})