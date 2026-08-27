import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./compnent/Navbar";
import Footer from "./compnent/Footer";

// Har page ab apne alag chunk me jaata hai. Home kholne par sirf Home ka
// code download hota hai — About/Service/Work/Contact ka nahi. Isse pehle
// saare 5 pages ek hi bundle me aate the.
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Service = lazy(() => import("./Pages/Service"));
const Work = lazy(() => import("./Pages/Work"));
const Contact = lazy(() => import("./Pages/Contact"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      {/* fallback minimal — bada spinner CLS badha deta hai */}
      <Suspense fallback={<div className="min-h-screen bg-[#15140F]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;