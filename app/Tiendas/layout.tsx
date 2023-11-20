import Footer from "../components/footer"
import Nav from "../components/nav"
import NavB from "../components/navb"

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
        <NavB></NavB>
        <div className="container">
            {children}
        </div>
        <Footer></Footer>
        </>
    )
}

export default layout