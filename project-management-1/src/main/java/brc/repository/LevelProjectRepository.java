package brc.repository;


import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import brc.models.LevelProject;

@Repository
public interface LevelProjectRepository extends PagingAndSortingRepository<LevelProject, Long> {
	
	@Override
	@Modifying
	@Query("UPDATE LevelProject l SET l.isDelete=1 WHERE l.id=:id")
	void deleteById(@Param("id") Long id);
	
	
	@Query("SELECT l FROM LevelProject l WHERE l.isDelete=0")
	List<LevelProject> findAll();
	
	@Query("SELECT l FROM LevelProject l WHERE l.isDelete=0 AND l.name=:name")
	LevelProject findByName(@Param("name") String name);
	
	@Query("SELECT l FROM LevelProject l WHERE l.isDelete=0 AND l.id=:id")
	LevelProject findEntity(@Param("id") Long id);
}
