import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action) => {
     const item = state.products.find((item) =>item._id === action.payload.id);

     if(item){
        item.quantity+=action.payload.quantity;
     }else{
        state.products.push(action.payload);
     }
    },
    removeItem: (state, action) => {
      state.products= state.products.filter((item)=> item._id !== action.payload);
      state.products = removeItem;
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);
      if(item.quantity == 1){
        state.products= state.products.filter((item)=> item._id !== action.payload);
      state.products = removeItem;
        }else{
          item.quantity--;
        }
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart, incrementQuantity, decrementQuantity } = cartSlice.actions

export default cartSlice.reducer;