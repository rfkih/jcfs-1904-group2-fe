import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './component/Navbar/Navbar'
import HomeUser from './pages/HomeUser/HomeUser'
import HomeAdmin from './pages/HomeAdmin/HomeAdmin';
import ProductDetail from './pages/HomeUser/components/Products/ProductDetail/ProductDetail';
import EditDetailProduct from './pages/HomeAdmin/component/ProductsAdmin/EditDetailProduct/EditDetailProduct';
import ItemSold from './pages/HomeAdmin/component/SalesReport/ItemSold/ItemSold';
import UsersTransaction from './pages/HomeAdmin/component/SalesReport/UsersTransaction/UsersTransaction';

function App () {

    return (
      <Router>
      <div>
  
        <Routes>
          <Route path="/" element={<HomeUser/>} />
          <Route path="homeadmin" element={<HomeAdmin/>}/>
          <Route path={`products/:productId`} element={<ProductDetail/>} />
          <Route path={`editproducts/:productId`} element={<EditDetailProduct/>}/>
          <Route path={`itemsold`} element={<ItemSold/>}/>
          <Route path={`userstransaction`} element={<UsersTransaction/>}/>
        </Routes>
      </div>
    </Router>
    )
}

export default App