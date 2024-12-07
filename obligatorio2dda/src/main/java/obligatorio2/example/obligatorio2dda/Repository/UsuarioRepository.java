package obligatorio2.example.obligatorio2dda.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import obligatorio2.example.obligatorio2dda.Entity.Usuario;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    List<Usuario> findAllByIdNotIn(List<Integer> idsPremium);
}
