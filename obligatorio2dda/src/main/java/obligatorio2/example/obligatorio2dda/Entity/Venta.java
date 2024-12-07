package obligatorio2.example.obligatorio2dda.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;



@Entity 
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id; // ID único de la venta

    @ManyToOne
    private Usuario usuario; // Usuario que realizó la compra

    private LocalDate fechaVenta; // Fecha de la venta

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Videojuego> videojuegos; // Lista de videojuegos vendidos

    private List<Integer> cantidades; // Cantidades de cada videojuego vendido
    
    private Double total; // Total de la venta

    // Constructor vacío
    public Venta() {
        this.videojuegos = new ArrayList<>();
        this.cantidades = new ArrayList<>();
    }

    // Constructor con parámetros
    public Venta(int id, Usuario usuario, LocalDate fechaVenta) {
        this.id = id;
        this.usuario = usuario;
        this.fechaVenta = fechaVenta;
        this.videojuegos = new ArrayList<>();
        this.cantidades = new ArrayList<>();
        this.total = 0.0;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LocalDate getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(LocalDate fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public List<Videojuego> getVideojuegos() {
        return videojuegos;
    }

    public void setVideojuegos(List<Videojuego> videojuegos) {
        this.videojuegos = videojuegos;
    }

    public List<Integer> getCantidades() {
        return cantidades;
    }

    public void setCantidades(List<Integer> cantidades) {
        this.cantidades = cantidades;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    // Método para agregar un videojuego y la cantidad a la venta
    public void agregarVideojuego(Videojuego videojuego, int cantidad) {
        this.videojuegos.add(videojuego);
        this.cantidades.add(cantidad);

        // Calcular subtotal y agregar al total
        double subtotal = videojuego.getPrecio() * cantidad;
        this.total += subtotal;

    }

   
}

