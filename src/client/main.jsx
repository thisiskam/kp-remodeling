import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Estimate from './pages/Estimate';
import Portfolio from './pages/Portfolio';
import Nav from './components/Nav';
import BlogSingle from './pages/BlogSingle';
import Footer from './components/Footer'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogSingle />} />
        <Route path="estimate" element={<Estimate />} />
        <Route path="portfolio" element={<Portfolio />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
