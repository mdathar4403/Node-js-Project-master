// import logo from './logo.svg';
import './App.css';
import Header from './componets/Header';
import { Routes, Route } from 'react-router-dom';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Regist from './pages/Regist';
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regist />} />
      </Routes>
    </>
  );
}

export default App;
