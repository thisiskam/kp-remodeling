import { useState , useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PageBanner from "../components/PageBanner"

export default function BlogSingle () {
    const { id } = useParams()
    const [blog, setBlog] = useState()
    const [blogContent, setBlogContent] = useState()
    const [formattedDate, setFormattedDate] = useState(null);
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL

    useEffect (() => {
        const getSingleBlog = async () => {
            try {
                const res = await fetch(`${API_URL}/api/blog/` + id)
                if(!res.ok) {
                    console.log("unable to fetch blog");
                }
                const data = await res.json()
                setBlog(data)
                setBlogContent(data.content)
                
            } catch (error) {
                console.log("error",error);
                
            }
        }
        getSingleBlog()
    },[])
    
    console.log(blog);
    
    useEffect(() => {
        if (blog && blog.created_at) {
            const date = new Date(blog.created_at);
            const formatted = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            setFormattedDate(formatted);
        }
    }, [blog]);


    return (
        <>
            <PageBanner />
            {blog &&
                <div className="d-flex align-items-center flex-column px-3">
                    <img src={blog.header_img} className="w-75 moved-up img-fluid shadow-lg rounded" style={{zIndex:9999}}/>
                    <h1 className="pt-5 pb-3 fs-1 text-center">{blog.title}</h1>
                    <p className="text-secondary text-center">Posted on {formattedDate}<br/> by Kaleb Pete<img src="/kaleb-icon.jpg" className="icon-photo"/></p>
                    <div className="article col-11 col-md-10 col-lg-9 col-xl-7 mt-5">
                        {blogContent.map((item, index) => {
                            if (item.content_type === "text") {
                                return (
                                    <p className={`${item.bs_styles} mb-4`} key={index}>{item.content}</p>
                                )
                            }
                            if (item.content_type === "header") {
                                return (
                                    <h5 key={index} className={`mt-5 mb-4 ${item.bs_styles}`}>{item.content}</h5>
                                )
                            }
                            if (item.content_type === "image") {
                                return (
                                    <img src={item.content} className={`col-12 col-md-10 col-lg-9 d-block mx-auto my-5
                                         rounded shadow-sm${item.bs_styles}`}/>
                                )
                            }
                            else {
                                
                            }
                        })}
                    </div> 
                    <p className="mt-5 text-secondary">- End of article -</p>
                    <button className="btn btn-dark" onClick={() => navigate('../blog')}> Read More Blogs </button>  
                </div>
            }
        </>
    )
}