
import Header from './Header.js';
import Nav from './Nav.js';
import Footer from './Footer.js';
import Home from './Home.js';
import Newpost from './Newpost.js';
import PostPage from './PostPage.js';
import About from './About.js';
import Missing from './Missing.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';


function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const history = useNavigate();

  useEffect(()=> {
    const filteredResults = posts.filter(post => 
      ((post.body).toString().toLowerCase()).includes(search.toString().toLowerCase())
      || ((post.title).toString().toLowerCase()).includes(search.toString().toLowerCase()));

      setSearchResults(filteredResults.reverse());


  // const filteredResults = posts.filter(post => {
  //   const body = post?.body ? post.body.toString().toLowerCase() : ""; 
  //   const title = post?.title ? post.title.toString().toLowerCase() : ""; 
  //   const searchText = search ? search.toString().toLowerCase() : ""; 

  //   return body.includes(searchText) || title.includes(searchText);
  // });

  },[posts, search])

  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id);
    setPosts(postList);
    history('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    history('/');

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
      <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
      <Route path="/about" element={<About />} /> 
      <Route path="*" element={<Missing />} /> 
    </Routes>
    <Footer />
  </div>
  );
}

export default App;
