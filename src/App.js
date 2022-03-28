import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './component/Navbar/Navbar'
import HomeUser from './pages/HomeUser/HomeUser'


function App () {

    return (
        <Router>
            <Navbar/>
            <HomeUser/>
        </Router>
    )
}

export default App