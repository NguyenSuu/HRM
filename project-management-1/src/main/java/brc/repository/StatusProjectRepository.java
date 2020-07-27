package brc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import brc.models.StatusProject;

@Repository
public interface StatusProjectRepository extends PagingAndSortingRepository<StatusProject, Long>{
	
	@Override
	@Modifying
	@Query("UPDATE StatusProject s SET s.isDelete=1 WHERE s.id=:id")
	void deleteById(@Param("id") Long id);
	
	
	@Query("SELECT s FROM StatusProject s WHERE s.isDelete=0")
	List<StatusProject> findAll();
	
	@Query("SELECT s FROM StatusProject s WHERE s.isDelete=0 AND s.name=:name")
	StatusProject findByName(@Param("name") String name);
	
	
	@Query("SELECT s FROM StatusProject s WHERE s.isDelete=0 AND s.id=:id")
	StatusProject findEntity(@Param("id") Long id);
}
