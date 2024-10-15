import { BiSolidOffer } from 'react-icons/bi';
import { Cart, Checkout, Footer, MainHeader, Pass, PayNow } from './componets';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="">
      <Router>
        <button className="w-max border-none  fixed top-[50%] -right-5 z-20 bg-gradient-to-r font-[600] from-[#D0007A] to-[#5D0179] mt-8 py-3 px-4 rounded-lg text-white  text-[16px] rotate-[270deg] flex items-center gap-2">
          <BiSolidOffer className='text-3xl animate-pulse' />  Offer Blast!
        </button>
        <Routes>
          <Route path="/" element={<MainHeader />} />
          <Route path="/products/:slug" element={<Pass />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/:slug" element={<Checkout />} />
          <Route path="/pay/:slug" element={<PayNow />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
