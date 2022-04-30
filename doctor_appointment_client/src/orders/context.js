import { createContext, useReducer, useEffect } from 'react';
import action from './action';
import orderReducer from './reducer';
import * as Services from './services';
import { useCallback } from 'react';
const initialState = {
    refresh: false,
    orders: [],
    pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
}

export const OrderContext = createContext(initialState);

export const OrderContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, initialState);
    async function refreshData() {
        dispatch({ type: action.REFRESH_DATA });
    }
    const addOrder= useCallback(async (values)=>{
        return await Services.addOrder(values);
    },[] )
    const approveOrder= useCallback(async (id)=>{
        return await Services.approveOrder(id);
    },[] )
    const deleteOrder= useCallback(async (id)=>{
        return await Services.deleteOrder(id);
    },[] )
    const completeOrder= useCallback(async (id)=>{
        return await Services.completeOrder(id);
    },[] )
    
    useEffect(() => {
        try {
            Services.getOrders().then(
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
        <OrderContext.Provider
            value={{
                orders: state.orders,
                addOrder,
                completeOrder,
                approveOrder,
                deleteOrder,
                refreshData,
                pagination: state.pagination,
            }}>
            {children}
        </OrderContext.Provider>
    )
}