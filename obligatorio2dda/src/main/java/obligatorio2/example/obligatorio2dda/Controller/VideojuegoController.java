package obligatorio2.example.obligatorio2dda.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import obligatorio2.example.obligatorio2dda.Entity.Videojuego;
import obligatorio2.example.obligatorio2dda.Repository.VideojuegoRepository;
import obligatorio2.example.obligatorio2dda.Service.VideojuegoService;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/videojuegos")
@CrossOrigin(origins = "http://localhost:3000")
public class VideojuegoController {

    @Autowired
    private VideojuegoRepository videojuegoRepository;

    @Autowired
    private VideojuegoService videojuegoService;

    
    

    // Crear un videojuego
    @PostMapping
    public ResponseEntity<?> add(@RequestBody Videojuego videojuego) {
        return ResponseEntity.status(HttpStatus.OK).body(videojuegoRepository.save(videojuego));
    }

    // Eliminar un videojuego por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        Optional<Videojuego> videojuego = videojuegoRepository.findById(id);
        if (videojuego.isPresent()) {
            videojuegoRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Videojuego eliminado con éxito.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Videojuego no encontrado.");
        }
    }

    // Actualizar un videojuego
    @PutMapping
    public ResponseEntity<?> update(@RequestBody Videojuego videojuego) {
        if (videojuegoRepository.existsById(videojuego.getId())) {
            return ResponseEntity.status(HttpStatus.OK).body(videojuegoRepository.save(videojuego));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Videojuego no encontrado.");
        }
    }

    
    
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
    // Obtener un videojuego por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(videojuegoRepository.findById(id));
    }    

    // Listar todos los videojuegos
    @GetMapping
    public ResponseEntity<?> list() {
        return ResponseEntity.status(HttpStatus.OK).body(videojuegoRepository.findAll());
    }

   @GetMapping("/stockbajo/{cantidad}")
    public ResponseEntity<List<Videojuego>> getVideojuegosPorStockBajo(@PathVariable int cantidad) {
        List<Videojuego> videojuegos = videojuegoService.getVideojuegosPorStockBajo(cantidad);
        if (videojuegos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(videojuegos);
    }

    
    
}
