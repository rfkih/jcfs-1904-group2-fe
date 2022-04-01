import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './component/Navbar/Navbar'
import HomeUser from './pages/HomeUser/HomeUser'
import HomeAdmin from './pages/HomeAdmin/HomeAdmin';
import ProductDetail from './pages/HomeUser/components/Products/ProductDetail/ProductDetail';
import EditDetailProduct from './pages/HomeAdmin/component/ProductsAdmin/EditDetailProduct/EditDetailProduct';


function App () {

    return (
        <Router>
      <div>
       <Navbar/>
        <Routes>
          <Route path="/" element={<HomeUser/>} />
          <Route path="homeadmin" element={<HomeAdmin/>}/>
          <Route path={`products/:productId`} element={<ProductDetail/>} />
          <Route path={`editproducts/:productId`} element={<EditDetailProduct/>}/>
        </Routes>
      </div>
    </Router>
    )
}

export default App