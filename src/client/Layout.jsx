import {
  Outlet,
} from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';


export default function Layout () {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Nav />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }