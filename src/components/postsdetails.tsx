import {useFetch} from "../useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post, isPost } from "../types/Posts";
import Comments from "./comments";

const PostDetails = ()=>{
    const {id} = useParams();
    const {data, isPending, error} = useFetch('http://127.0.0.1:3000/api/posts/'+id)
    const post :Post= data.post
    console.log(post)
    const navigate =useNavigate();
    const handleDelete = ()=>{
        isPost(post) &&
        fetch('http://127.0.0.1:3000/api/posts/'+ post.ID,{
            method: 'DELETE'
        }).then(()=>
        navigate("/"))
    }
    return (

        <div>
            {isPending && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
            {post &&isPost(post) &&(
                <article>
                    <h2>{post.Title}</h2>
                    <div>{post.Content}</div>
                    <Link to ={`/editpost/${post.ID}`}><button>Edit</button></Link>
                    <button onClick={handleDelete}>Delete</button>
                    <Comments />
                </article>
            )}
        </div>
    )
}   
export default PostDetails;