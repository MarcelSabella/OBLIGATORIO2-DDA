package obligatorio2.example.obligatorio2dda.Entity;


import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;

@Entity
public class UsuarioPremium extends Usuario {
    private LocalDate fechaMembresia; // Fecha de adquisición de la membresía premium
    private boolean accesoDescuentosExclusivos; // Indicador de acceso a descuentos exclusivos

    // Constructor vacío
    public UsuarioPremium() {
        super(); // Llama al constructor vacío de la clase base
    }

    // Constructor con parámetros, incluyendo historial de compras
    public UsuarioPremium(int id, String nombre, String correoElectronico, LocalDate fechaRegistro,
                          List<Venta> historialCompras, LocalDate fechaMembresia,
                          boolean accesoDescuentosExclusivos) {
        super(id, nombre, correoElectronico, fechaRegistro, historialCompras); // Inicializa los atributos heredados
        this.setHistorialCompras(historialCompras); // Inicializa el historial de compras
        this.fechaMembresia = fechaMembresia;
        this.accesoDescuentosExclusivos = accesoDescuentosExclusivos;
    }

    // Getters y Setters
    public LocalDate getFechaMembresia() {
        return fechaMembresia;
    }

    public void setFechaMembresia(LocalDate fechaMembresia) {
        this.fechaMembresia= fechaMembresia;
    }

    public boolean isAccesoDescuentosExclusivos() {
        return accesoDescuentosExclusivos;
    }

    public void setAccesoDescuentosExclusivos(boolean accesoDescuentosExclusivos) {
        this.accesoDescuentosExclusivos = accesoDescuentosExclusivos;
    }

    // Método para calcular si el usuario sigue siendo premium
    public boolean esPremiumActivo() {
        return this.fechaMembresia != null && this.fechaMembresia.isAfter(LocalDate.now().minusYears(1));
    }

   
}

