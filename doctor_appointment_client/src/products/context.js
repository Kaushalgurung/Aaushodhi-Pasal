import { createContext, useReducer, useEffect } from 'react';
import action from './action';
import productReducer from './reducer';
import * as Services from './service';
import * as FILTER from './filters';
import { useCallback } from 'react';
const initialState = {
    filter: FILTER.ALL,
    refresh: false,
    products: [],
    pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
}

export const ProductContext = createContext(initialState);

export const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);
    async function refreshData() {
        dispatch({ type: action.REFRESH_DATA });
    }
    const getProductById = useCallback(async (id)=>{
       return await Services.getProductById(id); 
    },[])

    const addProduct = useCallback(async (values)=>{
        return await Services.addProduct(values);
    },[] )

    const updateProduct = useCallback(async (id, values)=>{
        return await Services.updateProduct(id, values);
    },[] )

    const deleteProduct = useCallback(async (id )=>{
        return await Services.deleteProduct(id );
    },[] )
    
    useEffect(() => {
        try {
            Services.getProducts().then(
                (data) => {
                    console.log(data)
                    dispatch({ type: action.SET_PRODUCTS, data: data });
                }
            );
        }
        catch (err) {
            console.log(err);
        }
    }, [state.filter, state.refresh])
    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                refreshData,
                getProductById,
                addProduct,
                updateProduct,
                deleteProduct,
                pagination: state.pagination,
            }}>
            {children}
        </ProductContext.Provider>
    )
}