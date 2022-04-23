import "./App.css";
import Cookies from "js-cookie";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect, useState } from "react";
import Homepage from "./pages/homepage/Homepage";
import UnProtectedRoute from "./routes/UnProtectedRoute";
import Market from "./pages/market/Market";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Products from "./pages/user-browse-product/Products";
import Profile from "./pages/user-profile/Profile";
import SellInventory from "./pages/sell-inventory/SellInventory";
import Payment from "./pages/payment/Payment";
import PaymentSuccessSceen from "./pages/paymentSucess/PaymentSuccessSceen";
import Settings from "./pages/settings/Settings";
import ChangeName from "./pages/setting-changename/ChangeName";
import Changepass from "./pages/setting-change-pass/Changepass";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  
  useEffect(async () => {
    const userToken = Cookies.get("userToken");
    await axios
      .post("https://fullstack-backend-ecommerce.herokuapp.com/api/isAuth", {
        userToken,
      })
      .then((response) => {
        const { currentuser, isAuth } = response.data;
        console.log(isAuth)
        if (!isAuth) {
          Cookies.remove("userToken");
        }
        setLoading(false);
        setUser(currentuser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  return (
    !loading && (
      <div className="App">
        <Router>
          <Switch>
            
            <UnProtectedRoute
              exact
              path="/"
              isAuth={Cookies.get("userToken")}
              Component={Homepage}
            />

            <UnProtectedRoute
              exact
              path="/signup"
              isAuth={Cookies.get("userToken")}
              Component={Signup}
            />

            <UnProtectedRoute
              exact
              path="/login"
              isAuth={Cookies.get("userToken")}
              Component={Login}
            />

            <ProtectedRoute
              exact
              path="/market"
              isAuth={Cookies.get("userToken")}
              Component={Market}
            />

            <ProtectedRoute
              exact
              path="/market/products"
              isAuth={Cookies.get("userToken")}
              Component={() => <Products currentUser={user} />}
            />

            <ProtectedRoute
              exact
              path="/user/profile"
              isAuth={Cookies.get("userToken")}
              Component={() => (
                <Profile
                  refresh={refresh}
                  setRefresh={setRefresh}
                  currentUser={user}
                />
              )}
            />

            <ProtectedRoute
              exact
              path="/user/inventory"
              isAuth={Cookies.get("userToken")}
              Component={() => (
                <SellInventory
                  refresh={refresh}
                  setRefresh={setRefresh}
                  currentUser={user}
                />
              )}
            />

            <ProtectedRoute
              exact
              path="/payment/success"
              isAuth={Cookies.get("userToken")}
              Component={() => (
                <PaymentSuccessSceen
                  refresh={refresh}
                  setRefresh={setRefresh}
                  currentUser={user}
                />
              )}
            />

            <ProtectedRoute
              exact
              path="/user/payment"
              isAuth={Cookies.get("userToken")}
              Component={() => (
                <Payment
                  refresh={refresh}
                  setRefresh={setRefresh}
                  currentUser={user}
                />
              )}
            />

            <ProtectedRoute
              exact
              path="/user/settings"
              isAuth={Cookies.get("userToken")}
              Component={() => (
                <Settings
                  refresh={refresh}
                  setRefresh={setRefresh}
                  currentUser={user}
                />
              )}
            />

            <ProtectedRoute
              exact
              path="/user/settings/manage-name"
              isAuth={Cookies.get("userToken")}
              Component={() => (
                <ChangeName
                  refresh={refresh}
                  setRefresh={setRefresh}
                  currentUser={user}
                />
              )}
            />

            <ProtectedRoute
              exact
              path="/user/settings/manage-password"
              isAuth={Cookies.get("userToken")}
              Component={() => (
                <Changepass
                  refresh={refresh}
                  setRefresh={setRefresh}
                  currentUser={user}
                />
              )}
            />

          </Switch>
        </Router>
      </div>
    )
  );
}

export default App;
