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
import Login from './pages/Login';
import Admin from './pages/admin';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Nav />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogSingle />} />
            <Route path="estimate" element={<Estimate />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>,
)
