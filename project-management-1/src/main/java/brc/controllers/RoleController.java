package brc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import brc.models.RoleProject;
import brc.service.impl.RoleProjectService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class RoleController {
	
	@Autowired
	private RoleProjectService roleService;
	
	@RequestMapping(value = "/role/list",method = RequestMethod.GET)
	private ResponseEntity<List<RoleProject>> list(){
		List<RoleProject> list = this.roleService.findAll();
		return new ResponseEntity<List<RoleProject>>(list,HttpStatus.OK);
	}
	
}
