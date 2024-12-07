package obligatorio2.example.obligatorio2dda.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import obligatorio2.example.obligatorio2dda.Entity.Venta;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Integer>{
  List<Venta> findByFechaVenta(LocalDate fechaVenta);
}
