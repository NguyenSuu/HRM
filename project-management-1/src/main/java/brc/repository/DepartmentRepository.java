package brc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import brc.models.Department;
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
	@Override
	@Modifying
	@Query("UPDATE Department d SET d.isDelete=1 WHERE d.id=:id")
	void deleteById(@Param("id") Long id);
	
	@Query("SELECT d FROM Department d WHERE d.isDelete=0")
	List<Department> findAll();
	
	@Query("SELECT d FROM Department d WHERE d.isDelete=0 AND d.id=:id")
	Department findEntity(@Param("id") Long id);
	
	
}
