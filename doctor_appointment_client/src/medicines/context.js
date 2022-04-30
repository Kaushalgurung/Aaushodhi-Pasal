import { createContext, useReducer, useEffect } from 'react';
import action from './action';
import medicineReducer from './reducer';
import * as Services from './service';
import * as FILTER from './filters';
import { useCallback } from 'react';
const initialState = {
    filter: FILTER.ALL,
    refresh: false,
    medicines: [],
    pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
}

export const MedicineContext = createContext(initialState);

export const MedicineContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(medicineReducer, initialState);
    async function refreshData() {
        dispatch({ type: action.REFRESH_DATA });
    }
    const getMedicineById = useCallback(async (id)=>{
       return await Services.getMedicineById(id); 
    },[])

    const addMedicine = useCallback(async (values)=>{
        return await Services.addMedicine(values);
    },[] )

    const updateMedicine = useCallback(async (id, values)=>{
        return await Services.updateMedicine(id, values);
    },[] )

    const deleteMedicine = useCallback(async (id )=>{
        return await Services.deleteMedicine(id );
    },[] )
    
    useEffect(() => {
        try {
            Services.getMedicines().then(
                (data) => {
                    console.log(data)
                    dispatch({ type: action.SET_MEDICINES, data: data });
                }
            );
        }
        catch (err) {
            console.log(err);
        }
    }, [state.filter, state.refresh])
    return (
        <MedicineContext.Provider
            value={{
                medicines: state.medicines,
                refreshData,
                getMedicineById,
                addMedicine,
                updateMedicine,
                deleteMedicine,
                pagination: state.pagination,
            }}>
            {children}
        </MedicineContext.Provider>
    )
}