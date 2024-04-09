import { createContext, useContext, useState } from "react";

import { STUDENT_DASHBOARD_ROUTE } from "../router";
import StudentApi from './../services/api/Student/StudentApi';

export const UserstateContext = createContext({
    user: {},
    authenticated: false,
    setUser: () => { },
    logout: () => { },
    login: (email,password) => { },
    setAuthenticated:()=>{},
});

export default function UserContext({ children }) {

    const [user, setUser] = useState({
        name: '',
        email: '',
    });
    const [authenticated, _setAuthenticated] = useState(window.localStorage.getItem('Authenticated'));
    
    const login = async (email, password) => {
        await StudentApi.getcsrf();
        return await StudentApi.login(email, password);
    }

    const logout = () => {
        setUser({name:'',email:''})
        _setAuthenticated(false);
     };
     const setAuthenticated= (isAuthenticated)=>{
        _setAuthenticated(isAuthenticated)
        window.localStorage.setItem('Authenticated',isAuthenticated)
     }

    return (
        <UserstateContext.Provider value={{ user, authenticated, setAuthenticated, setUser, login, logout }}>
            {children}
        </UserstateContext.Provider>
    );
};


export const useUserContext = () => useContext(UserstateContext); 