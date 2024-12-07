package obligatorio2.example.obligatorio2dda.Controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import obligatorio2.example.obligatorio2dda.Entity.Usuario;
import obligatorio2.example.obligatorio2dda.Entity.UsuarioPremium;
import obligatorio2.example.obligatorio2dda.Repository.UsuarioPremiumRepository;
import obligatorio2.example.obligatorio2dda.Repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioPremiumRepository usuarioPremiumRepository;

    @PostMapping
    public ResponseEntity<?> add(@RequestBody Usuario usuario) {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.save(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        usuarioRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Eliminado");
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody Usuario usuario) {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.save(usuario));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.findById(id));
    }

    @GetMapping
    public ResponseEntity<?> list() {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.findAll());
    }

    // Endpoint para filtrar usuarios por tipo
    @GetMapping("/filtrar")
    public ResponseEntity<?> filtrarPorTipo(@RequestParam(required = false) String tipo) {
        if ("premium".equalsIgnoreCase(tipo)) {
            List<UsuarioPremium> usuariosPremium = usuarioPremiumRepository.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(usuariosPremium);
        } else if ("regular".equalsIgnoreCase(tipo)) {
            List<Usuario> usuariosRegulares = usuarioRepository.findAllByIdNotIn(
                usuarioPremiumRepository.findAll().stream().map(Usuario::getId).toList()
            );
            return ResponseEntity.status(HttpStatus.OK).body(usuariosRegulares);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de usuario no válido. Use 'premium' o 'regular'.");
        }
    }

    // Listar compras realizadas por un usuario específico
    @GetMapping("/{id}/ventas")
    public ResponseEntity<?> listarVentasPorUsuario(@PathVariable int id) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            return ResponseEntity.status(HttpStatus.OK).body(usuario.getHistorialCompras());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }
    

}
