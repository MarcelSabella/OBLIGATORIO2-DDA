package obligatorio2.example.obligatorio2dda.Service;

import obligatorio2.example.obligatorio2dda.Entity.Venta;
import obligatorio2.example.obligatorio2dda.Repository.VentaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class VentaServiceImpl implements VentaService {

    @Autowired
    VentaRepository ventaRepository;

    @Override
    public Venta agregar(Venta venta) {
        // Calcular el total de la venta antes de guardarla
        double total = 0.0;
        for (int i = 0; i < venta.getVideojuegos().size(); i++) {
            total += venta.getVideojuegos().get(i).getPrecio() * venta.getCantidades().get(i);
        }
        venta.setTotal(total);

        return ventaRepository.save(venta);
    }

    @Override
    public boolean eliminar(int id) {
        if (ventaRepository.findById(id).isPresent()) {
            ventaRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Venta modificar(Venta venta) {
        if (ventaRepository.existsById(venta.getId())) {
            // Recalcular el total al modificar la venta
            double total = 0.0;
            for (int i = 0; i < venta.getVideojuegos().size(); i++) {
                total += venta.getVideojuegos().get(i).getPrecio() * venta.getCantidades().get(i);
            }
            venta.setTotal(total);

            return ventaRepository.save(venta);
        } else {
            return null;
        }
    }

    @Override
    public Venta conseguir(int id) {
        Optional<Venta> venta = ventaRepository.findById(id);
        return venta.orElse(null);
    }

    @Override
    public List<Venta> conseguir() {
        return ventaRepository.findAll();
    }

  
}

