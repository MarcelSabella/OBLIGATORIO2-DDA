package obligatorio2.example.obligatorio2dda.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import obligatorio2.example.obligatorio2dda.Entity.Usuario;
import obligatorio2.example.obligatorio2dda.Entity.UsuarioPremium;
import obligatorio2.example.obligatorio2dda.Entity.Venta;
import obligatorio2.example.obligatorio2dda.Entity.Videojuego;
import obligatorio2.example.obligatorio2dda.Repository.UsuarioRepository;
import obligatorio2.example.obligatorio2dda.Repository.VentaRepository;
import obligatorio2.example.obligatorio2dda.Repository.VideojuegoRepository;
import obligatorio2.example.obligatorio2dda.Service.VideojuegoService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ventas")
@CrossOrigin(origins = "http://localhost:3000")
public class VentaController {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private VideojuegoRepository videojuegoRepository;

    @Autowired
    private VideojuegoService videojuegoService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Crear una nueva venta
    @PostMapping
    public ResponseEntity<?> add(@RequestBody Venta venta) {
        Double total = 0.0;

        // Validamos que las listas de videojuegos y cantidades tengan el mismo tamaño
        if (venta.getVideojuegos().size() != venta.getCantidades().size()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: La cantidad de videojuegos y cantidades no coincide.");
        }

        List<Videojuego> videojuegosCompletos = new ArrayList<>();

        for (int i = 0; i < venta.getVideojuegos().size(); i++) {
            Videojuego videojuego = venta.getVideojuegos().get(i);
            Optional<Videojuego> videojuegoOpt = videojuegoRepository.findById(videojuego.getId());

            if (videojuegoOpt.isPresent()) {
                Videojuego videojuegoCompleto = videojuegoOpt.get();
                int cantidad = venta.getCantidades().get(i);

                // Calculamos el subtotal
                total += videojuegoCompleto.getPrecio() * cantidad;

                // Reducimos el stock del videojuego
                videojuegoService.reducirStock(videojuego.getId(), cantidad);

                videojuegosCompletos.add(videojuegoCompleto);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error: Videojuego con ID " + videojuego.getId() + " no encontrado.");
            }
        }

        // Verificamos si el usuario es de tipo UsuarioPremium para aplicar el descuento
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(venta.getUsuario().getId());
        if (usuarioOpt.isPresent() && usuarioOpt.get() instanceof UsuarioPremium) {
         UsuarioPremium usuarioPremium = (UsuarioPremium) usuarioOpt.get();
         if (usuarioPremium.esPremiumActivo()) {
        total *= 0.8; // Aplicar 20% de descuento
        }
        }else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Error: Usuario no encontrado o no es válido.");
        }

        // Asignamos los videojuegos completos y el total a la venta
        venta.setVideojuegos(videojuegosCompletos);
        venta.setTotal(total);

        // Guardamos la venta en el repositorio
        ventaRepository.save(venta);

        return ResponseEntity.status(HttpStatus.OK).body("Venta registrada con éxito.");
    }

    // Eliminar una venta por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        Optional<Venta> venta = ventaRepository.findById(id);
        if (venta.isPresent()) {
            ventaRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Venta eliminada con éxito.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Venta no encontrada.");
        }
    }

    // Actualizar una venta
    @PutMapping
    public ResponseEntity<?> update(@RequestBody Venta venta) {
        if (ventaRepository.existsById(venta.getId())) {
            Double total = 0.0;

            for (int i = 0; i < venta.getVideojuegos().size(); i++) {
                total += venta.getVideojuegos().get(i).getPrecio() * venta.getCantidades().get(i);
            }

            // Verificar si el usuario es UsuarioPremium para aplicar descuento
           if (venta.getUsuario() instanceof UsuarioPremium) {
                total *= 0.8; // Aplicar descuento del 20%
            }

            venta.setTotal(total);
            return ResponseEntity.status(HttpStatus.OK).body(ventaRepository.save(venta));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Venta no encontrada.");
        }
    }

    // Obtener una venta por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(ventaRepository.findById(id));
    }

    // Listar todas las ventas
    @GetMapping
    public ResponseEntity<?> list() {
        return ResponseEntity.status(HttpStatus.OK).body(ventaRepository.findAll());
    }

    @GetMapping("/filtrarPorFecha")
    public ResponseEntity<?> filtrarPorFecha(@RequestParam String fecha) {
        try {
            LocalDate fechaVenta = LocalDate.parse(fecha);
            List<Venta> ventas = ventaRepository.findByFechaVenta(fechaVenta);
            if (ventas.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No se encontraron ventas para la fecha especificada.");
            }
            return ResponseEntity.status(HttpStatus.OK).body(ventas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Formato de fecha inválido. Use 'YYYY-MM-DD'.");
        }
    }
    
}
