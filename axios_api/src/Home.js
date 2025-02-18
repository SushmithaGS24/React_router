

import Feed from './Feed.js';
function Home ({ posts }) {

    return (
        <main className="Home">
            {posts.length ? ( //NOSONAR
                <Feed posts ={posts}/>
            ):(
                <p style={{ marginTop : "2rem" }}>
                    No post to display
                </p>
            )}
         
        </main>
    );

}

export default Home;
