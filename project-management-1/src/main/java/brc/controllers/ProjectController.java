package brc.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import brc.models.Project;
import brc.repository.specification.ProjectSpecification;
import brc.service.impl.ProjectService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@PreAuthorize("hasRole('MODERATOR')")
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	
//	@PreAuthorize("hasRole('MODERATOR')")
	@RequestMapping(value = "/project/list", method = RequestMethod.GET)
	private ResponseEntity<List<Project>> list() {
		List<Project> listProject = this.projectService.findAllAsArray();
		System.out.println(listProject);
		return new ResponseEntity<List<Project>>(listProject, HttpStatus.OK);
	}

	@RequestMapping(value = "/project/new", method = RequestMethod.POST)
	private ResponseEntity<Project> create(@RequestBody Project project) {
		
		this.projectService.save(project);
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}

	@RequestMapping(value = "/project/search", method = RequestMethod.POST)
	private ResponseEntity<List<Project>> search(@RequestBody Project project) {
		Specification<Project> pSpecification = new ProjectSpecification(project);
		List<Project> list = projectService.findAll(pSpecification);
		return new ResponseEntity<List<Project>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/project/find/{id}", method = RequestMethod.GET)
	private ResponseEntity<Project> findById(@PathVariable Long id) {
		Project project = projectService.findById(id);
		project.setNumberOfMember(count(id));
		System.out.println(project.getNumberOfMember());
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/project/update", method = RequestMethod.PUT)
	private ResponseEntity<Project> update(@RequestBody Project project) {
//		if (this.test(project.getName())) {
//			return new ResponseEntity<Project>(HttpStatus.BAD_REQUEST);
//		}
//		Project newProject = project;
//		newProject.setName(project.getName());
//		newProject.setCreateAt(LocalDate.now());
//		newProject.setIsDelete(false);
//		newProject.set
		this.projectService.save(project);
//		this.projectService.remove(project.getId());
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}

	@RequestMapping(value = "/project/isDelete/{id}", method = RequestMethod.DELETE)
	private ResponseEntity<Object> isDelete(@PathVariable("id") Long id) {
		Project project = this.projectService.findById(id);
		project.setUpdateAt(LocalDate.now());
		this.projectService.remove(id);
		return new ResponseEntity<Object>(project,HttpStatus.ACCEPTED);
	}

	private boolean test(String name) {
		if (this.projectService.findByName(name) == null) {
			return false;
		}
		return true;
	}

	public String count(long id) {
		String count = this.projectService.count(id);
		return count;
	}

}
