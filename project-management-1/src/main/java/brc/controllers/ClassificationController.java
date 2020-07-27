package brc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import brc.models.Classification;
import brc.service.impl.ClassificationService;

@RestController
@RequestMapping("/api")
@CrossOrigin(allowedHeaders = "*",origins = "*")
public class ClassificationController {
	
	@Autowired
	private ClassificationService classificationService;
	
	@RequestMapping(value="/classificationPL",method = RequestMethod.GET)
	private ResponseEntity<List<Classification>> list(){
		List<Classification> list = this.classificationService.findAll();
		return new ResponseEntity<List<Classification>>(list,HttpStatus.OK);
	}
}
