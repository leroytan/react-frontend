import { Link } from "react-router-dom";

const NavigationBar = () => {
    return ( 
        <nav>
        <Link to ='/'>Home</Link>
        <Link to ='/newpost'>New Post</Link>
        </nav>
     );
}
 
export default NavigationBar;