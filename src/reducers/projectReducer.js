const projectReducer = (state={},action) => 
{

    switch(action.type)
    {
        case 'CREATE_PROJECT':
            return state;
        case 'CREATE_PROJECT_ERROR':
            return state;

        case 'DELETE_PROJECT':
            return state;
        case 'DELETE_PROJECT_ERROR':

            return{
                ...state,
                projectDelError:action.error
            }
        default :
            return state;

    }
     
}
export default projectReducer ; 