import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BlogCard from '../componets/BlogCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    // get blogs
    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('/api/v1/blog/all-blog');
            if (data && data.success) {
                setBlogs(data?.blogs);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getAllBlogs();
    }, []);
    return (
        <div className='container'>
            {blogs && blogs.map((blog) => (
                <BlogCard
                    id={blog?._id}
                    key={blog?._id}
                    isUser={localStorage.getItem("userId") === blog?.user?._id ? true : false}
                    title={blogs?.title}
                    description={blog?.description}
                    image={blog?.image}
                    username={blog?.user?.username}
                    time={blog.createdAt}
                />
            ))}
        </div>
    )
}

export default Blogs
