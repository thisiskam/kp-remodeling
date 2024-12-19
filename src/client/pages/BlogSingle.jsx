import { useState , useEffect } from "react"
import { useParams } from "react-router-dom"
import PageBanner from "../components/PageBanner"

export default function BlogSingle () {
    const { id } = useParams()
    const [blog, setBlog] = useState()
    const [blogImages, setBlogImages] = useState([])
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect (() => {
        const getSingleBlog = async () => {
            try {
                const res = await fetch("/api/blog/" + id)
                if(!res.ok) {
                    console.log("unable to fetch blog");
                }
                const data = await res.json()
                setBlog(data[0])
            } catch (error) {
                console.log("error",error);
                
            }
        }

        const getBlogImages = async () => {
            try {
                const res = await fetch('/api/blog/' + id + '/images')
                if(!res.ok) {
                    console.log("unable to fetch blog images");
                }
                const data = await res.json()
                console.log(data);
                setBlogImages(data)
            } catch (error) {
                console.log("error",error);
            }
        }

        getSingleBlog()
        getBlogImages()
    },[])

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
            {blog && blogImages.length > 0 &&
                <div className="d-flex align-items-center flex-column px-3">
                    <img src={blogImages[0].image_url} className="w-75 moved-up img-fluid shadow-lg rounded" style={{zIndex:9999}}/>
                    <h1 className="pt-5 pb-3 fs-1 text-center">{blog.title}</h1>
                    <p className="text-secondary text-center">Posted on {formattedDate}<br/> by Kaleb Pete<img src="/kaleb-icon.jpg" className="icon-photo"/></p>
                </div>
            }
        </>
    )
}