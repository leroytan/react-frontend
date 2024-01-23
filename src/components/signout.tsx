import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Signout = () => {
    const navigate =useNavigate();
    const [isPending, setIsPending] = useState<Boolean>(false)
    const [err, setErr] = useState<Error|null>(null);
    const signout = async ()=>{
        try{
            const response = await fetch('http://127.0.0.1:3000/api/signout',{
                method:'POST',
                credentials: 'include'
            })
            if (!response.ok){
                throw Error("Failed to sign out")
              }else{
                setIsPending(false);
                localStorage.clear()
                console.log("changed user")
                console.log("removed local storage")
              }
        }catch (error: any){
            setIsPending(false);
            setErr(error)
        }
    }
    useEffect(()=>{
        
        signout()
    },[])
    console.log("Signed out")
    return ( 
        <div>
        {err && <div>{err.message}</div>}
        {isPending && <div>Loading...</div>}
        {!err && !isPending && <div>You have successfully signed out</div>}
        </div>
     );
}
 
export default Signout;