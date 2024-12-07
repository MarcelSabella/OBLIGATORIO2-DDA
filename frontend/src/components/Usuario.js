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

const Usuarios = () => {
    const [listaUsuarios, setListaUsuarios] = useState([]); // Lista de usuarios
    const [id, setId] = useState(null); // ID del usuario (para modificar)
    const [nombre, setNombre] = useState(''); // Nombre del usuario
    const [email, setEmail] = useState(''); // Email del usuario
    const [fechaRegistro, setFechaRegistro] = useState(''); // Fecha de registro
    const [msg, setMsg] = useState(''); // Mensaje para feedback
    const [success, setSuccess] = useState(false); // Éxito o error en la operación

    // Función para limpiar el formulario
    const resetForm = () => {
        setId(null);
        setNombre('');
        setEmail('');
        setFechaRegistro('');
    };

    // Cargar usuarios al montar el componente
    useEffect(() => {
        fetch.listaUsuarios(setListaUsuarios);
    }, []);

    // Llenar el formulario para editar un usuario
    const fillForm = (usuarioId) => {
        fetch.getUsuario(usuarioId)
            .then(data => {
                setId(data.id);
                setNombre(data.nombre);
                setEmail(data.email);
                setFechaRegistro(data.fechaRegistro);
            })
            .catch(error => console.error('Error al obtener el usuario:', error));
    };

    return (
        <div className="Usuarios" style={{ marginTop: "5%" }}>
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
                                    placeholder="Nombre del usuario"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de Registro</Form.Label>
                                <Form.Control
                                    value={fechaRegistro}
                                    onChange={(e) => setFechaRegistro(e.target.value)}
                                    type="date"
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={() => {
                                    if (!nombre || !email || !fechaRegistro) {
                                        setMsg("Todos los campos son obligatorios");
                                        setSuccess(false);
                                    } else {
                                        fetch.createUsuario(id, nombre, email, fechaRegistro, setMsg, setSuccess, setListaUsuarios);
                                        resetForm(); // Limpia el formulario después de la operación
                                    }
                                }}
                                style={{ marginTop: '2.5%', width: '30%', marginLeft: '33.33%' }}
                            >
                                Aceptar
                            </Button>
                        </Form>
                    </Col>

                    {/* Tabla de usuarios */}
                    <Col>
                        <Table striped bordered hover style={{ marginTop: '2.5%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Fecha de Registro</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaUsuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.fechaRegistro}</td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button
                                                    variant="danger"
                                                    onClick={() => fetch.deleteUsuario(usuario.id, setMsg, setSuccess, setListaUsuarios)}
                                                >
                                                    Eliminar
                                                </Button>
                                                <Button
                                                    style={{ backgroundColor: '#007BFF', color: 'white', border: 'none' }}
                                                    onClick={() => fillForm(usuario.id)}
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

export default Usuarios;
