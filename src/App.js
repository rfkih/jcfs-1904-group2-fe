import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid, Box, Container, CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { keepLoginAction } from "./store/actions";
import { useSelector } from "react-redux";
import { CartContext } from "./helper/Context";
import axios from "./utils/axios";
import Login from "./pages/Login";
import Navigation from "./components/Navigation/index";
import Footer from "./pages/Footer";
import Register from "./pages/Register";
import Forgotpass from "./pages/Login/forgotpass";
import Resetpass from "./pages/Login/resetpassword";
import EditProfile from "./pages/EditProfile";
import Cart from "./pages/Cart";
import ProfilePicture from "./pages/ProfilePicture";
import Transactions from "./pages/HomeUser/components/Transactions/Transactions";
import Checkout from "./pages/HomeUser/components/CheckoutForm/Checkout/Checkout";

import { makeStyles } from "@material-ui/core/styles";
import HomeUser from "./pages/HomeUser/HomeUser";
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin";
import ProductDetail from "./pages/HomeUser/components/Products/ProductDetail/ProductDetail";
import EditDetailProduct from "./pages/HomeAdmin/component/ProductsAdmin/EditDetailProduct/EditDetailProduct";
import ItemSold from "./pages/HomeAdmin/component/SalesReport/ItemSold/ItemSold";
import UsersTransaction from "./pages/HomeAdmin/component/SalesReport/UsersTransaction/UsersTransaction";
import TransactionDetail from "./pages/HomeAdmin/component/SalesReport/UsersTransaction/TransactionDetail/TransactionDetail";
import UserDetail from "./pages/HomeAdmin/component/SalesReport/UsersTransaction/UserDetail/UserDetail";
import DrawerBar from "./pages/HomeAdmin/component/Sidebar/Sidebar";
import SalesReport from "./pages/HomeAdmin/component/SalesReport/SalesReport";
import PendingOrder from "./pages/HomeAdmin/component/PendingOrder/PendingOrder";
import OrderDetail from "./pages/HomeAdmin/component/PendingOrder/OrderDetail/OrderDetail";
import ItemSoldDetail from "./pages/HomeAdmin/component/SalesReport/ItemSold/ItemSoldDetail/ItemSoldDetail";
import Stocks from "./pages/HomeAdmin/component/Stocks/Stocks";
import StocksDetail from "./pages/HomeAdmin/component/Stocks/StocksDetail/StocksDetail";
import Spinner from "./pages/HomeUser/Spinner";
import CustomOrderUpload from "./pages/HomeUser/components/CustomOrderUpload/CustomOrderUpload";
import CustomOrders from "./pages/HomeUser/components/CustomOrders/CustomOrders";
import UserCart from "./pages/HomeAdmin/component/UserCart/UserCart";

const useStyles = makeStyles({
  page: {
    background: "f9f9f9",
    width: "100%",
  },
  root: {
    display: "flex",
  },
});

