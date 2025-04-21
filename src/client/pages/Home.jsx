import HomeBanner from "../components/HomeBanner"
import Mission from "../components/Mission"
import Blogcards from "../components/Blogcards"
import HomeCarousel from "../components/HomeCarousel"
import GooglePresenceBox from "../components/Google";

export default function Home () {
    return (
        <> 
            <HomeBanner />
            <Mission />
            <Blogcards page="home"/>
            <HomeCarousel/>
            <GooglePresenceBox />
        </>
    )
} 