import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request : NextRequestWithAuth){
    console.log(request.nextUrl.pathname);
    console.log(request.nextauth.token);
    if(request.nextUrl.pathname.startsWith("/Admin") && request.nextauth.token?.Id_Rol !== 1){
      return NextResponse.rewrite(new URL("/NoAutorizado",request.url))
    }
  },
  {
     callbacks:{
      ///authorized : ({ token }) => token?.role === "Admin" || token?.role === "Vendedor"
      authorized : ({ token }) => !!token
     },

  }
)
export const config = {
  matcher: ["/Usuarios/:path*","/Admin/:path*"],
};