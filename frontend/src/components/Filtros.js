import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filtros = () => {
    const [stock, setStock] = useState(''); // Filtro de stock mínimo
    const [tipoUsuario, setTipoUsuario] = useState(''); // Filtro por tipo de usuario
    const [usuarioId, setUsuarioId] = useState(''); // ID del usuario para buscar ventas
    const [fecha, setFecha] = useState(''); // Fecha para buscar ventas
    const [videojuegos, setVideojuegos] = useState([]); // Lista de videojuegos filtrados
    const [usuarios, setUsuarios] = useState([]); // Lista de usuarios filtrados
    const [ventas, setVentas] = useState([]); // Lista de ventas realizadas
    const [error, setError] = useState(null); // Mensaje de error

    // Función para realizar la búsqueda de videojuegos
    const buscarVideojuegos = () => {
        const url = `http://localhost:5000/videojuegos/stockbajo/${stock}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la búsqueda de videojuegos');
                }
                return response.json();
            })
            .then((data) => {
                setVideojuegos(data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setVideojuegos([]);
            });
    };

    // Función para buscar usuarios por tipo
    const buscarUsuarios = () => {
        const url = `http://localhost:5000/usuarios/filtrar?tipo=${tipoUsuario}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la búsqueda de usuarios');
                }
                return response.json();
            })
            .then((data) => {
                setUsuarios(data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setUsuarios([]);
            });
    };

    // Función para buscar ventas realizadas por un usuario
    const buscarVentasPorUsuario = () => {
        const url = `http://localhost:5000/usuarios/${usuarioId}/ventas`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la búsqueda de ventas');
                }
                return response.json();
            })
            .then((data) => {
                setVentas(data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setVentas([]);
            });
    };

    // Función para buscar ventas realizadas en una fecha específica
    const buscarVentasPorFecha = () => {
        const url = `http://localhost:5000/ventas/filtrarPorFecha?fecha=${fecha}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la búsqueda de ventas por fecha');
                }
                return response.json();
            })
            .then((data) => {
                setVentas(data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setVentas([]);
            });
    };

    return (
        <Container style={{ marginTop: '5%' }}>
            <Row>
                <Col>
                    <Form>
                        {/* Filtro por stock */}
                        <Form.Group className="mb-3">
                            <Form.Label>Stock máximo</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese la cantidad máxima de stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={buscarVideojuegos} style={{ marginBottom: '15px' }}>
                            Buscar Videojuegos
                        </Button>
                        {/* Resultados de videojuegos */}
                        <Row style={{ marginTop: '15px' }}>
                            <Col>
                                <h5>Videojuegos</h5>
                                {error ? (
                                    <p style={{ color: 'red' }}>{error}</p>
                                ) : (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Categoría</th>
                                                <th>Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {videojuegos.map((videojuego) => (
                                                <tr key={videojuego.id}>
                                                    <td>{videojuego.id}</td>
                                                    <td>{videojuego.nombre}</td>
                                                    <td>{videojuego.precio}</td>
                                                    <td>{videojuego.categoria}</td>
                                                    <td>{videojuego.cantidadCopias}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Col>
                        </Row>

                        {/* Filtro por tipo de usuario */}
                        <Form.Group className="mb-3">
                            <Form.Label>Filtrar por tipo de usuario</Form.Label>
                            <Form.Select
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                            >
                                <option value="">Seleccione tipo</option>
                                <option value="premium">Premium</option>
                                <option value="regular">Regular</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" onClick={buscarUsuarios} style={{ marginBottom: '20px' }}>
                            Buscar Usuarios
                        </Button>
                        {/* Resultados de usuarios */}
                        <Row style={{ marginTop: '20px' }}>
                            <Col>
                                <h5>Usuarios</h5>
                                {error ? (
                                    <p style={{ color: 'red' }}>{error}</p>
                                ) : (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Email</th>
                                                <th>Tipo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usuarios.map((usuario) => (
                                                <tr key={usuario.id}>
                                                    <td>{usuario.id}</td>
                                                    <td>{usuario.nombre}</td>
                                                    <td>{usuario.email}</td>
                                                    <td>{usuario.fechaMembresia ? 'Premium' : 'Regular'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Col>
                        </Row>

                        {/* Filtro por ventas de usuario */}
                        <Form.Group className="mb-3">
                            <Form.Label>Buscar ventas por usuario</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese el ID del usuario"
                                value={usuarioId}
                                onChange={(e) => setUsuarioId(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={buscarVentasPorUsuario}>
                            Buscar Ventas
                        </Button>
                        {/* Resultados de ventas por usuario */}
                        <Row style={{ marginTop: '30px' }}>
                            <Col>
                                <h5>Ventas por Usuario</h5>
                                {error ? (
                                    <p style={{ color: 'red' }}>{error}</p>
                                ) : (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>ID Venta</th>
                                                <th>Fecha</th>
                                                <th>Total</th>
                                                <th>Videojuegos</th>
                                                <th>Cantidades</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ventas.map((venta) => (
                                                <tr key={venta.id}>
                                                    <td>{venta.id}</td>
                                                    <td>{venta.fechaVenta}</td>
                                                    <td>${venta.total}</td>
                                                    <td>{venta.videojuegos.map((v) => v.nombre).join(', ')}</td>
                                                    <td>{venta.cantidades.join(', ')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Col>
                        </Row>

                        {/* Filtro por fecha */}
                        <Form.Group className="mb-3">
                            <Form.Label>Buscar ventas por fecha</Form.Label>
                            <Form.Control
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={buscarVentasPorFecha}>
                            Buscar Ventas por Fecha
                        </Button>
                        {/* Resultados de ventas por fecha */}
                        <Row style={{ marginTop: '30px' }}>
                            <Col>
                                <h5>Ventas por Fecha</h5>
                                {error ? (
                                    <p style={{ color: 'red' }}>{error}</p>
                                ) : (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>ID Venta</th>
                                                <th>Fecha</th>
                                                <th>Total</th>
                                                <th>Usuario</th>
                                                <th>Videojuegos</th>
                                                <th>Cantidades</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ventas.map((venta) => (
                                                <tr key={venta.id}>
                                                    <td>{venta.id}</td>
                                                    <td>{venta.fechaVenta}</td>
                                                    <td>${venta.total}</td>
                                                    <td>{venta.usuario.nombre}</td>
                                                    <td>{venta.videojuegos.map((v) => v.nombre).join(', ')}</td>
                                                    <td>{venta.cantidades.join(', ')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Filtros;

