import { useState , useEffect } from "react"
import { useParams } from "react-router-dom"
import PageBanner from "../components/PageBanner"

export default function BlogSingle () {
    const { id } = useParams()
    const [blog, setBlog] = useState()
    const [blogContent, setBlogContent] = useState()
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect (() => {
        const getSingleBlog = async () => {
            try {
                const res = await fetch("/api/blog/" + id)
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
                            if (item.content_type === "paragraph") {
                                return (
                                    <p className="d-inline" key={index}>{item.content}<br /><br /></p>
                                )
                            }
                            if (item.content_type === "subheading") {
                                return (
                                    <h5 key={index} className="mt-5 mb-4">{item.content}</h5>
                                )
                            }
                            if (item.content_type === "star point") {
                                return (
                                    <div className="mx-5 mt-2 mb-4" key={index}><p className="text-secondary">{item.content}</p></div>
                                )
                            }
                            if (item.content_type === "bold span") {
                                return (
                                    <span className="fw-bold" key={index}>{item.content}  </span>
                                )
                            }
                            if (item.content_type === "image") {
                                return (
                                    <img src={item.content} className="col-12 col-md-10 col-lg-9 d-block mx-auto rounded shadow-sm"/>
                                )
                            }
                            else {
                                
                            }
                        })}
                    </div>   
                </div>
            }
        </>
    )
}