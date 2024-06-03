import Banner from "../../components/Banner/Banner";
import ChooseUs from "../../components/ChooseUs/ChooseUs";
import Footer from "../../components/Footer/Footer";
import Services from "../../components/Services/Services";
import Testimonials from "../../components/Testimonials/Testimonials";

 

const Home = () => {
    return (
        <div>
             <Banner/>
             <Services />
             <ChooseUs />
             <Testimonials/>
            
        </div>
    );
};

export default Home;