import ACTIONS from './action'
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.REFRESH_DATA:
            return { ...state, refresh: !state.refresh };
        case ACTIONS.CHANGE_STATE:
            return { ...state, is_admin: action.data.state};
        default:
            return state;
    }
}
export default reducer;