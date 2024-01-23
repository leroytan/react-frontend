import { useEffect, useState } from "react";
import { User } from "../types/user";

export const useValidate = () => {
    const [user, setUser] = useState<User>()
    const [isPending,setIsPending] = useState<boolean>(true);
    const [err, setErr] = useState<any>(null)
    
    useEffect(()=>{
        const validate = async ()=>{
            try{
                const response = await fetch(process.env.REACT_APP_API_KEY+'/api/validate',{
                    method:'GET',
                    headers:{"Content-Type": "application/json" },
                    credentials: 'include'   
                })
                if (!response.ok){
                    const respjson= await response.json()
                    throw (respjson.error)
                  }else{
                    
                    const resptext = await response.clone().text()
                    localStorage.setItem("user", resptext)
                    try{
                        const respjson= await response.json()
                        setUser(respjson.user)
                    }catch(error:any){
                        console.log(error)
                    }
                    setIsPending(false);
                  }
            }catch (error: any){
                localStorage.removeItem("user")
                setIsPending(false);
                setErr(error)
            }
        }
        validate()
        
    },[])
    return {user, isPending, err}
}
