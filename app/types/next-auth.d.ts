import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      data: {
        Id: number;
        Correo_Electronico: string;
        Id_Rol: number;
      };
      token: string;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    Id_Rol: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    Id_Rol: number;
  }
}
