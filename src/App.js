import { BiSolidOffer } from "react-icons/bi";
import {
  AdminDashboard,
  Cart,
  Checkout,
  Footer,
  Loader,
  MainHeader,
  Pass,
  PayNow,
  SuperAdminDashboard,
} from "./componets";
import {
  Route,
  Routes,
  useLocation,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import AddDates from "./componets/admin/AddDates";
import { DatesProvider } from "./context/dateContext";
import CreatePass from "./componets/admin/CreatePass";
import { PassProvider } from "./context/AddminPassContext";
import { Login, SignUp } from "./auth";
import { useEffect, useState } from "react";

function Layout() {
  const [token, setToken] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);

    // Check if no token is found and the user tries to access a protected route
    if (!savedToken && location.pathname.startsWith("/admin")) {
      navigate("/login"); // Navigate to login if token is missing
    }
  }, [location, navigate]);

  // Redirect to SuperAdminDashboard if token exists
  useEffect(() => {
    if (token && location.pathname === "/login") {
      navigate("/admin/super-admin");
    }
  }, [token, location.pathname, navigate]);

  return (
    <div className="min-h-screen">
      <DatesProvider>
        <PassProvider>
          <button className="w-max border-none fixed top-[50%] -right-5 z-20 bg-gradient-to-r font-[600] from-[#D0007A] to-[#5D0179] mt-8 py-3 px-4 rounded-lg text-white text-[16px] rotate-[270deg] flex items-center gap-2">
            <BiSolidOffer className="text-3xl animate-pulse" /> Offer Blast!
          </button>

          <Routes>
            <Route path="/" element={<MainHeader />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/products/:id" element={<Pass />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/pay/:slug" element={<PayNow />} />
            <Route
              path="/pass/:id"
              element={<AdminDashboard token={token} />}
            />
            <Route path="/admin/add-event" element={<AddDates />} />
            <Route path="/admin/create-pass" element={<CreatePass />} />
            <Route
              path="/admin/super-admin"
              element={<SuperAdminDashboard />}
            />
          </Routes>
        </PassProvider>
      </DatesProvider>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
export default App;
