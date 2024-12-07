const API_URL = "http://localhost:5000/usuarios"; 
const API_URLVideojuego = "http://localhost:5000/videojuegos"; 
const API_URLPremium = "http://localhost:5000/usuariosPremium";
const API_URLVenta = "http://localhost:5000/ventas";

const listaUsuarios = (setLista) => {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setLista(data))
        .catch(error => console.error('Error al cargar los usuarios:', error));
};

const getUsuario = (idUsuario) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/${idUsuario}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

const createUsuario = (id, nombre, email, fechaRegistro, setMsg, setSuccess, setListaUsuarios) => {
    const method = id ? "PUT" : "POST"; // PUT para modificar, POST para crear
    const usuario = { id, nombre, email, fechaRegistro };

    fetch(API_URL, {
        method,
        body: JSON.stringify(usuario),
        headers: { "Content-Type": "application/json" },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            setMsg("Operación exitosa");
            setSuccess(true);
            listaUsuarios(setListaUsuarios);
        })
        .catch(error => {
            setMsg(`Error: ${error.message}`);
            setSuccess(false);
            console.error('Error al guardar el usuario:', error);
        });
};

const deleteUsuario = (idUsuario, setMsg, setSuccess, setListaUsuarios) => {
    fetch(`${API_URL}/${idUsuario}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.text();
        })
        .then(() => {
            setMsg("Usuario eliminado con éxito");
            setSuccess(true);
            listaUsuarios(setListaUsuarios);
        })
        .catch(error => {
            setMsg(`Error: ${error.message}`);
            setSuccess(false);
            console.error('Error al eliminar el usuario:', error);
        });
};

const listaVideojuegos = (setLista) => {
    fetch(API_URLVideojuego)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setLista(data))
        .catch(error => console.error('Error al cargar los videojuegos:', error));
};

const getVideojuego = (idVideojuego) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URLVideojuego}/${idVideojuego}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

const createVideojuego = (id, nombre, descripcion, precio, imagen, cantidadCopias, categoria, setMsg, setSuccess, setListaVideojuegos) => {
    const method = id ? "PUT" : "POST"; // PUT para modificar, POST para crear
    const videojuego = { id, nombre, descripcion, precio, imagen, cantidadCopias, categoria };

    fetch(API_URLVideojuego, {
        method,
        body: JSON.stringify(videojuego),
        headers: { "Content-Type": "application/json" },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            setMsg("Operación exitosa");
            setSuccess(true);
            listaVideojuegos(setListaVideojuegos);
        })
        .catch(error => {
            setMsg(`Error: ${error.message}`);
            setSuccess(false);
            console.error('Error al guardar el videojuego:', error);
        });
};

const deleteVideojuego = (idVideojuego, setMsg, setSuccess, setListaVideojuegos) => {
    fetch(`${API_URLVideojuego}/${idVideojuego}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.text();
        })
        .then(() => {
            setMsg("Videojuego eliminado con éxito");
            setSuccess(true);
            listaVideojuegos(setListaVideojuegos);
        })
        .catch(error => {
            setMsg(`Error: ${error.message}`);
            setSuccess(false);
            console.error('Error al eliminar el videojuego:', error);
        });
};

// Funciones para UsuarioPremium
const listaUsuariosPremium = (setLista) => {
    fetch(API_URLPremium)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setLista(data))
        .catch(error => console.error('Error al cargar los usuarios premium:', error));
};

const getUsuarioPremium = (idUsuario) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URLPremium}/${idUsuario}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

const createUsuarioPremium = (
    id, nombre, email, fechaRegistro, fechaMembresia, accesoDescuentosExclusivos,
    setMsg, setSuccess, setListaUsuariosPremium
) => {
    const method = id ? "PUT" : "POST"; // PUT para modificar, POST para crear
    const usuarioPremium = { id, nombre, email, fechaRegistro, fechaMembresia, accesoDescuentosExclusivos };

    fetch(API_URLPremium, {
        method,
        body: JSON.stringify(usuarioPremium),
        headers: { "Content-Type": "application/json" },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            setMsg("Operación exitosa");
            setSuccess(true);
            listaUsuariosPremium(setListaUsuariosPremium);
        })
        .catch(error => {
            setMsg(`Error: ${error.message}`);
            setSuccess(false);
            console.error('Error al guardar el usuario premium:', error);
        });
};

const deleteUsuarioPremium = (idUsuario, setMsg, setSuccess, setListaUsuariosPremium) => {
    fetch(`${API_URLPremium}/${idUsuario}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.text();
        })
        .then(() => {
            setMsg("Usuario premium eliminado con éxito");
            setSuccess(true);
            listaUsuariosPremium(setListaUsuariosPremium);
        })
        .catch(error => {
            setMsg(`Error: ${error.message}`);
            setSuccess(false);
            console.error('Error al eliminar el usuario premium:', error);
        });
};

// Listar todas las ventas
const listaVentas = (setLista) => {
    fetch(API_URLVenta)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setLista(data))
        .catch(error => console.error('Error al cargar las ventas:', error));
};

// Obtener una venta por ID
const getVenta = (idVenta) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URLVenta}/${idVenta}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

// Crear o actualizar una venta
const createVenta = (id, usuarioId, fechaVenta, videojuegos, cantidades, setMsg, setSuccess, setListaVentas) => {
    const method = id ? "PUT" : "POST";
    const venta = { 
        id, 
        usuario: { id: usuarioId }, 
        fechaVenta, 
        videojuegos: videojuegos.map(id => ({ id })), // Enviar como lista de objetos
        cantidades 
    };

    console.log("Datos enviados para crear la venta:", venta);

    fetch(API_URLVenta, {
        method,
        body: JSON.stringify(venta),
        headers: { "Content-Type": "application/json" },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            // LA RESPUESTA DEL METODO DEBE SER CONVERTIDO A TEXT Y NO A JSON
            // PORQUE EL ENDPOINT DEVUELVE EL MENSAJE "Venta registrada con éxito."
            // return response.json();
            return response.text();

        })
        .then(() => {
            setMsg("Venta guardada con éxito");
            setSuccess(true);
            listaVentas(setListaVentas); // Actualiza la lista de ventas
        })
        .catch(error => {
            setMsg(`Error: ${error.message}`);
            setSuccess(false);
            console.error('Error al guardar la venta:', error);
        });
};


// Eliminar una venta
const deleteVenta = (idVenta, setMsg, setSuccess, setListaVentas) => {
    fetch(`${API_URLVenta}/${idVenta}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.text();
        })
        .then(() => {
            setMsg("Venta eliminada con éxito");
            setSuccess(true);
            listaVentas(setListaVentas);
        })
        .catch(error => {
            setMsg(`Error: ${error.message}`);
            setSuccess(false);
            console.error('Error al eliminar la venta:', error);
        });
};




export default {
    listaUsuarios,
    getUsuario,
    createUsuario,
    deleteUsuario,
    listaVideojuegos,
    getVideojuego,
    createVideojuego,
    deleteVideojuego,
    listaUsuariosPremium, 
    getUsuarioPremium,    
    createUsuarioPremium, 
    deleteUsuarioPremium, 
    listaVentas,
    getVenta,
    createVenta,
    deleteVenta,
};
