import { useNavigate } from "react-router-dom";

export default function Blogcards (){
    const nav = useNavigate()

    const blogCards = [
        {
            img: 'https://sccpublic.s3-external-1.amazonaws.com/sys-master/images/h66/h44/8951857414174/thinset_group_sq.jpg',
            alt: "schluder products",
            title: "Is Schluter Worth the Extra Money",
            description: "Is Schluter worth the investment? In our latest blog post, we dive deep into the pros and cons of using Schluter systems in your home projects",
            date: "2024-08-03",
        },
        {
            img: 'https://images.thdstatic.com/productImages/2a878cdd-d9ab-4d5f-893c-6785e93c7e93/svn/vevor-tile-cutters-czqgj1200mmsddgdzv0-31_600.jpg',
            alt: "snap cutter",
            title: "When Should I Use a Snap Cutter",
            description: "Wondering when to use a snap cutter for your tile projects? Our latest blog post breaks down the best scenarios for using this handy tool.",
            date: "2024-07-15",
        },
        {
            img: 'https://allmarbletiles.com/cdn/shop/products/IMG_3352_1024x1024@2x.jpg?v=1693414571',
            alt: 'glass tiles',
            title: "Pros and Cons of Installing Glass Tiles",
            description: "Curious about the pros and cons of using glass tiles in your home? This blog post explores everything you need to know before making your decision.",
            date: "2024-06-25",
        }
    ];

    function daysSinceBlogPost(date) {
        const oneDay = 24 * 60 * 60 * 1000;
        const today = new Date();
        const pastDate = new Date(date);
        const differenceInDays = Math.round((today - pastDate) / oneDay);
        return differenceInDays;
    }
    
    return (
        <>
            <div className="align-items-center d-flex flex-column">
                <h1 className="display-5 mt-5 text-secondary">From Our Blog</h1>
                <div className="row mx-lg-5 px-lg-5 mx-2 px-2 mt-5">
                    {blogCards.map((blogcard, index) => (
                        <div key={index} className="col-12 col-md-4 card border-0 p-4">
                            <img className="card-img-top rounded" src={blogcard.img} alt={blogcard.alt}/>
                            <div className="card-body">
                                <h5 className="card-title py-2">{blogcard.title}</h5>
                                <p className="card-text">{blogcard.description}</p>
                                <button className="btn bg-dark text-white my-2" onClick={() => nav('/blog')}>Read Full Blog Post</button>
                                <p className="card-text"><small className="text-muted">Posted {daysSinceBlogPost(blogcard.date)} days ago</small></p>
                            </div>
                        </div>
                    ))}
                </div>
                <i className="bi bi-chevron-compact-down fs-1 mt-3"></i>
            </div>
        </>
    ) 
}