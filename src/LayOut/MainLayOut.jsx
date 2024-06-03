import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";


const MainLayOut = () => {
    return (
        <div>
              <NavBar />
             <Outlet/>
             <Footer/>
        </div>
    );
};

export default MainLayOut;