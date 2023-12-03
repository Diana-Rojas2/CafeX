'use client'
import { useSession } from 'next-auth/react';
import Footer from "../components/footer"
import NavB from "../components/navb"
import Nav from '../components/nav';

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { data: session } = useSession();
    
    return (
        <>
        {session ? session.user.data.Id_Rol === 2 ? <Nav /> : <NavB /> : <Nav />}
        <div className="container">
            {children}
        </div>
        <Footer></Footer>
        </>
    )
}

export default layout