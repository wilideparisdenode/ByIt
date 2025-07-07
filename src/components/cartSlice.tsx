import { createSlice } from "@reduxjs/toolkit";
import type {  PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./types/types";


// Define the type for the initial state
interface CartState {
    products: Product[];
}

const initialState: CartState = {
    products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to the cart
    addItem: (state, action: PayloadAction<Product>) => {
        const existingItem = state.products.find((item) => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity = (existingItem.quantity || 0) + 1; // Increment quantity
        } else {
          state.products.push({ ...action.payload, quantity: 1 }); // Add new item with default quantity
        }
      },
    // Remove item from the cart
    removeItem: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },
    // Update the quantity of an item in the cart
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state, _) => {
       state.products=[];
      },
  },
});

// Export actions
export const { addItem, removeItem, updateQuantity ,clearCart} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;