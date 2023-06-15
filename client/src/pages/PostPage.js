import React, { useContext, useEffect, useState } from 'react';
import "../styles/PostPage.css";
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import domPruify from "dompurify";
import { UserContext } from '../UserContext';
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch(`https://blog-gokul.onrender.com/post/${id}`)
            .then(response => response.json())
            .then(postInfo => { setPostInfo(postInfo); return postInfo });
    }, [setPostInfo, id]);

    if (!postInfo) {
        return (
            <main>
                <h1>No Post Info</h1>
            </main>
        )
    }

    const sanitizedContent = domPruify.sanitize(postInfo.content);

    return (
        <main>
            <article className='post'>
                <div className="post_header">
                    <div className="post_cover">
                        <img src={`https://blog-gokul.onrender.com/${postInfo.cover}`} alt="" className='post_cover_image' />
                        {userInfo.id === postInfo.author._id && (
                            <div className="edit_post">
                                <Link to={`/edit/${postInfo._id}`}>Edit <FontAwesomeIcon icon={faPen} className='edit_post_icon' /></Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="post_body">
                    <div className="post_title">
                        <h1 className='post_title_h1'>{postInfo.title}</h1>
                    </div>
                    <div className="post_author">
                        <img src="https://i.pravatar.cc/40?img=1" alt="" className='post_author_profile' width={40} height={40} />
                        <div className="author_info">
                            <a href='/' className="author_info_name">{postInfo.author.username}</a>
                            <time className='author_info_time'>{format(new Date(postInfo.createdAt), 'MMM d, Y HH:mm')}</time>
                        </div>
                    </div>
                    <div className="post_content">
                        <div className="content" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
                    </div>
                </div>
                <div className="post_footer"></div>
            </article>
        </main>
    )
}

export default PostPage