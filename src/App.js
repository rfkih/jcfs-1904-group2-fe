import React,{useState} from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Grid, Box, Stack } from '@material-ui/core';
import Navbar from './component/Navbar/Navbar'
import HomeUser from './pages/HomeUser/HomeUser'
import HomeAdmin from './pages/HomeAdmin/HomeAdmin';
import ProductDetail from './pages/HomeUser/components/Products/ProductDetail/ProductDetail';
import EditDetailProduct from './pages/HomeAdmin/component/ProductsAdmin/EditDetailProduct/EditDetailProduct';
import ItemSold from './pages/HomeAdmin/component/SalesReport/ItemSold/ItemSold';
import UsersTransaction from './pages/HomeAdmin/component/SalesReport/UsersTransaction/UsersTransaction';
import TransactionDetail from './pages/HomeAdmin/component/SalesReport/UsersTransaction/TransactionDetail/TransactionDetail';
import UserDetail from './pages/HomeAdmin/component/SalesReport/UsersTransaction/UserDetail/UserDetail';
import DrawerBar from './pages/HomeAdmin/component/Sidebar/Sidebar';
import SalesReport from './pages/HomeAdmin/component/SalesReport/SalesReport';
import PendingOrder from './pages/HomeAdmin/component/PendingOrder/PendingOrder';
import OrderDetail from './pages/HomeAdmin/component/PendingOrder/OrderDetail/OrderDetail';

const useStyles = makeStyles({
  page: {
      background: 'f9f9f9',
      width: '100%'
  },
  root: {
      display: 'flex'
  }
})

function App () {
  const classes = useStyles();
  const [role, setRole] = useState('admin')
    return (

      <div className={classes.root}>
        {role == 'admin' ?
        <Router>
        <div>
          <DrawerBar/>
        </div>
        <div className={classes.page}>
        <Routes> 
          <Route path="/" element={<HomeUser/>} />
          <Route path="homeadmin" element={<HomeAdmin/>}/>
          <Route path="financial" element={<SalesReport/>}/>
          <Route path="orders" element={<PendingOrder/>}/>
          <Route path={`orders/:orderId`} element={<OrderDetail/>} />
          <Route path={`products/:productId`} element={<ProductDetail/>} />
          <Route path={`editproducts/:productId`} element={<EditDetailProduct/>}/>
          <Route path={`itemsold`} element={<ItemSold/>}/>
          <Route path={`userstransaction`} element={<UsersTransaction/>}/>
          <Route path={`transactiondetails/:transactionId`} element={<TransactionDetail/>}/>
          <Route path={`usertransaction/:userId`} element={<UserDetail/>}/>
        </Routes>
        </div> 
    </Router> : 
      <Router>
        <div className={classes.page}>
          <Routes>
            <Route path="/" element={<HomeUser/>} />
          </Routes>
        </div>
      </Router>
    }
      
    </div>
    )
}

export default App