import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Blogcards (page){
    const [blogs, setBlogs] = useState([]);
    const [blogHeaderImage, setBlogHeaderImage] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    

    useEffect (() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blog");
                if (!res.ok) {
                    throw new Error("Failed to fetch blogs");
                  }
                  const data = await res.json();
                  setBlogs(data);
                  console.log("fetched blogs successfully");
                  
            } catch (error) {
                setError(error.message);
            }  
        };
        fetchBlogs();
    }, [])

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
                {page.page === "home" ? 
                <>
                <h1 className="display-5 mt-5 text-secondary">From Our Blog</h1>
                <div className="row mx-lg-5 px-lg-5 mx-2 px-2 mt-5"> 
                    {blogs && blogs.map((blog) => (
                        <div key={blog.id} className="col-12 col-md-4 card border-0 p-4 bg-transparent" onClick={() => navigate(`../blog/${blog.id}`)}>
                            <img className="card-img-top rounded shadow-lg hover-shadow-lg" src={blog.header_image} alt={blog.title}/>
                            <div className="card-body">
                                <h5 className="card-title py-2">{blog.title}</h5>
                                <p className="card-text">{blog.preview + "...  "}<a className="small-grey-link"><span>    </span> keep reading</a></p>
                                <p className="card-text"><small className="text-muted">Posted {daysSinceBlogPost(blog.created_at)} days ago</small></p>
                            </div>
                        </div> 
                    ))}
                </div> 
                </>
                : 
                <div className="row mx-lg-5 px-lg-5 mx-2 px-2 moved-up-more"> 
                {blogs && blogs.map((blog) => (
                    <div key={blog.id} className="col-12 col-md-4 card border-0 p-4 bg-transparent" onClick={() => navigate(`../blog/${blog.id}`)}>
                        <img className="card-img-top rounded shadow-lg hover-shadow-lg" src={blog.header_image} alt={blog.title}/>
                        <div className="card-body">
                            <h5 className="card-title py-2">{blog.title}</h5>
                            <p className="card-text">{blog.preview + "...  "}<a className="small-grey-link"><span>    </span> keep reading</a></p>
                            <p className="card-text"><small className="text-muted">Posted {daysSinceBlogPost(blog.created_at)} days ago</small></p>
                        </div>
                    </div> 
                ))}
                </div>
                }
            </div>
        </>
    ) 
}