package brc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import brc.models.ClassificationProject;
import brc.models.Classification;
@Repository
public interface ClassficationRepository extends JpaRepository<Classification, Long> {
	@Override
	@Modifying
	@Query("UPDATE Classification c SET c.isDelete=1 WHERE c.id=:id")
	void deleteById(@Param("id") Long id);
	
	
	@Query("SELECT c FROM Classification c WHERE c.isDelete=0")
	List<Classification> findAll();
	
	@Query("SELECT c FROM Classification c WHERE c.isDelete=0 AND c.name=:name")
	ClassificationProject findByName(@Param("name") String name);
	
	@Query("SELECT c FROM Classification c WHERE c.isDelete=0 AND c.id=:id")
	Classification findEntity(@Param("id") Long id);
}
