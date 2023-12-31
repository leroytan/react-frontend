import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch} from "../useFetch";
import { Post, isPost } from "../types/Posts";


const EditPost = () => {
    const {id} = useParams();
    const {data, error, isPending:fetchPending} = useFetch('http://127.0.0.1:3000/api/posts/'+id)
    const post:Post = data.post
    const navigate =useNavigate();
    const [Category, setCategory] =useState(null);
    const [title, setTitle] =useState<string>("");
    const [body, setBody] = useState<string>("");
    const [isPending,setIsPending] = useState<boolean>(false);


    const handleSubmit = (entry: any)=>{
        entry.preventDefault();
        const editedpost = {Category, title, body};
        setIsPending(true);
        fetch('http://127.0.0.1:3000/api/posts/'+id,{
            method:'PUT',
            headers:{"Content-Type": "application/json" },
            body: JSON.stringify(editedpost)
        }).then(()=>
        console.log("post edited"));
        setIsPending(false);
        navigate('/');
    }
    useEffect(()=>{
        if (post&&isPost(post)){
            setTitle(post.Title)
            setBody(post.Body)
        }
        
    },[fetchPending])

    
    
    return ( 
        <div>
        {fetchPending && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {post &&isPost(post)&&
        <form onSubmit={handleSubmit}>
            <label>Category: </label>
            <input></input>

            <br/>
            <label>Title: </label>
            <input required value={title} onChange={(e)=> setTitle(e.target.value) }></input>
            <br/>
            <label>Body: </label>
            <input required value={body} onChange={(e)=> setBody(e.target.value)}></input>
            <br/>
            {!isPending && <button>Edit Post</button>}
            {isPending && <button disabled>Editing post...</button>}
        </form>}
        </div>
     );
}
 
export default EditPost;