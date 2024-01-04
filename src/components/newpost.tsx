import { useState } from "react";
import { useNavigate } from "react-router-dom"

const NewPost = () => {
    const [Category, setCategory] =useState(null);
    const [title, setTitle] =useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPending,setIsPending] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = (entry: any)=>{
        entry.preventDefault();
        const post = {Category, title, content};
        setIsPending(true);
        fetch('http://127.0.0.1:3000/api/posts',{
            method:'POST',
            headers:{"Content-Type": "application/json" },
            body: JSON.stringify(post),
            credentials: "include"
        }).then(()=>
        console.log("new blog added"));
        setIsPending(false);
        navigate('/');
    }
    return ( 
        <form onSubmit={handleSubmit}>
            <label>Category: </label>
            <input></input>

            <br/>
            <label>Title: </label>
            <input required value={title} onChange={(e)=> setTitle(e.target.value)}></input>
            <br/>
            <label>Body: </label>
            <input required value={content} onChange={(e)=> setContent(e.target.value)}></input>
            <br/>
            {!isPending && <button>Add Post</button>}
            {isPending && <button disabled>Adding post...</button>}
        </form>
     );
}
 
export default NewPost;