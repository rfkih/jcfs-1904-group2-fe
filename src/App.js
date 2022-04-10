import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Grid, Box, Stack } from '@material-ui/core';
import {Brightness2Icon} from '@material-ui/icons'
import Navbar from './component/Navbar/Navbar'
import HomeUser from './pages/HomeUser/HomeUser'
import HomeAdmin from './pages/HomeAdmin/HomeAdmin';
import ProductDetail from './pages/HomeUser/components/Products/ProductDetail/ProductDetail';
import EditDetailProduct from './pages/HomeAdmin/component/ProductsAdmin/EditDetailProduct/EditDetailProduct';
import ItemSold from './pages/HomeAdmin/component/SalesReport/ItemSold/ItemSold';
import UsersTransaction from './pages/HomeAdmin/component/SalesReport/UsersTransaction/UsersTransaction';
import TransactionDetail from './pages/HomeAdmin/component/SalesReport/UsersTransaction/TransactionDetail/TransactionDetail';
import UserDetail from './pages/HomeAdmin/component/SalesReport/UsersTransaction/UserDetail/UserDetail';
import NavbarAdmin from './pages/HomeAdmin/component/Sidebar/NavbarAdmin';
function App () {

    return (
      <Router>


      <NavbarAdmin/>
     
        <Routes>
          <Route path="/" element={<HomeUser/>} />
          <Route path="homeadmin" element={<HomeAdmin/>}/>
          <Route path={`products/:productId`} element={<ProductDetail/>} />
          <Route path={`editproducts/:productId`} element={<EditDetailProduct/>}/>
          <Route path={`itemsold`} element={<ItemSold/>}/>
          <Route path={`userstransaction`} element={<UsersTransaction/>}/>
          <Route path={`transactiondetails/:transactionId`} element={<TransactionDetail/>}/>
          <Route path={`usertransaction/:userId`} element={<UserDetail/>}/>
        </Routes>
      
    </Router>
    )
}

export default App