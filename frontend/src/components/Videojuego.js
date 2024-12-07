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

const Videojuegos = () => {
    const [listaVideojuegos, setListaVideojuegos] = useState([]); // Lista de videojuegos
    const [id, setId] = useState(null); // ID del videojuego (para modificar)
    const [nombre, setNombre] = useState(''); // Nombre del videojuego
    const [descripcion, setDescripcion] = useState(''); // Descripción
    const [precio, setPrecio] = useState(''); // Precio
    const [imagen, setImagen] = useState(''); // URL de imagen
    const [cantidadCopias, setCantidadCopias] = useState(''); // Stock
    const [categoria, setCategoria] = useState(''); // Categoría
    const [msg, setMsg] = useState(''); // Mensaje de feedback
    const [success, setSuccess] = useState(false); // Éxito o error en la operación

    // Función para limpiar el formulario
    const resetForm = () => {
        setId(null);
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setImagen('');
        setCantidadCopias('');
        setCategoria('');
    };

    // Cargar videojuegos al montar el componente
    useEffect(() => {
        fetch.listaVideojuegos(setListaVideojuegos);
    }, []);

    // Llenar el formulario para editar un videojuego
    const fillForm = (videojuegoId) => {
        fetch.getVideojuego(videojuegoId)
            .then(data => {
                setId(data.id);
                setNombre(data.nombre);
                setDescripcion(data.descripcion);
                setPrecio(data.precio);
                setImagen(data.imagen);
                setCantidadCopias(data.cantidadCopias);
                setCategoria(data.categoria);
            })
            .catch(error => console.error('Error al obtener el videojuego:', error));
    };

    return (
        <div className="Videojuegos" style={{ marginTop: "5%" }}>
            <Container>
                <Row>
                    {/* Formulario */}
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    type="text"
                                    placeholder="Nombre del videojuego"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    type="text"
                                    placeholder="Descripción del videojuego"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    type="number"
                                    placeholder="Precio"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Imagen (URL)</Form.Label>
                                <Form.Control
                                    value={imagen}
                                    onChange={(e) => setImagen(e.target.value)}
                                    type="text"
                                    placeholder="URL de la imagen"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cantidad de copias</Form.Label>
                                <Form.Control
                                    value={cantidadCopias}
                                    onChange={(e) => setCantidadCopias(e.target.value)}
                                    type="number"
                                    placeholder="Stock disponible"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    type="text"
                                    placeholder="Categoría del videojuego"
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={() => {
                                    if (!nombre || !precio || !cantidadCopias || !categoria) {
                                        setMsg("Los campos obligatorios deben completarse");
                                        setSuccess(false);
                                    } else {
                                        fetch.createVideojuego(
                                            id, nombre, descripcion, precio, imagen, cantidadCopias, categoria,
                                            setMsg, setSuccess, setListaVideojuegos
                                        );
                                        resetForm(); // Limpia el formulario después de la operación
                                    }
                                }}
                                style={{ marginTop: '2.5%', width: '30%', marginLeft: '33.33%' }}
                            >
                                Aceptar
                            </Button>
                        </Form>
                    </Col>

                    {/* Tabla de videojuegos */}
                    <Col>
                        <Table striped bordered hover style={{ marginTop: '2.5%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Categoría</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaVideojuegos.map((videojuego) => (
                                    <tr key={videojuego.id}>
                                        <td>{videojuego.id}</td>
                                        <td>{videojuego.nombre}</td>
                                        <td>{videojuego.descripcion}</td>
                                        <td>{videojuego.precio}</td>
                                        <td>{videojuego.categoria}</td>
                                        <td>{videojuego.cantidadCopias}</td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button
                                                    variant="danger"
                                                    onClick={() => fetch.deleteVideojuego(videojuego.id, setMsg, setSuccess, setListaVideojuegos)}
                                                >
                                                    Eliminar
                                                </Button>
                                                <Button
                                                    style={{ backgroundColor: '#007BFF', color: 'white', border: 'none' }}
                                                    onClick={() => fillForm(videojuego.id)}
                                                >
                                                    Modificar
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

export default Videojuegos;   