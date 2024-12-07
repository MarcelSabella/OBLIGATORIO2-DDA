package obligatorio2.example.obligatorio2dda.Service;

import obligatorio2.example.obligatorio2dda.Entity.Videojuego;

import java.util.List;

public interface VideojuegoService {

    public Videojuego agregar(Videojuego videojuego);
    public boolean eliminar(int id);
    public Videojuego modificar(Videojuego videojuego);
    public Videojuego conseguir(int id);
    public List<Videojuego> conseguir();
    void reducirStock(int videojuegoId, int cantidad) throws IllegalArgumentException;
    List<Videojuego> getVideojuegosPorStockBajo(int cantidad);
}

