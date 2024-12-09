import PageBanner from "../components/PageBanner";
import ContactForm from "../components/ContactForm"
import EstimatePageDetailsContainer from "../components/EstimatePageDetailsContainer";
import Google from "../components/Google";
import LocationsBox from "../components/LocationBox";

export default function Estimate () {
    const bannerHeading = "Estimates"
    const bannerSubHeading = "We'd love to hear how we can assist you with all your home remodeling needs"
    return (
        <> 
            <PageBanner bannerHeading={bannerHeading} bannerSubHeading={bannerSubHeading}/>
            <div className="container w-100 mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row m-2">
                            <EstimatePageDetailsContainer />
                        </div>
                        <div className="row m-2">
                            <ContactForm />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row m-2">
                            <LocationsBox />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}