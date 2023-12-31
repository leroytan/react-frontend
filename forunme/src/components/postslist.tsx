import React from "react";
import { Link } from "react-router-dom";
type Posts = {
  id: number | undefined;
  title: string | undefined;
  body: string | undefined
  updated_at: string
  created_at:string
}

const Postslist = (data: { posts: Posts[]; })=>{
  return (
    <div>
      <h1>These posts are from the API</h1>
      {data.posts.map(post => {
        const updatedate = new Date(post.updated_at);
        return (
          
          <div key={post.id}>
            <Link to = {`/posts/${post.id}`}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>{updatedate.toLocaleString()}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Postslist;