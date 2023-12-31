import {useFetch, Data} from "../useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = ()=>{
    const {id} = useParams();
    const {data:post, error, isPending} = useFetch('http://127.0.0.1:3000/api/v1/posts/'+id)
    const navigate =useNavigate();
    const updatedate = (!Array.isArray(post)) && new Date(post.updated_at);
    console.log(updatedate);
    const handleDelete = ()=>{
        (!Array.isArray(post)) &&
        fetch('http://127.0.0.1:3000/api/v1/posts/'+ post.id,{
            method: 'DELETE'
        }).then(()=>
        navigate("/"))
    }
    return (

        <div>
            {isPending && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
            {post &&(!Array.isArray(post)) &&(
                <article>
                    <h2>{post.title}</h2>
                    <div>{post.body}</div>
                    <p>{updatedate.toLocaleString()}</p>
                    <Link to ={`/editpost/${post.id}`}><button>Edit</button></Link>
                    <button onClick={handleDelete}>Delete</button>
                    
                </article>
            )}
        </div>
    )
}   
export default PostDetails;