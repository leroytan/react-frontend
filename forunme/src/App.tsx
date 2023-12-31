import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './home';
import NavigationBar from './components/navigationbar';
import NewPost from './components/newpost';
import PostDetails from './components/postsdetails';
import EditPost from './components/editpost';

function App() {

  return (
    <Router>
      <NavigationBar />
    <div>
      <Routes>
        <Route path = '/' element={<Home/>} />
        <Route path = '/newpost' element={<NewPost/>} />
        <Route path = '/posts/:id' element={<PostDetails/>} />
        <Route path = '/editpost/:id' element={<EditPost/>} />
      </Routes>
    </div>
    
    </Router>
  );
}

export default App;

