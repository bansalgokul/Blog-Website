import React, { useEffect, useState } from 'react'
import BlogPostCard from '../components/BlogPostCard';
import "../styles/home.css"

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("http://localhost:4000/post", {
                method: "GET",
            })
            const resPosts = await response.json();
            setPosts(resPosts);
        }
        fetchPosts();
    }, []);

    return (
        <main>
            {posts.length > 0 && posts.map(post =>
                <BlogPostCard key={post._id} {...post} />
            )}
        </main>

    )
}

export default Home