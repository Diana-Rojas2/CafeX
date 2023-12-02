'use client'
import { useSession } from 'next-auth/react';
import Footer from "../components/footer"
import Nav from "../components/nav"
import NavB from '../components/navb';

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { data: session } = useSession();
    let navigationComponent;

    if (session && session.user.data.Id_Rol === 2) {
        navigationComponent = <Nav />; 
      } else if (session && session.user.data.Id_Rol !== 2) {
        navigationComponent = <NavB />; 
      } else {
        navigationComponent = <Nav />; 
      }
    
    return (
        <>
                {navigationComponent}

        <div className="container">
            {children}
        </div>
        <Footer></Footer>
        </>
    )
}

export default layout