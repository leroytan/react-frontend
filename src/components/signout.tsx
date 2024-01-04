import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signout = () => {
    const navigate =useNavigate();
    const [isPending, setIsPending] = useState<Boolean>(false)
    const [err, setErr] = useState<Error|null>(null);
    const signout = async ()=>{
        try{
            const response = await fetch('http://127.0.0.1:3000/signout',{
                method:'POST',
                credentials: 'include'
            })
            if (!response.ok){
                throw Error("Failed to sign out")
              }else{
                setIsPending(false);
              }
        }catch (error: any){
            setIsPending(false);
            setErr(error)
        }
    }
    useEffect(()=>{
        signout()
    },[])
    return ( 
        <div>
        {err && <div>{err.message}</div>}
        {isPending && <div>Loading...</div>}
        {!err && !isPending && <div>You have successfully signed out</div>}
        </div>
     );
}
 
export default Signout;