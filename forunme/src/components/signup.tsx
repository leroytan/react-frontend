import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate =useNavigate();
    const [email, setEmail] =useState<string>("");
    const [username, setUsername] =useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPending,setIsPending] = useState<boolean>(false);
    const [err, setErr] = useState<any>(null)
    const handleSubmit = async (entry: any)=>{
        entry.preventDefault();
        const signupinfo = {email, username, password};
        setIsPending(true);
        try{
            const response = await fetch('http://127.0.0.1:3000/signup',{
                method:'POST',
                headers:{"Content-Type": "application/json" },
                body: JSON.stringify(signupinfo)
            })
            if (!response.ok){
                const respjson= await response.json()
                throw (respjson.error)
              }else{
                setIsPending(false);
                navigate('/');
              }
        }catch (error: any){
            setIsPending(false);
            setErr(error)
        }
        
        
        
    }
    return ( 
        <div>
        <br/>
            <label>Email: </label>
            <input required value={email} onChange={(e)=> setEmail(e.target.value) }></input>
            <br/>
            <label>Username: </label>
            <input required value={username} onChange={(e)=> setUsername(e.target.value)}></input>
            <br/>
            <label>Password: </label>
            <input required value={password} onChange={(e)=> setPassword(e.target.value)}></input>
            <br/>
            <div>{err}</div>
            <button onClick={handleSubmit}>Signup</button>
            </div>
     );
}
 
export default Signup;