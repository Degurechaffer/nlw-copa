import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrower from 'expo-web-browser'

WebBrower.maybeCompleteAuthSession();

interface UserProps{
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps{
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

interface AuthProviderProps{
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '179200245586-40cf5bkt981smt6nosobhvcd65ghs8j1.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: ['profile', 'email']
    })

    async function signIn() {
        try {
            setIsUserLoading(true);
            await promptAsync();
        } 
        catch (error) {
            console.log('Fodeu')
            throw error;
        } 
        finally{
            setIsUserLoading(false)
        }
    }

    async function signInWithGoggle(access_Token: string) {
        console.log("TOKEN DE AUTENTICAÇÃO ===>", access_Token)
    }

    useEffect(() =>{
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoggle(response.authentication.accessToken);
        }
    },[response])
    
    return(
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}