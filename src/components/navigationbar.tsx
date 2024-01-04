import { Link } from "react-router-dom";

const NavigationBar = () => {
    return ( 
        <nav>
        <Link to ='/'>Home</Link>
        <Link to ='/newpost'>New Post</Link>
        <Link to ='/signup'>Signup</Link>
        <Link to ='/login'>Login</Link>
        <Link to ='/signout'>Signout</Link>
        </nav>
     );
}
 
export default NavigationBar;