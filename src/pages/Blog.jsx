import PageBanner from "../components/PageBanner"

export default function Blog () {
    const bannerHeading = "Helpful Tips"
    const bannerSubHeading = "Interesting articles to help with any job you have coming up"
    return (
        <> 
            <PageBanner bannerHeading={bannerHeading} bannerSubHeading={bannerSubHeading}/>
        </>
    )
}