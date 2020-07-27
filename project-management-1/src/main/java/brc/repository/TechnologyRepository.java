package brc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import brc.models.Technology;

@Repository
public interface TechnologyRepository  extends JpaRepository<Technology, Long>{
	
	@Override
	@Modifying
	@Query("UPDATE Technology t SET t.isDelete=1 WHERE t.id=:id")
	void deleteById(@Param("id") Long id);
	
	
	@Query("SELECT t FROM Technology t WHERE t.isDelete=0")
	List<Technology> findAll();
	
	
	
	@Query("SELECT t FROM Technology t WHERE t.isDelete=0 AND t.id=:id")
	Technology findEntity(@Param("id") Long id);
}
