import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

import { useEffect, useState } from 'react';
import fetch from '../fetch'; // Archivo de funciones para las solicitudes al backend

import 'bootstrap/dist/css/bootstrap.min.css';

const Ventas = () => {
    const [listaVentas, setListaVentas] = useState([]); // Lista de ventas
    const [listaUsuarios, setListaUsuarios] = useState([]); // Lista de usuarios
    const [listaVideojuegos, setListaVideojuegos] = useState([]); // Lista de videojuegos

    const [id, setId] = useState(null); // ID de la venta
    const [usuarioId, setUsuarioId] = useState(''); // Usuario seleccionado
    const [fechaVenta, setFechaVenta] = useState(''); // Fecha de la venta
    const [videojuegos, setVideojuegos] = useState([]); // Videojuegos seleccionados
    const [cantidades, setCantidades] = useState([]); // Cantidades por videojuego
    const [msg, setMsg] = useState(''); // Mensaje de feedback
    const [success, setSuccess] = useState(false); // Éxito o error en la operación

    // Función para limpiar el formulario
    const resetForm = () => {
        setId(null);
        setUsuarioId('');
        setFechaVenta('');
        setVideojuegos([]);
        setCantidades([]);
    };

    // Cargar listas de ventas, usuarios y videojuegos al montar el componente
    useEffect(() => {
        fetch.listaVentas(setListaVentas);
        fetch.listaUsuarios(setListaUsuarios);
        fetch.listaVideojuegos(setListaVideojuegos);
    }, []);

    // Llenar el formulario para editar una venta
    const fillForm = (ventaId) => {
        fetch.getVenta(ventaId)
            .then(data => {
                setId(data.id);
                setUsuarioId(data.usuario.id);
                setFechaVenta(data.fechaVenta);
                setVideojuegos(data.videojuegos.map(v => v.id)); // IDs de videojuegos
                setCantidades(data.cantidades);
            })
            .catch(error => console.error('Error al obtener la venta:', error));
    };

    // Función para manejar el guardado de la venta y actualización de la lista de videojuegos
    const handleGuardarVenta = () => {
        if (!usuarioId || !fechaVenta || !videojuegos.length || !cantidades.length) {
            setMsg("Todos los campos son obligatorios");
            setSuccess(false);
        } else {
            fetch.createVenta(
                id, usuarioId, fechaVenta, videojuegos, cantidades,
                setMsg, setSuccess, setListaVentas
            );
            // Actualizamos la lista de videojuegos después de realizar la venta
            fetch.listaVideojuegos(setListaVideojuegos);
            resetForm(); // Limpiar formulario después de la operación
        }
    };

    return (
        <div className="Ventas" style={{ marginTop: "5%" }}>
            <Container>
                <Row>
                    {/* Formulario */}
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Select
                                    value={usuarioId}
                                    onChange={(e) => setUsuarioId(e.target.value)}
                                >
                                    <option value="">Seleccione un usuario</option>
                                    {listaUsuarios.map((usuario) => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.nombre} ({usuario.email}) {usuario.fechaMembresia ? ' - Premium' : ''}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de Venta</Form.Label>
                                <Form.Control
                                    value={fechaVenta}
                                    onChange={(e) => setFechaVenta(e.target.value)}
                                    type="date"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Videojuegos</Form.Label>
                                <Form.Select
                                    multiple
                                    value={videojuegos}
                                    onChange={(e) =>
                                        setVideojuegos(
                                            Array.from(e.target.selectedOptions, (option) => parseInt(option.value))
                                        )
                                    }
                                >
                                    {listaVideojuegos.map((videojuego) => (
                                        <option key={videojuego.id} value={videojuego.id}>
                                            {videojuego.nombre} - ${videojuego.precio}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cantidades (correspondientes a los videojuegos seleccionados)</Form.Label>
                                <Form.Control
                                    value={cantidades.join(',')}
                                    onChange={(e) =>
                                        setCantidades(e.target.value.split(',').map((c) => parseInt(c.trim())))
                                    }
                                    type="text"
                                    placeholder="Ejemplo: 1,2,3"
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={handleGuardarVenta}
                                style={{ marginTop: '2.5%', width: '30%', marginLeft: '33.33%' }}
                            >
                                Aceptar
                            </Button>
                        </Form>
                    </Col>

                    {/* Tabla de ventas */}
                    <Col>
                        <Table striped bordered hover style={{ marginTop: '2.5%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Usuario</th>
                                    <th>Fecha</th>
                                    <th>Videojuegos</th>
                                    <th>Cantidades</th>
                                    <th>Descuento</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaVentas.map((venta) => (
                                    <tr key={venta.id}>
                                        <td>{venta.id}</td>
                                        <td>{venta.usuario.nombre} {venta.usuario.esPremium ? '(Premium)' : ''}</td>
                                        <td>{venta.fechaVenta}</td>
                                        <td>{venta.videojuegos.map((v) => v.nombre).join(', ')}</td>
                                        <td>{venta.cantidades.join(', ')}</td>
                                        <td>{venta.usuario.esPremium ? '20%' : '0%'}</td>
                                        <td>${venta.total.toFixed(2)}</td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                        fetch.deleteVenta(venta.id, setMsg, setSuccess, setListaVentas)
                                                    }
                                                >
                                                    Eliminar
                                                </Button>
                                              
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Ventas;
