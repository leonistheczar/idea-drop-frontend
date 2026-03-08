import { useContext, createContext, useState, type ReactNode } from "react";
type authContextType = {
    accessToken: string | null,
    setAccessToken: (token: string) => void,
    user: {id:string, name:string, email:string} | null,
    setUser: (user: authContextType['user']) => void;
}
const AuthContext = createContext<authContextType | undefined>(undefined);
export const AuthProvider = ({children}: {children:ReactNode}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [user, setUser] = useState<authContextType['user'] | null>(null);
    return(
        <AuthContext.Provider value={{accessToken, setAccessToken, user, setUser}}>
        {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be in a provider");
    return context;
}
