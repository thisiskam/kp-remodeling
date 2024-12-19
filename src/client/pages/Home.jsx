import HomeBanner from "../components/HomeBanner"
import Mission from "../components/Mission"
import Blogcards from "../components/Blogcards"
import HomeCarousel from "../components/HomeCarousel"
import Google from "../components/Google";

export default function Home () {
    return (
        <> 
            <HomeBanner />
            <Mission />
            <Blogcards page="home"/>
            <HomeCarousel/>
            <Google />
        </>
    )
} 