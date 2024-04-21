import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar";
import PostPage from "./PostPage";


function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={ <Register/>} />
                    <Route path = "/posts" element={<Home/>}/>
                    <Route path="/posts/:id" element={<PostPage />} />
            </Routes>
            </Router>
        </div>
    );
};

export default App;
