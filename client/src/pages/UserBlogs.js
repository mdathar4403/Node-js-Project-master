import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BlogCard from '../componets/BlogCard';
import Alert from '@mui/material/Alert';
// import CheckIcon from '@mui/icons-material/Check';


const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    // get user blogs
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem("userId");
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(blogs);
    useEffect(() => {
        getUserBlogs();
    }, []);
    return (
        <>
            {blogs && blogs.length > 0 ? (blogs.map((blog) => (
                <BlogCard
                    id = {blog?._id}
                    key={blog?._id}
                    isUser={true}
                    title={blogs?.title}
                    description={blog?.description}
                    image={blog?.image}
                    username={blog?.user?.username}
                    time={blog.createdAt}
                />
            ))) : <Alert severity="success" color="warning">
                There is no blog available !!
            </Alert>}
        </>
    )
}

export default UserBlogs
