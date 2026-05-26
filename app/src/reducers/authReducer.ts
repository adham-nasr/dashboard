
export const ACTION_TYPES = {
    SET:"set",
    DELETE:"delete"
}
export function authReducer(user,action){

    switch(action.type)
    {
        case ACTION_TYPES.SET:{
            return {...action.payload}
        }
        case ACTION_TYPES.DELETE:{
            return {}
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}