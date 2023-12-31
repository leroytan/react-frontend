import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../types/Posts";


const Postslist = (data:{posts: Post[]})=>{
  return (
    <div>
      <h1>These posts are from the API</h1>
      {data.posts.map((post: Post) => {
        const updatedate = new Date(post.UpdatedAt);
        return (
          
          <div key={post.ID}>
            <Link to = {`/posts/${post.ID}`}>
            <h2>{post.Title}</h2>
            <p>{post.Body}</p>
            <p>{updatedate.toLocaleString()}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Postslist;