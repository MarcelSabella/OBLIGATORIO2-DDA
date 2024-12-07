package obligatorio2.example.obligatorio2dda.Service;

import java.util.List;

import obligatorio2.example.obligatorio2dda.Entity.Usuario;
import obligatorio2.example.obligatorio2dda.Entity.UsuarioPremium;

public interface UsuarioPremiumService {

    public UsuarioPremium agregar(Usuario u);
    public boolean eliminar(int id);
    public UsuarioPremium modificar(Usuario u);
    public UsuarioPremium conseguir(int id);
    public List<UsuarioPremium> conseguir();
    
}
