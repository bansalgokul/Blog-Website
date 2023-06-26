import React from 'react';
import "../styles/blogPostCardStyles.css";
import { format } from "date-fns"
import { Link } from 'react-router-dom';

const BlogPostCard = ({ _id, title, summary, content, cover, createdAt, author }) => {
    return (
        <article className='blog_card'>
            <div className='card_header'>
                <Link to={'/post/' + _id}>
                    <img src={"http://localhost:4000/" + cover} alt={title} className='card_header_image' width='600' />
                </Link>
            </div>
            <div className="card_body">
                <Link to={'/post/' + _id}>
                    <h2 className='card_body_title'>{title}</h2>
                </Link>
                <p className='card_body_summary'>{summary}</p>
            </div>
            <div className='card_footer'>
                <div className="user">
                    <img src="https://i.pravatar.cc/40?img=1" alt="" className='user_image' width={40} height={40} />
                    <div className="user_info">
                        <a href='/' className="user_info_author">{author.username}</a>
                        <time className='user_info_time'>{format(new Date(createdAt), 'MMM d, Y HH:mm')}</time>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default BlogPostCard