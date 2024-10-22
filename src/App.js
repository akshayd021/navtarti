import { BiSolidOffer } from "react-icons/bi";
import {
  AdminDashboard,
  Cart,
  Checkout,
  Footer,
  MainHeader,
  Pass,
  PayNow,
  SuperAdminDashboard,
} from "./componets";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddDates from "./componets/admin/AddDates";
import { DatesProvider } from "./context/dateContext";
import CreatePass from "./componets/admin/CreatePass";
import { PassProvider } from "./context/AddminPassContext";

function App() {
  return (
    <div className="">
      <DatesProvider>
        <PassProvider>
          <Router>
            <button className="w-max border-none  fixed top-[50%] -right-5 z-20 bg-gradient-to-r font-[600] from-[#D0007A] to-[#5D0179] mt-8 py-3 px-4 rounded-lg text-white  text-[16px] rotate-[270deg] flex items-center gap-2">
              <BiSolidOffer className="text-3xl animate-pulse" /> Offer Blast!
            </button>

            <Routes>
              <Route path="/" element={<MainHeader />} />
              <Route path="/products/:id" element={<Pass />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/pay/:slug" element={<PayNow />} />
              <Route path="/pass/:id" element={<AdminDashboard />} />
              <Route path="/admin/add-event" element={<AddDates />} />
              <Route path="/admin/create-pass" element={<CreatePass />} />
              <Route
                path="/admin/super-admin"
                element={<SuperAdminDashboard />}
              />
            </Routes>
          </Router>
        </PassProvider>
      </DatesProvider>
      <Footer />
    </div>
  );
}

export default App;
