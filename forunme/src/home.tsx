import {useFetch} from "./useFetch";
import Postslist from "./components/postslist";
import React from "react";

const Home = () => {
    const {data: posts, isPending, error} = useFetch('http://localhost:3000/api/v1/posts');
    console.log(posts);
    return (
      <div>
        {error && <div>{error.message}</div>}
        {isPending && <div>Loading...</div>}
        {posts && Array.isArray(posts) &&<Postslist posts ={posts}/>}
      </div>
    );
  }
 
export default Home;