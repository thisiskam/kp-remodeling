export default function PageBanner({bannerHeading, bannerSubHeading}) {
    return (
        <div
            className="jumbotron jumbotron-fluid text-white bg-dark"
            style={{
                backgroundImage: 'url("wall-orange.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'difference',
                padding: '3rem 0rem',
            }}
        >
            <div className="container text-center">
                <h1 className="display-3 fw-bold">{bannerHeading}</h1>
                <p className="lead fs-4 mt-3">
                    {bannerSubHeading}
                </p>
            </div>
        </div>
    );
}