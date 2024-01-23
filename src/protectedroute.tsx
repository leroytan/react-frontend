import { FC } from "react";
import { useValidate } from "./components/validate";
import Login from "./components/login";

const RequireAuth: FC<{ children: React.ReactElement }> = (prop:{ children:any }) => {
    const userIsLogged = useValidate().user;
 
    if (!userIsLogged) {
       return <Login/>
    }
    return prop.children;
 };

 export default RequireAuth