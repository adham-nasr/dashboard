

import { createContext, useReducer, } from 'react';
import { authReducer } from '../reducers/authReducer';
import type { AuthContextType } from '../utils/types';



export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider ({children}:any){

    const [user,dispatch] = useReducer(authReducer,null)

    return(
        <AuthContext.Provider value={{user,dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}
