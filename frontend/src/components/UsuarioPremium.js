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

const UsuariosPremium = () => {
    const [listaUsuariosPremium, setListaUsuariosPremium] = useState([]); // Lista de usuarios premium
    const [id, setId] = useState(null); // ID del usuario premium (para modificar)
    const [nombre, setNombre] = useState(''); // Nombre del usuario premium
    const [email, setEmail] = useState(''); // Email del usuario premium
    const [fechaRegistro, setFechaRegistro] = useState(''); // Fecha de registro
    const [fechaMembresia, setFechaMembresia] = useState(''); // Fecha de adquisición de la membresía premium
    const [accesoDescuentosExclusivos, setAccesoDescuentosExclusivos] = useState(false); // Acceso a descuentos exclusivos
    const [msg, setMsg] = useState(''); // Mensaje de feedback
    const [success, setSuccess] = useState(false); // Éxito o error en la operación

    // Función para limpiar el formulario
    const resetForm = () => {
        setId(null);
        setNombre('');
        setEmail('');
        setFechaRegistro('');
        setFechaMembresia('');
        setAccesoDescuentosExclusivos(false);
    };

    // Cargar usuarios premium al montar el componente
    useEffect(() => {
        fetch.listaUsuariosPremium(setListaUsuariosPremium);
    }, []);

    // Llenar el formulario para editar un usuario premium
    const fillForm = (usuarioId) => {
        fetch.getUsuarioPremium(usuarioId)
            .then(data => {
                setId(data.id);
                setNombre(data.nombre);
                setEmail(data.email);
                setFechaRegistro(data.fechaRegistro);
                setFechaMembresia(data.fechaMembresia);
                setAccesoDescuentosExclusivos(data.accesoDescuentosExclusivos);
            })
            .catch(error => console.error('Error al obtener el usuario premium:', error));
    };

    return (
        <div className="UsuariosPremium" style={{ marginTop: "5%" }}>
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
                                    placeholder="Nombre del usuario premium"
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
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de Membresía</Form.Label>
                                <Form.Control
                                    value={fechaMembresia}
                                    onChange={(e) => setFechaMembresia(e.target.value)}
                                    type="date"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Acceso a descuentos exclusivos"
                                    checked={accesoDescuentosExclusivos}
                                    onChange={(e) => setAccesoDescuentosExclusivos(e.target.checked)}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={() => {
                                    if (!nombre || !email || !fechaRegistro || !fechaMembresia) {
                                        setMsg("Todos los campos son obligatorios");
                                        setSuccess(false);
                                    } else {
                                        fetch.createUsuarioPremium(
                                            id, nombre, email, fechaRegistro, fechaMembresia, accesoDescuentosExclusivos,
                                            setMsg, setSuccess, setListaUsuariosPremium
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

                    {/* Tabla de usuarios premium */}
                    <Col>
                        <Table striped bordered hover style={{ marginTop: '2.5%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Fecha de Registro</th>
                                    <th>Fecha de Membresía</th>
                                    <th>Descuentos Exclusivos</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaUsuariosPremium.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.fechaRegistro}</td>
                                        <td>{usuario.fechaMembresia}</td>
                                        <td>{usuario.accesoDescuentosExclusivos ? "Sí" : "No"}</td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button
                                                    variant="danger"
                                                    onClick={() => fetch.deleteUsuarioPremium(usuario.id, setMsg, setSuccess, setListaUsuariosPremium)}
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

export default UsuariosPremium;
