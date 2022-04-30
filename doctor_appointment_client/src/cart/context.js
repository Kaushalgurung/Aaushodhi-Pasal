import { createContext, useReducer, useEffect } from 'react';
import action from './action';
import cartReducer from './reducer';
import * as Services from './services';
import { useCallback } from 'react';
const initialState = {
    refresh: false,
    carts: [],
    pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
}

export const CartContext = createContext(initialState);

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    async function refreshData() {
        dispatch({ type: action.REFRESH_DATA });
    }
    const addCart= useCallback(async (values)=>{
        return await Services.addCart(values);
    },[] )
    const approveCart= useCallback(async (id)=>{
        return await Services.approveCart(id);
    },[] )
    const deleteCart= useCallback(async (id)=>{
        return await Services.deleteCart(id);
    },[] )
    const completeCart= useCallback(async (id)=>{
        return await Services.completeCart(id);
    },[] )
    
    useEffect(() => {
        try {
            Services.getCarts().then(
                (data) => {
                    dispatch({ type: action.SET_ORDERS, data: data });
                }
            );
        }
        catch (err) {
            console.log(err);
        }
    }, [state.filter, state.refresh])
    return (
        <CartContext.Provider
            value={{
                carts: state.carts,
                addCart,
                completeCart,
                approveCart,
                deleteCart,
                refreshData,
                pagination: state.pagination,
            }}>
            {children}
        </CartContext.Provider>
    )
}