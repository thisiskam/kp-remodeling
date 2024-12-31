import { useEffect } from "react";
import { useState } from "react";

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState([]);
    

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
                console.error(error)
            }  
        };
        fetchBlogs();
    }, [])
    
    return (
        <>  
            <h4 className="text-center my-2">Blogs</h4>
            <table className="editBlogs">
                <tbody>
                {blogs && blogs.map((blog) => (
                    <tr key={blog.id}>
                        <td>
                            <img src={blog.header_img} className="col-2img-fluid" style={{height: "2rem"}} alt="header img" />
                        </td>
                        <td className="px-4">
                            <p>{blog.title}</p>
                        </td>
                        <td className="px-4">
                            <i className="bi bi-trash3 text-danger"></i>
                        </td>
                        <td>
                            <i className="bi bi-pencil-square text-warning"></i>
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
            <button className="btn btn bg-success text-white" style={{fontSize: "14px"}}>
                <i className="bi bi-plus-square"></i> New Blog
            </button>
        </>
)}
282780010