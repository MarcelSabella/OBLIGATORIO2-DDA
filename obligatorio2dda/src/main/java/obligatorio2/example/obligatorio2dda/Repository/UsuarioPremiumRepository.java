package obligatorio2.example.obligatorio2dda.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import obligatorio2.example.obligatorio2dda.Entity.UsuarioPremium;

    @Repository
    public interface UsuarioPremiumRepository extends JpaRepository<UsuarioPremium, Integer>{
}