function App() {
  const classes = useStyles();
  const [isLocalStorageChecked, setIsLocalStorageChecked] = useState(false);
  const [userId, setUserId] = useState(0);
  const [custom, setCustom] = useState("and isCustom = 0");
  const [orderId, setOrderId] = useState(0);
  const [cart, setCart] = useState([{}]);
  const [subTotal, setSubTotal] = useState(0);
  const [change, setChange] = useState(false);
  const { role, id } = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  console.log(role);

  useEffect(() => {
    if (role == 'admin') {
      setCustom('and isCustom = 1')
      fetchCart();
    }else{
      setCustom('and isCustom = 0')
      fetchCart();
    }
},[change, userId, custom])

   
  
  console.log(cart);
  
  useEffect(() => {
    const userLocalStorage = localStorage.getItem("userData");
    const dataLocalStorage = localStorage.getItem("cartData");
    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);

      const { id, username, role, tokens, photo } = userData;

      dispatch(keepLoginAction({ id, username, role, tokens, photo }));
    }
    if (dataLocalStorage) {
      const getData = JSON.parse(dataLocalStorage);

      const data = {
        userId: getData.userId,
        orderId: getData.orderId,
        cart: getData.cart,
      };
      localStorage.setItem("cartData", JSON.stringify(data));
    }
    setChange(!change);
    setIsLocalStorageChecked(true);
  }, []);

  const cartData = () => {
    const data = {
      userId: userId,
      orderId: orderId,
      cart: cart,
    };
    localStorage.setItem("cartData", JSON.stringify(data));
  };

  console.log(custom);
  const getLocalStorage = () => {
    const dataLocalStorage = window.localStorage.getItem("cartData");
    const getData = JSON.parse(dataLocalStorage);

    if (getData.userId) {
      setUserId(getData.userId);
      setOrderId(getData.orderId);
      setCart(getData.cart);
    }
  };
  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    if (role == "user") {
      setUserId(id);
    }
    if (isLocalStorageChecked) {
      cartData();
    }
  }, [userId, orderId, cart]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/cart", { params: { userId, custom } });
      const { data } = res;
      setCart(data.result);
      setSubTotal(data.count[0].subtotal);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  






  if (isLocalStorageChecked) {
    return (
      <div className={classes.root}>
        {role === "admin" ? (
          <CartContext.Provider
            value={{
              cart,
              setCart,
              userId,
              setUserId,
              orderId,
              setOrderId,
              change,
              setChange,
              subTotal,
            }}
          >
            <Router>
              <div>
                <DrawerBar />
              </div>
              <div className={classes.page}>
                <Routes>
                  <Route path="/" element={<HomeUser />} />
                  <Route path="homeadmin" element={<HomeAdmin />} />
                  <Route path="stocks" element={<Stocks />} />
                  <Route path="financial" element={<SalesReport />} />
                  <Route path="orders" element={<PendingOrder />} />
                  <Route path="stocks/:productId" element={<StocksDetail />} />
                  <Route path={`orders/:orderId`} element={<OrderDetail />} />
                  <Route path={`userscart`} element={<UserCart />} />
                  <Route
                    path={`products/:productId`}
                    element={<ProductDetail />}
                  />
                  <Route
                    path={`editproducts/:productId`}
                    element={<EditDetailProduct />}
                  />
                  <Route path={`itemsold`} element={<ItemSold />} />
                  <Route
                    path={`itemsold/product/:productId`}
                    element={<ItemSoldDetail />}
                  />
                  <Route
                    path={`itemsold/product/:productId`}
                    element={<ItemSoldDetail />}
                  />
                  <Route
                    path={`itemsold/product/:productId`}
                    element={<ItemSoldDetail />}
                  />
                  <Route
                    path={`userstransaction`}
                    element={<UsersTransaction />}
                  />
                  <Route
                    path={`transactiondetails/:transactionId`}
                    element={<TransactionDetail />}
                  />
                  <Route
                    path={`usertransaction/:userId`}
                    element={<UserDetail />}
                  />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </Router>
          </CartContext.Provider>
        ) : (
          <CartContext.Provider
            value={{
              cart,
              setCart,
              userId,
              setUserId,
              orderId,
              setOrderId,
              change,
              setChange,
              subTotal,
            }}
          >
            <Router>
              <div>
                <Navigation />
              </div>
              <div className={classes.page}>
                <Routes>
                  <Route path="/" element={<HomeUser />} />
                  <Route
                    path={`products/:productId`}
                    element={<ProductDetail />}
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<Forgotpass />} />
                  <Route
                    path="/reset-password/:token"
                    element={<Resetpass />}
                  />
                  <Route
                    path="/edit-profile-picture"
                    element={<ProfilePicture />}
                  />
                  <Route path="/usertransactions" element={<Transactions />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route
                    path="/customorder/upload"
                    element={<CustomOrderUpload />}
                  />
                  <Route path="/customorders" element={<CustomOrders />} />
                  <Route
                    path="/usertransactions/:transactionId"
                    element={<Checkout />}
                  />
                </Routes>
                <Footer />
              </div>
            </Router>
          </CartContext.Provider>
        )}
      </div>
    );
  } else {
    return <Spinner message="Loading" />;
  }
}

export default App;
