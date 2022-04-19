import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { keepLoginAction } from "./store/actions";
import Login from "./pages/Login";
import Navigation from "./components/Navigation/index";
import Register from "./pages/Register";
import Forgotpass from "./pages/Login/forgotpass";
import EditProfile from "./pages/EditProfile";
import ProfilePicture from "./pages/ProfilePicture";

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

  const [role, setRole] = useState("users");

  const [isLocalStorageChecked, setIsLocalStorageChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("userData");
    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);

      const { id, username, role, tokens } = userData;
      setRole(role);
      dispatch(keepLoginAction({ id, username, role, tokens }));
    }

    setIsLocalStorageChecked(true);
  }, []);

  if (isLocalStorageChecked) {
    return (
      <div className={classes.root}>
        {role == "admin" ? (
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
              </Routes>
            </div>
          </Router>
        ) : (
          <Router>
            <div>
              <Navigation />
            </div>
            <div className={classes.page}>
              <Routes>
                <Route path="/" element={<HomeUser />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<Forgotpass />} />
                <Route
                  path="/edit-profile-picture"
                  element={<ProfilePicture />}
                />
                <Route path="/edit-profile" element={<EditProfile />} />
              </Routes>
            </div>
          </Router>
        )}
      </div>
    );
  } else {
    return <h1> Loading .. </h1>;
  }
}

export default App;
