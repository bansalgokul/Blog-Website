import React, { useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import "../styles/createPage.css";
import { Navigate } from "react-router-dom";


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


const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [redirect, setRedirect] = useState(false);

    const createNewPost = async (ev) => {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        try {

            const response = await fetch("https://blog-gokul.onrender.com/post", {
                method: 'POST',
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
        return <Navigate to={'/'} />
    }

    return (
        <main>
            <div className="create_post">
                <h1 className='create_post_h1'>Create New Post</h1>
                <div className="post_form">
                    <form onSubmit={createNewPost} className='post_form_form'>
                        <input type="text" placeholder='Title' className='post_form_input' value={title} onChange={(ev) => setTitle(ev.target.value)} />
                        <input type="text" placeholder='Summary' className='post_form_input' value={summary} onChange={(ev) => setSummary(ev.target.value)} />
                        <input type="file" placeholder='Image' className='post_form_input post_form_file' onChange={(ev) => setFiles(ev.target.files)} />
                        <ReactQuill className='post_form_quill' modules={modules} formats={formats} value={content} onChange={newValue => setContent(newValue)} />
                        <button type="submit" className='post_form_button'>Post</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default CreatePage