package brc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import brc.models.Employee;
import brc.repository.EmployeeRepository;
import brc.service.IService;

@Service
public class EmployeeService implements IService<Employee>{
	@Autowired
	private EmployeeRepository employeeRos;
	@Override
	public List<Employee> findAll() {
		
		return this.employeeRos.findAll();
	}
	public Employee findByEntity(Long id) {
		return this.employeeRos.findEntity(id);
	}
	@Override
	public Employee save(Employee t) {
		
		return this.employeeRos.save(t);
	}

	@Override
	public void remove(Long id) {
		// TODO Auto-generated method stub
		
	}
	//------------Liên quan đến project----------------//
	
	public List<Employee> followToProject(Long id) {
		return this.employeeRos.followToProject(id);
		
	}
	public List<Employee> findOutsideProject(Long id) {
		return this.employeeRos.findOutsideProject(id);
		
	}
	public void removeEmployeeFromProject(Long project_id,Long employee_id) {
		this.employeeRos.moveEmployeeFromProject(project_id, employee_id);
		
	}
	public void addEmployeeIntoProject(Long project_id,Long employee_id,Long role_id) {
		this.employeeRos.addEmployeeIntoProject(project_id, employee_id,role_id);
		
	}
	//------------------------------------------------//
}
