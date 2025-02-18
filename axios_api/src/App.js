
import Header from './Header.js';
import Nav from './Nav.js';
import Footer from './Footer.js';
import Home from './Home.js';
import Newpost from './Newpost.js';
import PostPage from './PostPage.js';
import About from './About.js';
import Missing from './Missing.js';
import EditPost from './EditPost.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/post.js';


function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const history = useNavigate();


  useEffect(() => {
    const fetchPosts = async() => {
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      }catch(err) {
        if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }

      }
    };
    fetchPosts();
  }, []);

  useEffect(()=> {
    const filteredResults = posts.filter(post => 
      ((post.body).toString().toLowerCase()).includes(search.toString().toLowerCase())
      || ((post.title).toString().toLowerCase()).includes(search.toString().toLowerCase()));

      setSearchResults(filteredResults.reverse());

  },[posts, search])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);

    const postList = posts.filter(post => post.id !== id);
    setPosts(postList);
    history('/');
    } catch(err){
       console.log(`Error: ${err.message}`);
    }
  };


  const handleEdit = async (id, e) => {
    e.preventDefault();
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {

      console.log('Sending PUT request to update post:', updatedPost);
        const response = await api.put(`/posts/${id}`, updatedPost);
        console.log('Response received:', response.data);
        
     
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post ));
      setEditTitle('');
      setEditBody('');
      history('/');
    }catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      history('/');
    } catch(err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <div className="App">
    <Header title="React JS Blog" />
    <Nav search={search} setSearch={setSearch}/>
    <Routes> 
      <Route path="/" element={<Home posts={searchResults} />} /> 
      <Route path="/post" element={<Newpost  
          postTitle = {postTitle}
          setPostTitle = {setPostTitle}
          setPostBody = {setPostBody}
          postBody = {postBody}
          handleSubmit = {handleSubmit}

          />} 
          />
          <Route path="/edit/:id" element={<EditPost  
          posts={posts}
          editTitle = {editTitle}
          setEditTitle = {setEditTitle}
          setEditBody = {setEditBody}
          editBody = {editBody}
          handleEdit = {handleEdit}

          />} 
          />
      <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
      <Route path="/about" element={<About />} /> 
      <Route path="*" element={<Missing />} /> 
    </Routes>
    <Footer />
  </div>
  );
}

export default App;
