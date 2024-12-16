import React, {useCallback, useContext, useState} from 'react';
import {setApiToken} from "./useApi";

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

export function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState(null);
    const [sessionUser, setSessionUser] = useState(null);

    const handleLoginResult = useCallback(
        (loginResult) => {            
            setApiToken(loginResult.token);
            setAuthToken(loginResult.token);
            setSessionUser(loginResult.user);
        },
        [setAuthToken, setSessionUser, setApiToken]
    );
    const logout = useCallback(
        () => {
            handleLoginResult({token: false, user: {}});
            setSessionUser(null);
        },
        [handleLoginResult]
    );
    return (
        <AuthContext.Provider value={{authToken, sessionUser, handleLoginResult, logout, setSessionUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}