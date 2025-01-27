import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ShoppingCart from "./components/ShoppingCart";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig"
import RegisterUser from "./components/User/RegisterUser";
import Login from "./components/Login";

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
            <div>
              {user ? (
                <div>
                  <h2>Welcome, {user.email}</h2>
                  <Login /> {/* To provide a logout button */}
                </div>
              ) : (
                <>
                  <RegisterUser />
                  <Login />
                </>
              )}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shopping-cart" element={<ShoppingCart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    )
}

export default App;