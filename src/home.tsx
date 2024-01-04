import {useFetch} from "./useFetch";
import Postslist from "./components/postslist";
import React from "react";
import { Post, isPost } from "./types/Posts";

const Home = () => {
  
    const {data, isPending, error}= useFetch('http://localhost:3000/api/posts');
    const posts :Post[]= data.posts
    console.log(posts);
    return (
      <div>
        {error && <div>{error.message}</div>}
        {isPending && <div>Loading...</div>}
        {posts && posts.length==0 && <div>There is no posts</div>}
        {posts && posts.length!=0 && isPost(posts[0]) &&<Postslist posts ={posts}/>}
      </div>
    );
  }
 
export default Home;