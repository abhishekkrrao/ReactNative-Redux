import * as ACTIONS from '../Action';
const newState = { islogin: false };
function Auth(state, action) {
    switch (action.type) {
        case ACTIONS.GET_USER_DETAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: false,
                userDetail: action.data
            }
        }
        case ACTIONS.AUTH_SIGN_IN: {
            return {
                ...state,
                loading: false,
                user: action.data
            }
        }
        case ACTIONS.AUTH_SET_LOGGEDIN: {
            return {
                ...state,
                loading: false,
                islogin: action.isLoggedIn
            }
        }
        case ACTIONS.GET_PROFILE_DETAIL: {
            return {
                ...state,
                loading: true,
                loaded: false,
                profileStatusLoaded: false,
                error: false,
            }
        }
        case ACTIONS.GET_USER_DETAIL_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: false,
                userDetail: action.data
            }
        }
        case ACTIONS.GET_USER_DETAIL_FAIL:
        default:
            return state || newState;
    }
}
export { Auth };