import "animate.css";
import { onAuthStateChanged } from "firebase/auth";
import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import DiscountPage from "./adminComponents/pages/DiscountPage";
import OrdersPage from "./adminComponents/pages/OrdersPage";
import { auth } from "./firebase/firebase-config";
const LayoutClient = lazy(() =>
  import("./clientComponents/layouts/LayoutClient")
);
const RegisterLayout = lazy(() =>
  import("./clientComponents/layouts/RegisterLayout")
);
const HomePage = lazy(() => import("./clientComponents/pages/HomePage"));
const ShopPage = lazy(() => import("./clientComponents/pages/ShopPage"));
const BlogPage = lazy(() => import("./clientComponents/pages/BlogPage"));
const ShopDetail = lazy(() => import("./clientComponents/pages/ShopDetail"));
const BlogDetail = lazy(() => import("./clientComponents/pages/BlogDetail"));
const SignIn = lazy(() => import("./clientComponents/pages/SignIn"));
const SignUp = lazy(() => import("./clientComponents/pages/SignUp"));
const CartPage = lazy(() => import("./clientComponents/pages/CartPage"));
const CheckOut = lazy(() => import("./clientComponents/pages/CheckOut"));
const Profile = lazy(() => import("./clientComponents/pages/ProfilePage"));

const LayoutAdmin = lazy(() => import("./adminComponents/layouts/LayoutAdmin"));
const AddProductsPage = lazy(() =>
  import("./adminComponents/pages/AddProductsPage")
);
const DashboardPage = lazy(() =>
  import("./adminComponents/pages/DashboardPage")
);
const ProductsPage = lazy(() => import("./adminComponents/pages/ProductsPage"));
const BannerPage = lazy(() => import("./adminComponents/pages/BannerPage"));
const SignInAdmin = lazy(() => import("./adminComponents/pages/SignInAdmin"));
const Search = lazy(() => import("./clientComponents/pages/SearchPage"));

function App() {
  const { user } = useSelector((state) => state.user);
  const [state, setState] = React.useState();
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setState(true);
      } else {
        setState(false);
      }
    });
  }, []);
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-screen h-screen text-xl font-semibold">
            loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LayoutClient></LayoutClient>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/shop" element={<ShopPage></ShopPage>}></Route>
            <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
            <Route
              path="/shop/:slug"
              element={<ShopDetail></ShopDetail>}
            ></Route>
            <Route
              path="/blog/:slug"
              element={<BlogDetail></BlogDetail>}
            ></Route>
            <Route path="/cart" element={<CartPage></CartPage>}></Route>
            {state && (
              <>
                <Route path="/checkout" element={<CheckOut></CheckOut>}></Route>
                <Route path="/profile" element={<Profile></Profile>}></Route>
              </>
            )}

            <Route path="/search/:slug" element={<Search></Search>}></Route>
          </Route>
          {!state && (
            <Route path="/" element={<RegisterLayout></RegisterLayout>}>
              <Route path="/signin" element={<SignIn></SignIn>}></Route>
              <Route path="/signup" element={<SignUp></SignUp>}></Route>
              <Route
                path="/signinAdmin"
                element={<SignInAdmin></SignInAdmin>}
              ></Route>
            </Route>
          )}

          {user.isAdmin && (
            <Route path="/admin" element={<LayoutAdmin></LayoutAdmin>}>
              <Route
                path="/admin/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/admin/add-product"
                element={<AddProductsPage></AddProductsPage>}
              ></Route>
              <Route
                path="/admin/products"
                element={<ProductsPage></ProductsPage>}
              ></Route>
              <Route
                path="/admin/banners"
                element={<BannerPage></BannerPage>}
              ></Route>
              <Route
                path="/admin/orders"
                element={<OrdersPage></OrdersPage>}
              ></Route>
              <Route
                path="/admin/discounts"
                element={<DiscountPage></DiscountPage>}
              ></Route>
            </Route>
          )}

          <Route
            path="*"
            element={
              <div className="flex items-center justify-center w-screen h-screen text-3xl font-semibold">
                Page Not Found
              </div>
            }
          ></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
