import PageBanner from "../components/PageBanner"
import Blogcards from "../components/Blogcards"

export default function Blog () {
    const bannerHeading = "Helpful Tips"
    const bannerSubHeading = "Interesting articles to help with any job you have coming up"
    return (
        <> 
            <PageBanner bannerHeading={bannerHeading} bannerSubHeading={bannerSubHeading}/>
            <Blogcards page="blog"/>
        </>
    )
}