import Footer from "../components/footer"
import Nav from "../components/nav"

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
        <Nav></Nav>
        <div className="container">
            {children}
        </div>
        <Footer></Footer>
        </>
    )
}

export default layout