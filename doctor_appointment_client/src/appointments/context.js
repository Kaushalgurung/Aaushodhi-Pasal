import { createContext, useReducer, useEffect } from 'react';
import action from './action';
import appointmentReducer from './reducer';
import * as Services from './services';
import { useCallback } from 'react';
const initialState = {
    refresh: false,
    appointments: [],
    pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
}

export const AppointmentContext = createContext(initialState);

export const AppointmentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appointmentReducer, initialState);
    async function refreshData() {
        dispatch({ type: action.REFRESH_DATA });
    }
    const addAppointment= useCallback(async (values)=>{
        return await Services.addAppointment(values);
    },[] )
    const approveAppointment= useCallback(async (id)=>{
        return await Services.approveAppointment(id);
    },[] )
    const deleteAppointment= useCallback(async (id)=>{
        return await Services.deleteAppointment(id);
    },[] )
    const completeAppointment= useCallback(async (id)=>{
        return await Services.completeAppointment(id);
    },[] )
    
    useEffect(() => {
        try {
            Services.getAppointments().then(
                (data) => {
                    dispatch({ type: action.SET_APPOINTMENTS, data: data });
                }
            );
        }
        catch (err) {
            console.log(err);
        }
    }, [state.filter, state.refresh])
    return (
        <AppointmentContext.Provider
            value={{
                appointments: state.appointments,
                addAppointment,
                completeAppointment,
                approveAppointment,
                deleteAppointment,
                refreshData,
                pagination: state.pagination,
            }}>
            {children}
        </AppointmentContext.Provider>
    )
}