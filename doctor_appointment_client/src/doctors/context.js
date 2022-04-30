import { createContext, useReducer, useEffect } from 'react';
import action from './action';
import doctorReducer from './reducer';
import * as Services from './service';
import * as FILTER from './filters';
import { useCallback } from 'react';
const initialState = {
    filter: FILTER.ALL,
    refresh: false,
    doctors: [],
    pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
}

export const DoctorContext = createContext(initialState);

export const DoctorContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(doctorReducer, initialState);
    async function refreshData() {
        dispatch({ type: action.REFRESH_DATA });
    }
    const getDoctorById = useCallback(async (id)=>{
       return await Services.getDoctorById(id); 
    },[])

    const addDoctor = useCallback(async (values)=>{
        return await Services.addDoctor(values);
    },[] )

    const updateDoctor = useCallback(async (id, values)=>{
        return await Services.updateDoctor(id, values);
    },[] )

    const deleteDoctor = useCallback(async (id )=>{
        return await Services.deleteDoctor(id );
    },[] )
    
    useEffect(() => {
        try {
            Services.getDoctors().then(
                (data) => {
                    dispatch({ type: action.SET_DOCTORS, data: data });
                }
            );
        }
        catch (err) {
            console.log(err);
        }
    }, [state.filter, state.refresh])
    return (
        <DoctorContext.Provider
            value={{
                doctors: state.doctors,
                refreshData,
                getDoctorById,
                addDoctor,
                updateDoctor,
                deleteDoctor,
                pagination: state.pagination,
            }}>
            {children}
        </DoctorContext.Provider>
    )
}