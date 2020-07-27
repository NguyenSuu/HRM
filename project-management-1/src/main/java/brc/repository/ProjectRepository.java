package brc.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import brc.models.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> ,JpaSpecificationExecutor<Project> {

	@Override
	@Modifying
	@Query("UPDATE Project p SET p.isDelete=1 WHERE p.id=:id")
	void deleteById(@Param("id") Long id);

	@Query(value="select * from project.project where is_delete=false",nativeQuery = true)
	//@Query("SELECT p FROM Project p WHERE p.isDelete=0")
	List<Project> findAllAsArray();

	@Query("SELECT p FROM Project p WHERE p.isDelete=0 AND p.name=:name")
	Project findByName(@Param("name") String name);
	
	@Query("SELECT p FROM Project p WHERE p.isDelete=0 AND p.id=:id")
	Project findEntity(@Param("id") Long id);
	
	@Query(value="select count(employee_id) as count from project.employee_projects where project_id = ? and is_out=false",nativeQuery = true)
	String count(@Param("id") Long id);
	
	
	
}
