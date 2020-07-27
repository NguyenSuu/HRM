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

import brc.models.LevelProject;
import brc.service.impl.LevelProjectService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LevelProjectController {
	@Autowired
	private LevelProjectService levelService;

	@RequestMapping(value = "/level/list", method = RequestMethod.GET)
	private ResponseEntity<List<LevelProject>> listLevelProject() {
		List<LevelProject> listLevelProject = this.levelService.findAll();
		return new ResponseEntity<List<LevelProject>>(listLevelProject, HttpStatus.OK);
	}

	@RequestMapping(value = "/level/new", method = RequestMethod.POST)
	private ResponseEntity<LevelProject[]> create(@RequestBody LevelProject[] levels) {
		for (int i = 0; i < levels.length; i++) {
			levels[i].setCreateAt(LocalDate.now());
			levels[i].setIsDelete(false);
			if (this.test(levels[i].getName())) {
				return new ResponseEntity<LevelProject[]>(HttpStatus.BAD_REQUEST);
			}
			this.levelService.save(levels[i]);
		}
		
		return new ResponseEntity<LevelProject[]>(levels, HttpStatus.OK);
	}

	@RequestMapping(value = "/level/update", method = RequestMethod.PUT)
	private ResponseEntity<LevelProject> update(@RequestBody LevelProject level) {
		if (this.test(level.getName())) {
			return new ResponseEntity<LevelProject>(HttpStatus.BAD_REQUEST);
		}
		LevelProject newLevelProject = new LevelProject();
		newLevelProject.setName(level.getName());
		newLevelProject.setCreateAt(LocalDate.now());
		newLevelProject.setIsDelete(false);
		this.levelService.save(newLevelProject);
		this.levelService.remove(level.getId());
		return new ResponseEntity<LevelProject>(newLevelProject, HttpStatus.OK);
	}

	@RequestMapping(value = "/level/isDelete/{id}", method = RequestMethod.DELETE)
	private ResponseEntity<Object> isDelete(@PathVariable("id") Long id) {
		LevelProject levelProject = this.levelService.findById(id);
		levelProject.setUpdateAt(LocalDate.now());
		this.levelService.remove(id);
		return new ResponseEntity<Object>(HttpStatus.resolve(201));
	}


	private boolean test(String name) {
		if (this.levelService.findByName(name) == null) {
			return false;
		}
		return true;
	}
}
