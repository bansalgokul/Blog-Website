import React from 'react';
import "../styles/blogPostCardStyles.css";
import { format } from "date-fns"

const BlogPostCard = ({ title, summary, content, cover, createdAt }) => {
    return (
        <article className='blog_card'>
            <div className='card_header'>
                <img src="https://techcrunch.com/wp-content/uploads/2022/04/mercedes-drive-pilot-system-steering-wheel.jpg?w=730&crop=1" alt={title} className='card_header_image' width='600' />
            </div>
            <div className="card_body">
                <h2 className='card_body_title'>{title}</h2>
                <p className='card_body_summary'>{summary}</p>
            </div>
            <div className='card_footer'>
                <div className="user">
                    <img src="https://i.pravatar.cc/40?img=1" alt="" className='user_image' width={40} height={40} />
                    <div className="user_info">
                        <a href='/' className="user_info_author">Kirsten Korosec</a>
                        <time className='user_info_time'>{format(new Date(createdAt), 'MMM d, Y HH:mm')}</time>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default BlogPostCard