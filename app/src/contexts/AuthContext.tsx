

import { createContext, useReducer, useState } from 'react';
import { authReducer } from '../reducers/authReducer';
import type { AuthContextType, User } from '../utils/types';



export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider ({children}){

    const [user,dispatch] = useReducer(authReducer,null)

    return(
        <AuthContext.Provider value={{user,dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}
