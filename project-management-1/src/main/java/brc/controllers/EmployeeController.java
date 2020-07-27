package brc.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import brc.models.Employee;
import brc.models.Project;
import brc.service.impl.EmployeeService;
import brc.service.impl.ProjectService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private ProjectService projectService;
	@RequestMapping(value = "/employee/list", method = RequestMethod.GET)
	private ResponseEntity<List<Employee>> list() {
		List<Employee> list = this.employeeService.findAll();
		return new ResponseEntity<List<Employee>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/employee/new", method = RequestMethod.POST)
	private ResponseEntity<Employee> create(@RequestBody Employee employee) {
		this.employeeService.save(employee);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}

	@RequestMapping(value = "/employee/update", method = RequestMethod.PUT)
	private ResponseEntity<Employee> update(@RequestBody Employee employee) {
		Employee newEmployee = new Employee();
		newEmployee.setName(employee.getName());
		this.employeeService.save(newEmployee);
		return new ResponseEntity<Employee>(newEmployee, HttpStatus.OK);
	}

	// ----------------------Liên quan đến project------------------//
	@RequestMapping(value = "/employee/inProject/{id}", method = RequestMethod.GET)
	private ResponseEntity<List<Employee>> findInProject(@PathVariable Long id) {
		List<Employee> list = this.employeeService.followToProject(id);
		return new ResponseEntity<List<Employee>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/employee/outsideProject/{id}", method = RequestMethod.GET)
	private ResponseEntity<List<Employee>> findOutsideProject(@PathVariable Long id) {
		List<Employee> list = this.employeeService.findOutsideProject(id);
		return new ResponseEntity<List<Employee>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/employee/moveEmployee/{project}/{employee}", method = RequestMethod.DELETE)
	private ResponseEntity<Object> moveEmployeeFromProject(@PathVariable("project") Long project_id,
			@PathVariable("employee") Long employee_id) {
		this.employeeService.removeEmployeeFromProject(project_id, employee_id);
		Project project = this.projectService.findById(project_id);
		project.setNumberOfMember(this.count(project_id));
		this.projectService.save(project);
		System.out.println(project.getNumberOfMember());
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

	@RequestMapping(value = "/employee/addEmployee/{project}/{role}", method = RequestMethod.POST)
	private ResponseEntity<List<Employee>> addEmployeeIntoProject(@PathVariable("project") Long project_id,
			@RequestBody Employee[] list_employee, @PathVariable("role") Long role_id) {
		List<Employee> employees = new ArrayList<Employee>();
		for (Employee employee : list_employee) {
			this.employeeService.addEmployeeIntoProject(project_id, employee.getId(), role_id);
			Employee entity = this.employeeService.findByEntity(employee.getId());
			employees.add(entity);
		}
		Project project = this.projectService.findById(project_id);
		project.setNumberOfMember(this.count(project_id));
		this.projectService.save(project);
		System.out.println(project.getNumberOfMember());
		return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
	}

	@RequestMapping(value = "/employee/addListEmployee/{project}", method = RequestMethod.POST)
	private ResponseEntity<List<Employee>> addListEmployeeIntoProject(@PathVariable("project") Long project_id,
			@RequestBody Employee[] list_employee) {
		List<Employee> employees = new ArrayList<Employee>();
		for (Employee employee : list_employee) {
			this.employeeService.addEmployeeIntoProject(project_id, employee.getId(), employee.getPreventive_role());
			Employee entity = this.employeeService.findByEntity(employee.getId());
			employees.add(entity);
		}
		return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
	}
	public String count(long id) {
		String count = this.projectService.count(id);
		return count;
	}
	// -------------------------------------------------------------//
	
}
