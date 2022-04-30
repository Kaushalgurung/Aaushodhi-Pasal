import ACTIONS from './action'
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_PRODUCTS:
            return { ...state, products: action.data }
        case ACTIONS.REFRESH_DATA:
            return { ...state, refresh: !state.refresh };
        default:
            return state;
    }
}
export default reducer;