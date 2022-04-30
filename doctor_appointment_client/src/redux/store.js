import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartRedux.js'

export default configureStore({
    reducer : {
        cart : cartReducer
    }
})