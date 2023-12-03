import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth";
import { profile } from "console";

const handler = NextAuth({
    providers: [
        
        CredentialsProvider({
            
            name: "Credentials",
            credentials: {
                usuario: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(
                    `http://localhost:8080/Usuario/login`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            usuario: credentials?.usuario,
                            pwd: credentials?.password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    }
                );
                const user = await res.json();
                console.log(user);
                if (user.error) {

                    throw user;
                }
                else {
                    return user;
                }
            }
        })
    ],
    callbacks : {
        async jwt({token, user}){
            if(user) token.Id_Rol = user.Id_Rol;
           return {...token, ...user};
        },
        async session({session, token}){
            session.user = token as any;
            if(session.user) session.user.data.Id_Rol = token.Id_Rol;
            return session;
        }
    },
    pages:{
        signIn: "/Login",
        signOut: "/Login"
    }
})

export { handler as GET, handler as POST }