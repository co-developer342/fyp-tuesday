import "./App.css";
import { Route, Routes } from "react-router-dom";
// import HomePage from './pages/HomePage';
import HomePage from "./ui/pages/HomePage.jsx";
import Shop from "./ui/pages/shop.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Dashboard from "./pages/user/Dashboard.js";
import PageNotFound from "./pages/PageNotFound";
// import Register from "./pages/Auth/Register";
import SignUp from "./ui/pages/Auth/SignUp.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Login from "./pages/Auth/Login";
import Login from "./ui/pages/Auth/Login.jsx"
import PrivateRoute from "./components/Routes/Private.js";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";

import Users from "./pages/Admin/Users.js";
import Order from "./pages/user/Order.js";
import Profile from "./pages/user/Profile.js";
import AllProducts from "./pages/Admin/AllProducts.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
// import Search from "./pages/Search.js";
import Search from "./ui/components/Search.js";
import ProductDetail from "./pages/ProductDetail.js";
import Categories from "./pages/Categories.js";
import CategoryProduct from "./pages/CategoryProduct.js";
import CartPage from "./ui/pages/CartPage.jsx";
import AdminOrders from "./pages/Admin/AdminOrders.js";
import ProductPage from "./ui/pages/ProductPage.jsx";

function App(props) {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        {/* <Route path='/' element={<HomePage/>}/> */}
        <Route path="/register" element={<SignUp />} />
        {/* <Route path="/ProductPage" element={<ProductPage />} /> */}
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/search" element={<Search/>} />
        <Route path="/categories" element={<Categories />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/order" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<AllProducts />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
