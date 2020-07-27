package brc.controllers;

import java.time.LocalDate;
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

import brc.models.Department;
import brc.service.impl.DepartmentService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DepartmentController {
	
	@Autowired
	private DepartmentService departmentService;
	
	@RequestMapping(value = "/department/list", method = RequestMethod.GET)
	private ResponseEntity<List<Department>> list() {

		List<Department> list= this.departmentService.findAll();

		return new ResponseEntity<List<Department>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/department/new", method = RequestMethod.POST)
	private ResponseEntity<Department> create(@RequestBody Department department) {
		department.setCreateAt(LocalDate.now());
		department.setIsDelete(false);
		
		this.departmentService.save(department);
		return new ResponseEntity<Department>(department, HttpStatus.OK);
	}

	@RequestMapping(value = "/department/update", method = RequestMethod.PUT)
	private ResponseEntity<Department> update(@RequestBody Department department) {

		Department newDepartment = new Department();
		newDepartment.setName(department.getName());
		newDepartment.setCreateAt(LocalDate.now());
		newDepartment.setIsDelete(false);
		this.departmentService.save(newDepartment);
		this.departmentService.remove(department.getId());
		return new ResponseEntity<Department>(newDepartment, HttpStatus.OK);
	}

	@RequestMapping(value = "/department/isDelete/{id}", method = RequestMethod.POST)
	private ResponseEntity<Object> isDelete(@PathVariable("id") Long id) {
		Department department = this.departmentService.findById(id);
		department.setUpdateAt(LocalDate.now());
		this.departmentService.remove(id);
		return new ResponseEntity<Object>(HttpStatus.ACCEPTED);
	}

}
