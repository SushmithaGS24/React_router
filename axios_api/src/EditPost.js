

import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
const EditPost = ({

    posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle 
  }) => {

    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(()=> {
        if(post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);





    return (
        <main className="Edit Post">
            {editTitle && 
            <>
                <h2>New  Post</h2>
                <form className="newPostForm" onSubmit = {(e) => e.preventDefault}
            >
            <label htmlFor="postTitle">Title:</label>  
            <input    
            id="postTitle"
            type="text"
            required
            value={editTitle}
            onChange={(e) =>setEditTitle(e.target.value)} />
            <label htmlFor="postBody">Post:</label> 
            <textarea
            id="postBody"
            required
            value={editBody}
            onChange={(e)=> setEditBody(e.target.value)} />
            <button type="submit" onClick={(e) => handleEdit(post.id, e)} >Submit</button>
            </form> 
  
        </>
    } 
    {!editTitle && 
    <>
    <h2> Post Not found</h2>
    <p>
        <Link to ='/'>Visit our home page</Link>
    </p>
    </>
  }

    </main>
    );

};

export default EditPost;
