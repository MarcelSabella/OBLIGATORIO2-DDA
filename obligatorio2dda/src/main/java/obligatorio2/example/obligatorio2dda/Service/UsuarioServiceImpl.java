package obligatorio2.example.obligatorio2dda.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import obligatorio2.example.obligatorio2dda.Entity.Usuario;
import obligatorio2.example.obligatorio2dda.Repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService{
    
    @Autowired
    UsuarioRepository usuarioRepository;

    public Usuario agregar(Usuario u){
        return usuarioRepository.save(u);
    }

    public boolean eliminar(int id){
        if(usuarioRepository.findById(id).isPresent()){
            usuarioRepository.deleteById(id);
            return true;
        }
        else{
            return false;
        }
    }

    public Usuario modificar(Usuario u){
        if(usuarioRepository.findById(u.getId()).isPresent()){
            return usuarioRepository.save(u);
        }
        else{
            return null;
        }
    }

    public Usuario conseguir(int id){
        Optional<Usuario> u = usuarioRepository.findById(id);

        if(u.isPresent()){
            return u.get();
        }
        else{
            return null;
        }
    }


    public List<Usuario> conseguir(){
        return usuarioRepository.findAll();
    }
}

