import { createContext, useReducer, useEffect, useCallback } from 'react';
import action from './action';
import userReducer from './reducer';
import * as Service from './service';
import * as DB from '../services/db';
const initialState = {
    refresh: false,
    is_user: false,
}

export const CustomerContext = createContext(initialState);

export const CustomerContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    async function refreshData() {
        dispatch({ type: action.REFRESH_DATA });
    }
    async function changeAdimState(state) {
        dispatch({ type: action.CHANGE_STATE, data: { state } });
    }

    const validate = useCallback(() => {
        return DB.validate();
    }, [])

    const logout = useCallback(() => {
        DB.logout();
    }, [])

    const login = useCallback(async(data) => {
        return await Service.login(data);
    }, [])
    const register = useCallback(async(data) => {
        return await Service.register(data);
    }, [])

    const changePassword = useCallback(async(data) => {
        return await Service.changePassword(data);
    }, [])

    useEffect(() => {
        (async () => {
            if (state.refresh) {
                const res = await validate();
                changeAdimState(res);
            }
        })();
    }, [state.refresh, validate])

    return (
        <CustomerContext.Provider
            value={{
                refreshData,
                changeAdimState,
                is_user: state.is_user,
                validate,
                register,
                logout,
                login,
                changePassword
            }}>
            {children}
        </CustomerContext.Provider>
    )
}