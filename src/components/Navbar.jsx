import React from 'react';
import { Menu, Layout, Button } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  CarOutlined,
  ShoppingCartOutlined, 
  CalendarOutlined,
  LogoutOutlined,
  SettingOutlined,DollarOutlined
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAdmin } from '../services/auth';

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userIsAdmin = isAdmin(); 

  const selectedKey = (() => {
    if (location.pathname.startsWith('/autos')) return 'autos';
    if (location.pathname.startsWith('/home')) return 'Home';
    if (location.pathname.startsWith('/usuarios')) return 'usuarios';
    if (location.pathname.startsWith('/reservas')) return 'reservas';
    if (location.pathname.startsWith('/carrito')) return 'carrito';
    if (location.pathname.startsWith('/facturas')) return 'facturas';
    if (location.pathname.startsWith('/login')) return 'login';
    if (location.pathname.startsWith('/otros')) return 'otros';
    if (location.pathname.startsWith('/register')) return 'register';
     if (location.pathname.startsWith('/pagos')) return 'register';
    
    return 'inicio';
  })();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('rememberMe');
    navigate('/login');
  };

  return (
    <Header 
  className="navbar-header" 
  style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '0 20px', // Ajusta el padding según necesites
    height: '64px' // Asegura la altura, o déjala por defecto
  }}
>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
    <div className="navbar-logo" style={{ marginRight: '20px' }}>
      <img src="/logos/logo.png" alt="MiApp Logo" />
      <span>Cuenca Wheels</span>
    </div>
        
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          className="navbar-menu"
          style={{ 
        flex: 1, 
        lineHeight: '64px', // Para alinear verticalmente con el header
        borderBottom: 'none' // Opcional: quitar el borde inferior si lo hay
      }}
    
        >
          
          <Menu.Item key="Home" icon={<HomeOutlined />}>
            <Link to="/home">Inicio</Link>
          </Menu.Item>
          
          <Menu.Item key="autos" icon={<CarOutlined />}>
            <Link to="/autos">Autos</Link>
          </Menu.Item>
          <Menu.Item key="carrito" icon={<ShoppingCartOutlined />}>
            <Link to="/carrito">Carrito</Link>
          </Menu.Item>
          
          <Menu.Item key="reservas" icon={<CalendarOutlined />}>
            <Link to="/reservas">Reservas</Link>
          </Menu.Item>
          {userIsAdmin && (
          <Menu.Item key="facturas" icon={<CalendarOutlined />}>
            <Link to="/facturas">Facturas</Link>
          </Menu.Item>
          )} 
          {userIsAdmin && (

            <Menu.Item key="usuarios" icon={<UserOutlined />}>
              <Link to="/usuarios">Usuarios</Link>
            </Menu.Item>
            )} 
            {userIsAdmin && (

            <Menu.Item key="pagos" icon={<DollarOutlined />}>
              <Link to="/pagos">Pagos</Link>
            </Menu.Item>
            )} 
        </Menu>
      </div>

      <Button 
        type="primary" 
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{ marginLeft: 'auto' }}
      >
        Cerrar Sesión
      </Button>
      {/* <Button 
        type="primary" 
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{ marginLeft: 'auto'  }}
      >
        Iniciar Sesión
      </Button> */}
    </Header>
  );
};

export default Navbar;
//<DollarOutlined />