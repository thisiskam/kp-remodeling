import HomeBanner from "../components/HomeBanner"
import Mission from "../components/Mission"
import Blogcards from "../components/Blogcards"
import HomeCarousel from "../components/HomeCarousel"
import Google from "../components/Google";
import Footer from "../components/Footer";

export default function Home () {
    return (
        <> 
            <HomeBanner />
            <Mission />
            <Blogcards />
            <HomeCarousel/>
            <Google />
            <Footer />
        </>
    )
} 