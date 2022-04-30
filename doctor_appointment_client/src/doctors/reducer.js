import ACTIONS from './action'
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_DOCTORS:
            return { ...state, doctors: action.data }
        case ACTIONS.REFRESH_DATA:
            return { ...state, refresh: !state.refresh };
        default:
            return state;
    }
}
export default reducer;