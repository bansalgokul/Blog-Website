import React, { useEffect, useState } from 'react'
import BlogPostCard from '../components/BlogPostCard';
import "../styles/home.css"

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
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