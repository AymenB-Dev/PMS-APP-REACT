
const authReducer = (state={},action) => 
{
    switch(action.type)
    {
        case 'LOGIN_SUCCESS' :
            return {
                ...state,
                authError:null
            };
        case 'LOGIN_FAILED' :
            return {
                ...state,
                authError:'login error'
            }

        case 'SIGNOUT_SUCCESS' :
            return{
                state
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError:null,
            }
        case 'SIGNUP_FAILED':
            return {
                ...state,
                authError: 'sign up error'
            }
        default:
            return state;
    }
}
    

export default authReducer ; 