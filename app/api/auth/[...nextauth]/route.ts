import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth";

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
                const userPost = await res.json();

                if (userPost.correoElectronico) {
                    const user = {
                        id: userPost.id,
                        name: userPost.nombre,
                        email: userPost.correoElectronico
                    };
                    return user;
                }
                else {
                    return null;
                }
            }
        })
    ]
})

export { handler as GET, handler as POST }