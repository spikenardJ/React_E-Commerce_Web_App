import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ShoppingCart from "./components/ShoppingCart";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/auth"
import { store } from "./store/store";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig"
import RegisterUser from "./components/User/RegisterUser";
import Login from "./components/Login";
import UserProfile from "./components/User/UserProfile";
import ProfileForm from "./components/User/ProfileForm";
import Orders from "./components/Orders/Orders.tsx";
import DisplayOrder from "./components/Orders/DisplayOrder.tsx";
import ProductList from "./components/Products/ProductList.tsx";
import AddProduct from "./components/Products/AddProduct.tsx";
import EditProduct from "./components/Products/EditProduct.tsx";
import NavBar from "./components/NavBar.tsx";
import "bootstrap/dist/css/bootstrap.min.css";


const queryClient = new QueryClient()

const App = ()=> {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User state updated:", currentUser); // Debugging line
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <NavBar />
              <div>
                {user ? (
                  <div>
                    <br />
                    <h2>Welcome, {user.displayName}!</h2>
                    <br />
                  </div>
                ) : (
                  <>
                    <RegisterUser />

                  </>
                )}
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  {/* <Route path="/logout" element={<Logout />} /> */}
                  <Route path="/shopping-cart" element={<ShoppingCart />} />
                  <Route path="/add-user" element={<ProfileForm />} />
                  <Route path="/profile-form" element={<ProfileForm userId={user?.uid} />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:orderId" element={<DisplayOrder />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/new" element={<AddProduct />} />
                  <Route path="/products/edit/:id" element={<EditProduct />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    )
}

export default App;