package brc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import brc.models.ERole;
import brc.models.Roles;

@Repository
public interface RoleUserRepository extends JpaRepository<Roles, Long> {
//	@Query("SELECT r FROM Roles r WHERE r.name=:name")
	Roles findByName(ERole name);
}
