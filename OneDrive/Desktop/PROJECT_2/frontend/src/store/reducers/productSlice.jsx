import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        loadproduct:(state, action) => {
            // here we can not call API - sllice ke andar sirf sync actions kiye jaate hai ...
            state.products = action.payload;
        }
    }
})

export default productSlice.reducer;
export const {loadproduct} = productSlice.actions;
