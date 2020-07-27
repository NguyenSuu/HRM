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

import brc.models.StatusProject;
import brc.service.impl.StatusProjectService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StatusProjectController {
	
	@Autowired
	private StatusProjectService statusProjectService;

	@RequestMapping(value = "/status/list", method = RequestMethod.GET)
	private ResponseEntity<List<StatusProject>> listStatusProject() {

		List<StatusProject> listStatus = this.statusProjectService.findAll();

		return new ResponseEntity<List<StatusProject>>(listStatus, HttpStatus.OK);
	}

	@RequestMapping(value = "/status/new", method = RequestMethod.POST)
	private ResponseEntity<StatusProject> create(@RequestBody StatusProject status) {
		status.setCreateAt(LocalDate.now());
		status.setIsDelete(false);
		if (this.test(status.getName())) {
			return new ResponseEntity<StatusProject>(HttpStatus.BAD_REQUEST);
		}
		this.statusProjectService.save(status);
		return new ResponseEntity<StatusProject>(status, HttpStatus.OK);
	}

	@RequestMapping(value = "/status/update", method = RequestMethod.PUT)
	private ResponseEntity<StatusProject> update(@RequestBody StatusProject status) {
		if (this.test(status.getName())) {
			return new ResponseEntity<StatusProject>(HttpStatus.BAD_REQUEST);
		}
		StatusProject newStatusProject = new StatusProject();
		newStatusProject.setName(status.getName());
		newStatusProject.setCreateAt(LocalDate.now());
		newStatusProject.setIsDelete(false);
		this.statusProjectService.save(newStatusProject);
		this.statusProjectService.remove(status.getId());
		return new ResponseEntity<StatusProject>(newStatusProject, HttpStatus.OK);
	}

	@RequestMapping(value = "/status/isDelete/{id}", method = RequestMethod.POST)
	private ResponseEntity<Object> isDeleteLevelProject(@PathVariable("id") Long id) {
		StatusProject statusProject = this.statusProjectService.findById(id);
		statusProject.setUpdateAt(LocalDate.now());
		this.statusProjectService.remove(id);
		return new ResponseEntity<Object>(HttpStatus.ACCEPTED);
	}

	private boolean test(String name) {
		if (this.statusProjectService.findByName(name) == null) {
			return false;
		}
		return true;
	}
}
