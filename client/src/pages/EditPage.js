import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import "../styles/editPage.css";
import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];


const EditPage = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [redirect, setRedirect] = useState(false);

    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => response.json())
            .then(postInfo => { setPostInfo(postInfo); return postInfo })
            .then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
    }, []);

    if (!postInfo) {
        return;
    }

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files[0]);
        }

        try {
            const response = await fetch("http://localhost:4000/post", {
                method: 'PUT',
                body: data,
                credentials: 'include',
            })
            const responseData = await response.json();
            if (response.ok) {
                setRedirect(true);
            }
            console.log(responseData);
        } catch (error) {
            console.error(error);
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return (
        <main>
            <div className="edit_post_div">
                <h1 className='edit_post_h1'>Edit Post</h1>
                <div className="post_form">
                    <form onSubmit={updatePost} className='post_form_form'>
                        <input type="text" placeholder='Title' className='post_form_input' value={title} onChange={(ev) => setTitle(ev.target.value)} />
                        <input type="text" placeholder='Summary' className='post_form_input' value={summary} onChange={(ev) => setSummary(ev.target.value)} />
                        <input type="file" placeholder='Image' className='post_form_input post_form_file' onChange={(ev) => setFiles(ev.target.files)} />
                        <ReactQuill className='post_form_quill' modules={modules} formats={formats} value={content} onChange={newValue => setContent(newValue)} />
                        <button type="submit" className='post_form_button'>Edit</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default EditPage;