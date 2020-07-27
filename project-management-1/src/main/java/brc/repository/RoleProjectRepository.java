package brc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import brc.models.RoleProject;


@Repository
public interface RoleProjectRepository extends JpaRepository<RoleProject, Long> {
	@Query("SELECT r FROM RoleProject r WHERE r.id=:id")
	RoleProject findEntity(@Param("id") Long id);
}
