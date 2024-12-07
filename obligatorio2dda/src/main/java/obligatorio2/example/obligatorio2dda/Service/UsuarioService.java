package obligatorio2.example.obligatorio2dda.Service;

import java.util.List;

import obligatorio2.example.obligatorio2dda.Entity.Usuario;

public interface UsuarioService {
   
    public Usuario agregar(Usuario u);
    public boolean eliminar(int id);
    public Usuario modificar(Usuario u);
    public Usuario conseguir(int id);
    public List<Usuario> conseguir();
    
}

