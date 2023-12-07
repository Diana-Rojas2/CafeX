import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth";
import { profile } from "console";

const handler = NextAuth({
    providers: [
        
        CredentialsProvider({
            
            name: "Credentials",
            credentials: {
                usuario: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}Usuario/login`,
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
            console.log("Usuario: " + user)
            if(user){
                token.Id_Rol = user.Id_Rol;
                console.log("Rol: ",user.Id_Rol);
            } else{
                console.log("oo");
            }
           return {...token, ...user};
        },
        async session({session, token}){
            session.user = token as any;
            if(session.user) session.user.data.Id_Rol = token.Id_Rol;
            return session;
        }
    },
    pages:{
        signIn: "/Login"
    }
})

export { handler as GET, handler as POST }