package brc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import brc.models.Technology;
import brc.service.impl.TechnologyService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class TechnologyController {
	
	@Autowired
	private TechnologyService technologyService;
	
	@RequestMapping(value = "/technology/list", method = RequestMethod.GET)
	private ResponseEntity<List<Technology>> listStatusProject() {

		List<Technology> list = this.technologyService.findAll();

		return new ResponseEntity<List<Technology>>(list, HttpStatus.OK);
	}
}
