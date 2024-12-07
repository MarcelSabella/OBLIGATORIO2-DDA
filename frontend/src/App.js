import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import fetch from './fetch';
import Usuario from './components/Usuario';
import Videojuego from './components/Videojuego';
import UsuariosPremium from './components/UsuarioPremium';
import Venta from './components/Venta';
import Filtros from './components/Filtros';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {
  const [showUsuariosMenu, setShowUsuariosMenu] = useState(false);
  const [showVideojuegoMenu, setShowVideojuegoMenu] = useState(false);
  const [showUsuariosPremiumMenu, setShowUsuariosPremiumMenu] = useState(false);
  const [showVentaMenu, setShowVentaMenu] = useState(false);
  const [showFiltrosMenu, setShowFiltrosMenu] = useState(false);

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaVideojuegos, setListaVideojuegos] = useState([]);
  const [listaUsuariosPremium, setListaUsuariosPremium] = useState([]);
  const [listaVentas, setListaVentas] = useState([]);
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleMenuClick = (menu) => {
    setShowUsuariosMenu(menu === "usuarios");
    setShowUsuariosPremiumMenu(menu === "usuariosPremium");
    setShowVideojuegoMenu(menu === "videojuegos");
    setShowVentaMenu(menu === "ventas");
    setShowFiltrosMenu(menu === "filtros");
  };

  useEffect(() => {
    fetch.listaUsuarios(setListaUsuarios);
    fetch.listaVideojuegos(setListaVideojuegos);
    fetch.listaUsuariosPremium(setListaUsuariosPremium);
    fetch.listaVentas(setListaVentas);
  }, []);

  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark" expand="sm">
        <Container>
          <Navbar.Brand href="#home">Tienda de videojuegos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleMenuClick("usuarios")}>Usuarios</Nav.Link>
            <Nav.Link onClick={() => handleMenuClick("usuariosPremium")}>Usuarios Premium</Nav.Link>
            <Nav.Link onClick={() => handleMenuClick("videojuegos")}>Videojuegos</Nav.Link>
            <Nav.Link onClick={() => handleMenuClick("ventas")}>Ventas</Nav.Link>
            <Nav.Link onClick={() => handleMenuClick("filtros")}>Consultas</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {success ? (
        <Alert
          variant={"success"}
          style={{ width: "30%", margin: 'auto', marginTop: '2.5%', textAlign: "center" }}
        >
          {msg}
        </Alert>
      ) : null}
      {success !== null && !success ? (
        <Alert
          variant={"danger"}
          style={{ width: "30%", margin: 'auto', marginTop: '2.5%', textAlign: "center" }}
        >
          {msg}
        </Alert>
      ) : null}

      {showUsuariosMenu && <Usuario listaUsuarios={listaUsuarios} />}
      {showVideojuegoMenu && <Videojuego listaVideojuegos={listaVideojuegos} />}
      {showUsuariosPremiumMenu && <UsuariosPremium listaUsuariosPremium={listaUsuariosPremium} />}
      {showVentaMenu && <Venta listaVentas={listaVentas} />}
      {showFiltrosMenu ? (<Filtros />) : null}
    </div>
  );
}

export default App;
