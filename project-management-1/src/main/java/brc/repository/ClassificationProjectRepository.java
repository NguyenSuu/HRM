package brc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import brc.models.ClassificationProject;

@Repository
public interface ClassificationProjectRepository extends JpaRepository<ClassificationProject, Long>{
	@Override
	@Modifying
	@Query("UPDATE ClassificationProject c SET c.isDelete=1 WHERE c.id=:id")
	void deleteById(@Param("id") Long id);
	
	
	@Query("SELECT c FROM ClassificationProject c WHERE c.isDelete=0")
	List<ClassificationProject> findAll();
	
	@Query("SELECT c FROM ClassificationProject c WHERE c.isDelete=0 AND c.name=:name")
	ClassificationProject findByName(@Param("name") String name);
	
	@Query("SELECT c FROM ClassificationProject c WHERE c.isDelete=0 AND c.id=:id")
	ClassificationProject findEntity(@Param("id") Long id);
}
