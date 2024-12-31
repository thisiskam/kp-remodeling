import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Estimate from './pages/Estimate';
import Portfolio from './pages/Portfolio';
import BlogSingle from './pages/BlogSingle';
import Login from './pages/Login';
import Admin from './pages/admin';
import Layout from './Layout';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';



const router = createBrowserRouter(
  [
    {
      element: <Layout />, // Common layout for all pages
      children: [
        { path: '/', element: <Home /> },
        { path: 'blog', element: <Blog /> },
        { path: 'blog/:id', element: <BlogSingle /> },
        { path: 'estimate', element: <Estimate /> },
        { path: 'portfolio', element: <Portfolio /> },
        { path: 'login', element: <Login /> },
        { path: 'admin', element: <Admin /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);