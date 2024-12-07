package obligatorio2.example.obligatorio2dda.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Videojuego {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String nombre;

    private String descripcion;

    private Double precio; 

    @Column(columnDefinition = "LONGTEXT")
    private String imagen;

    private int cantidadCopias;

    private String categoria;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public int getCantidadCopias() {
        return cantidadCopias;
    }

    public void setCantidadCopias(int cantidadCopias) {
        this.cantidadCopias = cantidadCopias;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Videojuego(int id, String nombre, String descripcion, double precio, String imagen, int cantidadCopias,
            String categoria) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidadCopias = cantidadCopias;
        this.categoria = categoria;
    }

    public Videojuego(){}

    
     // Método para reducir el stock
     public void reducirStock(int cantidad) {
        if (this.cantidadCopias >= cantidad) {
            this.cantidadCopias -= cantidad;
        } else {
            throw new IllegalArgumentException("Stock insuficiente para el videojuego: " + this.nombre);
        }
    }
    
}
