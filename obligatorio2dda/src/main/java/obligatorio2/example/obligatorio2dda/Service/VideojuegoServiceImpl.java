package obligatorio2.example.obligatorio2dda.Service;

import obligatorio2.example.obligatorio2dda.Entity.Videojuego;
import obligatorio2.example.obligatorio2dda.Repository.VideojuegoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideojuegoServiceImpl implements VideojuegoService {

    @Autowired
    private VideojuegoRepository videojuegoRepository;

    @Override
    public Videojuego agregar(Videojuego videojuego) {
        return videojuegoRepository.save(videojuego);
    }

    @Override
    public boolean eliminar(int id) {
        if (videojuegoRepository.existsById(id)) {
            videojuegoRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Videojuego modificar(Videojuego videojuego) {
        if (videojuegoRepository.existsById(videojuego.getId())) {
            return videojuegoRepository.save(videojuego);
        } else {
            return null;
        }
    }

    @Override
    public Videojuego conseguir(int id) {
        Optional<Videojuego> videojuego = videojuegoRepository.findById(id);
        return videojuego.orElse(null);
    }

    @Override
    public List<Videojuego> conseguir() {
        return videojuegoRepository.findAll();
    }

    @Override
    public void reducirStock(int videojuegoId, int cantidad) throws IllegalArgumentException {
        Videojuego videojuego = videojuegoRepository.findById(videojuegoId)
            .orElseThrow(() -> new IllegalArgumentException("Videojuego no encontrado"));

        videojuego.reducirStock(cantidad);
        videojuegoRepository.save(videojuego); // Guardar el videojuego actualizado con el stock reducido
    }

    @Override
    public List<Videojuego> getVideojuegosPorStockBajo(int cantidad) {
        return videojuegoRepository.findByCantidadCopiasLessThan(cantidad);
    }


}
