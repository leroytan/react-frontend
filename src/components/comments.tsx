import { useState } from "react";

const Comments = () => {
    const [mycomment, setMycomment] = useState<string>("")
    return ( 
        <div>
        <br/>
            <label>Comment: </label>
            <input required value={mycomment} onChange={(e)=> setMycomment(e.target.value)}></input>
        <br/>
        </div>
     );
}
 
export default Comments;