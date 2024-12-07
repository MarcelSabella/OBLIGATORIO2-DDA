package obligatorio2.example.obligatorio2dda.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import obligatorio2.example.obligatorio2dda.Entity.Videojuego;

@Repository
public interface VideojuegoRepository extends JpaRepository<Videojuego, Integer>{
  // Método personalizado para obtener videojuegos con stock menor al valor dado
  List<Videojuego> findByCantidadCopiasLessThan(int cantidad);
}
