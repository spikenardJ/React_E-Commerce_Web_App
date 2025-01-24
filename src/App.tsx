import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ShoppingCart from "./components/ShoppingCart";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NotFound from "./components/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient()

const App = ()=> {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    )
}

export default App;