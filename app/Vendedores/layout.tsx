'use client'
import Footer from "../components/footer"
import Nav from "../components/nav";
import NavB from "../components/navb"
import { useSession } from 'next-auth/react';

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { data: session } = useSession();
    return (
        <>
        {session && session.user.data.Id_Rol === 2 ? (
        <Nav />
      ) : (
        <NavB />
      )}
        <div className="container">
            {children}
        </div>
        <Footer></Footer>
        </>
    )
}

export default layout