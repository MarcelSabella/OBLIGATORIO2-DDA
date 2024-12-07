package obligatorio2.example.obligatorio2dda.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import obligatorio2.example.obligatorio2dda.Entity.Usuario;
import obligatorio2.example.obligatorio2dda.Entity.UsuarioPremium;
import obligatorio2.example.obligatorio2dda.Repository.UsuarioPremiumRepository;

@Service
public class UsuarioServicePremiumImpl implements UsuarioPremiumService{
    
    @Autowired
    UsuarioPremiumRepository usuarioPremiumRepository;

   
    public UsuarioPremium agregar(UsuarioPremium up){
        return usuarioPremiumRepository.save(up);
    }

    public boolean eliminar(int id){
        if(usuarioPremiumRepository.findById(id).isPresent()){
            usuarioPremiumRepository.deleteById(id);
            return true;
        }
        else{
            return false;
        }
    }

    public UsuarioPremium modificar(UsuarioPremium up){
        if(usuarioPremiumRepository.findById(up.getId()).isPresent()){
            return usuarioPremiumRepository.save(up);
        }
        else{
            return null;
        }
    }

    public UsuarioPremium conseguir(int id){
        Optional<UsuarioPremium> u = usuarioPremiumRepository.findById(id);

        if(u.isPresent()){
            return u.get();
        }
        else{
            return null;
        }
    }


    public List<UsuarioPremium> conseguir(){
        return usuarioPremiumRepository.findAll();
    }

    @Override
    public UsuarioPremium agregar(Usuario u) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'agregar'");
    }

    @Override
    public UsuarioPremium modificar(Usuario u) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'modificar'");
    }
}

