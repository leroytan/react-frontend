import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch, isData} from "../useFetch";


const EditPost = () => {
    const {id} = useParams();
    const {data:post, error, isPending:fetchpending} = useFetch('http://127.0.0.1:3000/api/v1/posts/'+id)
    const navigate =useNavigate();
    const [Category, setCategory] =useState(null);
    const [title, setTitle] =useState<string>('');
    const [body, setBody] = useState<string>('');
    const [isPending,setIsPending] = useState<boolean>(false);


    const handleSubmit = (entry: any)=>{
        entry.preventDefault();
        const post = {Category, title, body};
        setIsPending(true);
        fetch('http://127.0.0.1:3000/api/v1/posts/'+id,{
            method:'PUT',
            headers:{"Content-Type": "application/json" },
            body: JSON.stringify(post)
        }).then(()=>
        console.log("post edited"));
        setIsPending(false);
        navigate('/');
    }
    useEffect(()=>{
        if (isData(post)){
        setTitle(post.title)
        setBody(post.body)
        }
    },[fetchpending])
    
    
    return ( 
        <div>
        {error && <div>{error.message}</div>}
        {fetchpending && <div>Loading...</div>}
        {isData(post) &&
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