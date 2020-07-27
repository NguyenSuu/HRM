package brc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import brc.models.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{
	@Override
	@Modifying
	@Query("UPDATE Employee e SET e.isDelete=1 WHERE e.id=:id")
	void deleteById(@Param("id") Long id);

	@Query("SELECT e FROM Employee e WHERE e.isDelete=0")
	List<Object> findAllAsArray();

	@Query("SELECT e FROM Employee e WHERE e.isDelete=0 AND e.name=:name")
	Employee findByName(@Param("name") String name);
	
	@Query(value="SELECT * FROM employee e WHERE e.is_delete= false AND e.id= ?",nativeQuery = true)
	Employee findEntity(@Param("id") Long id);
	
//	@Query(value="SELECT * FROM project.employee_projects ep INNER JOIN project.employee e ON ep.employee_id = e.id WHERE ep.project_id= ? AND ep.is_out = false;",nativeQuery = true)
	@Query(value="select * from project.employee where employee.id in (select employee_id from project.employee_projects where project_id =? and is_out = false);",nativeQuery = true)
	List<Employee> followToProject(@Param("id") Long id);
	
	@Query(value="select * from project.employee where employee.id not in (select employee_id from project.employee_projects where project_id =? and is_out = false);",nativeQuery = true)
	List<Employee> findOutsideProject(@Param("id") Long id);

	
	@Modifying
	@Transactional
	@Query(value="UPDATE project.employee_projects SET is_out = true WHERE project_id = ? and employee_id = ?",nativeQuery = true)
	void moveEmployeeFromProject(@Param("project")Long project_id,@Param("employee")Long employee_id);
	
	@Modifying
	@Transactional
	@Query(value="INSERT INTO project.employee_projects (is_out, project_id, id_project, id_employee, employee_id, role_id) VALUES (b'0',?1, ?1,?2, ?2, ?3);",nativeQuery = true)
	void addEmployeeIntoProject(@Param("project")Long project_id,@Param("employee")Long employee_id,@Param("role")Long role_id);

}
