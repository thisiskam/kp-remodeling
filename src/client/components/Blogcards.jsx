import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Blogcards (page){
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate()
    

    useEffect (() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blog");
                  const data = await res.json();
                  
                  setBlogs(data);
                  console.log("fetched blogs successfully");
                  
            } catch (error) {
                console.error(error)
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

    function getFirst30Words(summary) {
        // Split the summary by spaces into an array of words
        const words = summary.split(' ');
      
        // Slice the array to get the first 30 words and join them back into a string
        const first30Words = words.slice(0, 30).join(' ');
      
        return first30Words;
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
                            <img className="card-img-top rounded shadow-lg hover-shadow-lg" src={blog.header_img} alt={blog.title}/>
                            <div className="card-body">
                                <h5 className="card-title py-2">{blog.title}</h5>
                                <p className="card-text">{blog.summary}<a className="small-grey-link"><span>    </span> keep reading</a></p>
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
                        <img className="card-img-top rounded shadow-lg hover-shadow-lg" src={blog.header_img} alt={blog.title}/>
                        <div className="card-body">
                            <h5 className="card-title py-2">{blog.title}</h5>
                            <p className="card-text">{getFirst30Words(blog.summary) + "..."}<a className="small-grey-link"><span>    </span> keep reading</a></p>
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