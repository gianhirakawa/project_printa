import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { services } from "./content/services.ts";
import SiteFooter from "./components/SiteFooter.tsx";
import SiteHeader from "./components/SiteHeader.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServicePage from "./pages/ServicePage.tsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="visually-hidden focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <ScrollToTop />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {services.map((s) => (
            <Route key={s.slug} path={`/services/${s.slug}`} element={<ServicePage slug={s.slug} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
