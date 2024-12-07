package obligatorio2.example.obligatorio2dda.Service;

import obligatorio2.example.obligatorio2dda.Entity.Venta;

import java.util.List;

public interface VentaService {

    public Venta agregar(Venta venta);
    public boolean eliminar(int id);
    public Venta modificar(Venta venta);
    public Venta conseguir(int id);
    public List<Venta> conseguir();
    
}
