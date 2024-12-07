package obligatorio2.example.obligatorio2dda.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import obligatorio2.example.obligatorio2dda.Entity.UsuarioPremium;
import obligatorio2.example.obligatorio2dda.Repository.UsuarioPremiumRepository;

import java.util.Optional;

@RestController
@RequestMapping("/usuariosPremium")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioPremiumController {

    @Autowired
    private UsuarioPremiumRepository usuarioPremiumRepository;

    // Crear un usuario premium
    @PostMapping
    public ResponseEntity<?> add(@RequestBody UsuarioPremium usuarioPremium) {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioPremiumRepository.save(usuarioPremium));
    }

    // Eliminar un usuario premium por id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        Optional<UsuarioPremium> usuario = usuarioPremiumRepository.findById(id);
        if (usuario.isPresent()) {
            usuarioPremiumRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Usuario Premium eliminado con éxito.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario Premium no encontrado.");
        }
    }

    // Actualizar un usuario premium
    @PutMapping
    public ResponseEntity<?> update(@RequestBody UsuarioPremium usuarioPremium) {
        if (usuarioPremiumRepository.existsById(usuarioPremium.getId())) {
            return ResponseEntity.status(HttpStatus.OK).body(usuarioPremiumRepository.save(usuarioPremium));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario Premium no encontrado.");
        }
    }

    // Obtener un usuario premium por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioPremiumRepository.findById(id));
    }

    // Listar todos los usuarios premium
    @GetMapping
    public ResponseEntity<?> list() {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioPremiumRepository.findAll());
    }

    // Verificar si un usuario premium es activo
    @GetMapping("/{id}/esActivo")
    public ResponseEntity<?> esActivo(@PathVariable int id) {
        Optional<UsuarioPremium> usuario = usuarioPremiumRepository.findById(id);
        if (usuario.isPresent()) {
            boolean esActivo = usuario.get().esPremiumActivo();
            return ResponseEntity.status(HttpStatus.OK).body("Usuario Premium activo: " + esActivo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario Premium no encontrado.");
        }
    }
}


