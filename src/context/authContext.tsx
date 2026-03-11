import { refreshAccessToken } from "@/api/auth";
import { setStoredAccessToken } from "@/lib/authToken";
import { useContext, createContext, useState, type ReactNode, useEffect } from "react";

type authContextType = {
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    user: {id:string, name:string, email:string} | null,
    setUser: (user: authContextType['user']) => void;
    authLoading: boolean,
    setAuthLoading: (val: boolean) => void,
}

const AuthContext = createContext<authContextType | undefined>(undefined);

let resolveAuthReady!: () => void;
export const authReady = new Promise<void>(res => { resolveAuthReady = res });

export const AuthProvider = ({children}: {children:ReactNode}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<authContextType['user'] | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    useEffect(() => {
        const loadAuth = async () => {
            try {
                const { accessToken: newToken, user } = await refreshAccessToken();
                setAccessToken(newToken);
                setUser(user);
                setStoredAccessToken(newToken); 
            } catch (err: any) {
                console.error("Auth error", err?.message);
                setStoredAccessToken(null); 
            } finally {
                setAuthLoading(false);
            }
        }
        loadAuth();
    }, []); 
    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, user, setUser, authLoading, setAuthLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be in a provider");
    return context;
}